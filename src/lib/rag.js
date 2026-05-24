// ─────────────────────────────────────────────────────────────────────────────
// Browser-side RAG (Retrieval-Augmented Generation)
// ─────────────────────────────────────────────────────────────────────────────
// Loads public/rag/{chunks.json, embeddings.json} on first call and caches.
// For each query: hits /api/embed once → cosine search locally → returns top-K.
//
// The returned chunks should be passed as `context` in the chat request body.
// The backend (api/chat-stream → middleton starter-chat-stream) injects them
// into the system prompt.
//
// If RAG files are missing or empty, retrieve() returns [] (bot falls back to
// generic Gemma4 responses, no error).
// ─────────────────────────────────────────────────────────────────────────────

let _state = null  // { ids, vectors, chunksById, model, dim } — loaded once

async function loadIndex() {
  if (_state) return _state
  try {
    const [chunksResp, embedsResp] = await Promise.all([
      fetch('/rag/chunks.json', { cache: 'no-cache' }),
      fetch('/rag/embeddings.json', { cache: 'no-cache' }),
    ])
    if (!chunksResp.ok || !embedsResp.ok) {
      console.warn('[rag] index files not found — RAG disabled')
      _state = { ids: [], vectors: [], chunksById: {}, model: '', dim: 0 }
      return _state
    }
    const chunks = await chunksResp.json()
    const embeds = await embedsResp.json()
    const chunksById = {}
    for (const c of chunks) chunksById[c.id] = c
    _state = {
      ids: embeds.ids || [],
      vectors: embeds.vectors || [],
      chunksById,
      model: embeds.model || 'bge-m3',
      dim: embeds.dim || 0,
    }
    console.log(`[rag] loaded ${_state.ids.length} chunks (${_state.model}, dim=${_state.dim})`)
    return _state
  } catch (e) {
    console.warn('[rag] load failed:', e)
    _state = { ids: [], vectors: [], chunksById: {}, model: '', dim: 0 }
    return _state
  }
}

function dot(a, b) {
  let s = 0
  for (let i = 0; i < a.length; i++) s += a[i] * b[i]
  return s
}

async function embedQuery(text) {
  const r = await fetch('/api/embed', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })
  if (!r.ok) throw new Error(`embed http ${r.status}`)
  const data = await r.json()
  if (!Array.isArray(data?.embedding)) throw new Error('invalid embedding response')
  return data.embedding   // already normalized by /api/embed
}

/**
 * Retrieve top-K chunks for the user's query.
 *
 * @param {string} query   user message
 * @param {object} opts    { topK=3, minScore=0.4 }
 * @returns {Promise<Array<{id, question, answer, score}>>}
 *   Empty array if no chunks, query embed fails, or no scores above threshold.
 *   Caller can pass result directly as `context` in chat request.
 */
export async function retrieve(query, { topK = 3, minScore = 0.4 } = {}) {
  const text = (query || '').trim()
  if (!text) return []

  const state = await loadIndex()
  if (!state.ids.length || !state.vectors.length) return []

  let qvec
  try {
    qvec = await embedQuery(text)
  } catch (e) {
    console.warn('[rag] embed query failed:', e)
    return []
  }
  if (qvec.length !== state.dim) {
    console.warn(`[rag] dim mismatch query=${qvec.length} index=${state.dim}`)
    return []
  }

  // Score each candidate, pick top-K above threshold
  const scored = state.vectors.map((v, i) => ({ i, score: dot(qvec, v) }))
  scored.sort((a, b) => b.score - a.score)

  const out = []
  for (const { i, score } of scored.slice(0, topK)) {
    if (score < minScore) break
    const id = state.ids[i]
    const chunk = state.chunksById[id]
    if (!chunk) continue
    out.push({
      id,
      question: chunk.question || '',
      answer: chunk.answer || '',
      score: Math.round(score * 1000) / 1000,
    })
  }
  return out
}

/** Pre-load the index (call once on app start to avoid first-query delay). */
export function warmUp() {
  loadIndex().catch(() => {})
}
