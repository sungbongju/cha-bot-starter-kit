# Chapter 6 — Vercel로 인터넷에 배포하기

> 이번 챕터에서 봉주 봇이 **진짜 인터넷에 뜹니다.** 친구한테 URL 보내주면 누구나 접속 가능. 약 10분 걸려요.

---

## 왜 Vercel인가요?

**Vercel** = 정적 웹사이트 + 서버리스 함수 호스팅 무료 서비스

```
[내 GitHub 레포]   ────→  [Vercel]   ────→   [인터넷에 라이브]
  코드 변경 push                          https://my-bot.vercel.app
        ↑
        └── Vercel이 GitHub와 연결되어 있어서
            push 할 때마다 자동으로 다시 빌드 + 배포
```

**왜 Vercel?**
- 무료 (개인 프로젝트, 트래픽 한도 넉넉)
- GitHub 연결 → push 자동 배포
- Vite/React 같은 모던 프레임워크 자동 감지
- HTTPS 자동 적용
- 서버리스 함수 (`api/*.js`) 자동 배포

**다른 옵션**: Netlify, Cloudflare Pages, GitHub Pages 등도 가능. 이 자습서는 Vercel 기준.

---

## 1단계 — Vercel 가입

### vercel.com 회원가입

1. <https://vercel.com/signup> 접속
2. **"Continue with GitHub"** 클릭 (가장 쉬움 — GitHub 계정으로 한 번에 가입)
3. GitHub 권한 요청 → **Authorize Vercel** 클릭
4. 가입 완료 → Vercel 대시보드 진입

> 💡 GitHub로 가입하면 별도 비밀번호 안 만들어도 되고, 다음 단계의 레포 연결도 자동.

---

## 2단계 — 레포 import 하기

### 새 프로젝트 만들기

1. <https://vercel.com/new> 접속
2. **"Import Git Repository"** 섹션에서 본인 레포 (Chapter 5에서 만든 거) 찾기
   - 처음이면 "Vercel을 설치할 GitHub 계정" 권한 부여 화면이 뜸
   - **All repositories** 선택 (또는 본인이 만든 그 레포만 선택)
   - **Install** 버튼 클릭
3. 권한 받은 후 → 레포 목록에 본인 레포 이름이 보임
4. 본인 레포 옆 **Import** 버튼 클릭

### 설정 화면 (Configure Project)

```
Project Name:     my-vrm-bot   (자동 채워짐, 그대로 OK)
Framework Preset: Vite          ← 자동 감지됨, 그대로!
Root Directory:   ./            (그대로)

> Build and Output Settings  (펼치지 마세요, 기본값으로 OK)

> Environment Variables       (펼치지 마세요, 일단 비워둠)
```

→ **그대로 두고 아래 파란색 `Deploy` 버튼 클릭**.

> ⚠️ **Framework Preset 를 "Other" 로 바꾸지 마세요.**
> Vite는 정확한 감지예요. Other로 바꾸면 Build command 등을 직접 입력해야 해서 학생이 막혀요.

> 💡 **환경변수 비워둬도 OK인 이유**: 우리는 지금 **아바타 렌더링**만 검증할 거예요. 채팅/음성은 backend 서버 연결 필요한데 그건 나중 챕터. 아바타는 정적 파일이라 환경변수 없이도 잘 뜸.

---

## 3단계 — 빌드 대기

Deploy 누르면 Vercel이 자동으로:

1. GitHub에서 코드 받아옴 (clone)
2. `npm install` 실행 (의존성 설치)
3. `npm run build` 실행 (Vite 빌드)
4. 결과물 (`dist/` 폴더) 을 자동 배포

**빌드 진행 화면** (1~2분):
```
┌──────────────────────────────────────────┐
│ 🔵 Building...                            │
│                                           │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 30%     │
│                                           │
│ Build Logs (실시간):                       │
│   Cloning github.com/내ID/내봇이름...     │
│   Installing dependencies...              │
│     added 200 packages in 30s             │
│   Running "npm run build"                 │
│     vite v8.0.12 building...              │
│     ✓ 30 modules transformed              │
│     ✓ built in 318ms                      │
│   Uploading build outputs...              │
│                                           │
└──────────────────────────────────────────┘
```

→ 완료되면 화면이 **🎉 콘페티 애니메이션** + **"Congratulations"** 메시지로 바뀜.

---

## 4단계 — 라이브 URL 확인

배포 완료 화면에서 본인 봇의 미리보기 스크린샷과 URL이 보입니다:

```
🎉 Your project has been deployed.

Visit: https://my-vrm-bot-xxxxxxxx.vercel.app
       [Visit] [Continue to Dashboard]
```

→ **그 URL 클릭** = 본인 봇이 인터넷에 뜸 🎉

URL 형식:
- 기본: `https://[프로젝트이름]-[랜덤문자열].vercel.app`
- 추후 본인 도메인 연결도 가능 (settings → Domains)

---

## 5단계 — 동작 확인

### ✅ 확인할 것들

1. **페이지 로딩** → 헤더, 아바타 패널, 채팅 패널이 보임
2. **아바타 로딩 표시** → "아바타 불러오는 중…" 스피너가 잠깐 보이다가 사라짐
3. **아바타 렌더링** → AvatarSample_A (카디건 캐릭터) 등장
4. **아이들 애니메이션** → 눈 깜빡임, 미세한 호흡, 시선 추적
5. **모드 토글** → 📷 / 🎙 버튼 클릭 시 모드 바뀜 (FTF/STS/TTT)
6. **테마 토글** → 🌙/☀️ 버튼 클릭 시 라이트/다크 모드 전환

### ⚠️ 동작 안 하는 것 (정상)

- **"상담 시작" 버튼** 누르면 → 채팅 시도 → **네트워크 에러**
  - 이유: backend 서버 (`ONPREMISE_BASE_URL` 환경변수) 미설정
  - 정상입니다. 다음 챕터(Ch7+)에서 backend 연결.

---

## 6단계 — 친구한테 자랑하기

URL 복사해서 카톡으로 보내세요:
```
야 내가 만든 AI 봇이야 ㅎㅎ
https://my-vrm-bot-xxxxxxxx.vercel.app
```

→ 친구가 그 URL 누르면 봉주 봇이 떠요. **인터넷 어디서든**.

---

## 🔄 다음 push 부터는 자동 배포

이제 봉주가 코드 수정 후 GitHub에 push하면:

```
[로컬 수정]
git add ...
git commit -m "..."
git push
        ↓
[GitHub 자동 알림 → Vercel]
        ↓
[Vercel 자동 빌드 → 자동 배포]
        ↓
[1~2분 후 사이트 자동 업데이트]
```

→ Vercel 사이트에 가지 않아도 자동. 매우 편함.

---

## 🛟 자주 묻는 질문

**Q. 빌드가 실패했어요. 빨간색 에러가 뜹니다.**
> Vercel 화면 "Build Logs" 펼쳐서 빨간 줄 (대문자 ERROR 또는 ✗ 표시) 찾아보세요. 가장 흔한 원인:
> - `npm install` 실패 → package.json 의 의존성 문제. 로컬에서 `npm install` 잘 됐는지 확인.
> - `npm run build` 실패 → 코드 에러. 로컬에서 `npm run build` 직접 돌려서 같은 에러 재현해보고 수정.
> - 환경변수 누락 → 빌드에 꼭 필요한 VITE_* 변수가 없을 때. .env.example 참고.

**Q. 배포는 성공했는데 URL 열면 404 / 화이트 스크린이 뜹니다.**
> 브라우저 콘솔 (F12) → Console 탭에서 빨간 에러 확인.
> 보통 `vercel.json` 의 SPA fallback 설정 문제. 우리 스타터킷에는 이미 잘 들어가 있어서 문제 없을 거예요.

**Q. 아바타가 안 뜨고 "👋 아바타가 비어있어요" 메시지가 떠요.**
> `public/avatar.vrm` 이 git에 들어가지 않은 거예요. Ch5의 "git add → commit → push" 다시 점검:
> ```cmd
> git status                # avatar.vrm 이 untracked 로 나오면 안 들어간 거
> git ls-tree HEAD public   # avatar.vrm 이 목록에 없으면 commit 안 된 거
> ```
> avatar.vrm 추가 후 다시 commit + push → Vercel 자동 재배포.

**Q. 환경변수는 언제 추가하나요?**
> Backend 서버 연결할 때 (다음 챕터). 지금은 비워둬도 아바타까지는 잘 뜸. 추가하려면:
> Vercel 대시보드 → 본인 프로젝트 → Settings → Environment Variables → Add new

**Q. 도메인 (예: mybot.com) 으로 바꾸고 싶어요.**
> Settings → Domains → Add → 본인 도메인 입력. 단, 도메인은 별도 구매해야 함 (Vercel은 호스팅만, 도메인 등록은 namecheap/cloudflare/가비아 등). 처음엔 vercel.app 무료 URL 그대로 쓰는 것 추천.

**Q. 친구한테 보낼 URL을 더 짧게 / 예쁘게 만들고 싶어요.**
> Vercel은 무료 플랜에서도 `https://[원하는이름].vercel.app` 으로 변경 가능:
> Project → Settings → Domains → vercel.app 도메인 클릭 → "Edit" → 다른 이름 입력. 단, 다른 사람이 안 쓴 이름이어야 함.

**Q. 무료 플랜 한도는 얼마나 되나요?**
> Hobby 플랜 (개인용 무료):
> - 월 100 GB 대역폭
> - 빌드 시간 월 6000분
> - 서버리스 함수 호출 월 100만번
> 학생/교수님 개인 봇 용도로는 충분합니다. 트래픽 폭증 시에만 유료 고려.

**Q. 사이트를 비공개 (특정 사람만 볼 수 있게) 하고 싶어요.**
> Vercel Pro 플랜 ($20/월)에서 Password Protection 기능 제공. 무료에선 안 됨. 대안: 코드에 간단한 로그인 추가 (Auth0, Clerk 등).

---

📍 **현재 위치**: Chapter 6 / 8

[← 이전: Chapter 5 GitHub에 내 봇 올리기](./05-github-push.md) | [다음 → Chapter 7: 내 아바타로 바꾸기 (커스터마이즈)](./07-customize-avatar.md)

---

🎉 **축하합니다! 1차 자습서 완주.**

여기까지 따라오신 봉주는 이미:
- ✅ 로컬 개발 환경 구축
- ✅ GitHub 협업의 기초
- ✅ 인터넷에 실제 서비스 배포

이걸 다 한 거예요. **개발자의 표준 워크플로우**입니다. 이 다음 챕터부터는 자유로운 커스터마이즈 — 봉주 봇만의 특색을 더하는 단계.
