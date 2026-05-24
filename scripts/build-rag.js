#!/usr/bin/env node
/**
 * Build RAG embeddings — reads public/rag/chunks.json, calls the embedding API
 * once per chunk, writes public/rag/embeddings.json.
 *
 * Usage:
 *   npm run build-rag
 *
 * What it does:
 *   1. Loads chunks.json (array of {id, question, answer})
 *   2. For each chunk, calls EMBED_URL with (question + " " + answer)
 *   3. Saves embeddings as parallel array → embeddings.json
 *   4. Browser loads both at runtime and does cosine search locally
 *
 * Output format (embeddings.json):
 *   {
 *     "model": "bge-m3",
 *     "dim": 1024,
 *     "ids": ["q1", "q2", ...],
 *     "vectors": [[0.1, -0.3, ...], [...], ...]   // pre-normalized
 *   }
 *
 * Environment:
 *   EMBED_URL   embedding endpoint (default: middleton starter kit shared)
 *
 * This script runs both:
 *   - on developer's PC (manual: npm run build-rag)
 *   - on Vercel build (automatic via package.json `build` script)
 */

const fs   = require('fs');
const path = require('path');

const REPO_ROOT  = path.resolve(__dirname, '..');
const CHUNKS_PATH = path.join(REPO_ROOT, 'public', 'rag', 'chunks.json');
const EMBEDS_PATH = path.join(REPO_ROOT, 'public', 'rag', 'embeddings.json');

const EMBED_URL = process.env.EMBED_URL || 'https://middleton.p-e.kr/finbot/api/embed';

async function embedOne(text) {
  const r = await fetch(EMBED_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
    signal: AbortSignal.timeout(20000),
  });
  if (!r.ok) throw new Error(`embed http ${r.status} for: ${text.slice(0, 50)}`);
  const data = await r.json();
  if (!Array.isArray(data?.embedding)) throw new Error('invalid embedding response');
  return { vec: data.embedding, dim: data.dim, model: data.model };
}

async function main() {
  if (!fs.existsSync(CHUNKS_PATH)) {
    console.error(`[build-rag] ${CHUNKS_PATH} not found.`);
    console.error('  → create public/rag/chunks.json with [{"id":"q1","question":"...","answer":"..."}, ...]');
    process.exit(1);
  }

  const chunks = JSON.parse(fs.readFileSync(CHUNKS_PATH, 'utf-8'));
  if (!Array.isArray(chunks)) {
    console.error('[build-rag] chunks.json must be a JSON array');
    process.exit(1);
  }

  if (chunks.length === 0) {
    // Empty corpus is valid — write a valid empty embeddings file
    fs.writeFileSync(EMBEDS_PATH, JSON.stringify({
      model: 'bge-m3', dim: 1024, ids: [], vectors: [],
    }, null, 2));
    console.log('[build-rag] chunks.json is empty → wrote empty embeddings.json');
    return;
  }

  console.log(`[build-rag] ${chunks.length} chunks → calling ${EMBED_URL}`);
  const ids = [];
  const vectors = [];
  let model = 'bge-m3';
  let dim = 1024;

  for (let i = 0; i < chunks.length; i++) {
    const c = chunks[i];
    const id = c.id || `chunk_${i}`;
    const text = [c.question, c.answer].filter(Boolean).join(' ').trim();
    if (!text) {
      console.warn(`  [${i + 1}/${chunks.length}] ${id} — empty text, skipping`);
      continue;
    }
    try {
      const t0 = Date.now();
      const { vec, dim: d, model: m } = await embedOne(text);
      dim = d || dim;
      model = m || model;
      ids.push(id);
      vectors.push(vec);
      const ms = Date.now() - t0;
      console.log(`  [${i + 1}/${chunks.length}] ${id.padEnd(20)} ✓ (dim=${d}, ${ms}ms)`);
    } catch (e) {
      console.error(`  [${i + 1}/${chunks.length}] ${id} ✗ ${e.message}`);
      process.exit(1);
    }
  }

  fs.writeFileSync(EMBEDS_PATH, JSON.stringify({
    model, dim, ids, vectors,
  }, null, 0)); // compact JSON — vectors are big, no indent

  const kb = (fs.statSync(EMBEDS_PATH).size / 1024).toFixed(1);
  console.log(`\n[build-rag] ✓ wrote public/rag/embeddings.json (${ids.length} embeddings, ${kb} KB)`);
}

main().catch(e => {
  console.error('[build-rag] FATAL:', e);
  process.exit(1);
});
