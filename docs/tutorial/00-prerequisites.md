# Chapter 0 — 시작하기 전에 (준비물)

> Ch 1 부터 본격 시작하기 전에, **3개 계정 가입 + 1개 파일 준비** 만 해두시면 됩니다. 총 15~20분 정도.

---

## 한눈에 보기

| # | 준비물 | 필요 시점 | 비용 | 예상 시간 |
|---|---|---|---|---|
| 1 | **GitHub 계정** | Ch 3, Ch 5 | 무료 | 3분 |
| 2 | **Vercel 계정** | Ch 6 | 무료 (GitHub로 가입) | 1분 |
| 3 | **Node.js + Git 설치** | Ch 2 부터 | 무료 | 5~15분 |
| 4 | **VRM 파일 (.vrm)** | Ch 4 | 무료 | 5~30분 |

각각 어떻게 준비하는지 아래에서 안내합니다.

---

## 1️⃣ GitHub 계정 만들기 (3분)

**GitHub** = 코드를 저장하는 인터넷 사이트 (구글 드라이브의 코드 전용 버전).

### 가입 단계

1. <https://github.com/signup> 접속
2. 이메일 주소 입력 → **Continue**
3. 비밀번호 설정 → **Continue**
4. 사용자명 입력 (영문/숫자, 다른 사람과 겹치면 안 됨)
   - 예: `kimchulsoo`, `mybot2026`, `jisoo-park`
   - 🎯 **이게 본인의 GitHub ID** 입니다. 나중에 자습서에서 계속 사용해요.
5. 이메일 인증 코드 → 입력
6. "How will you primarily use GitHub?" → **Personal** 또는 **Student** 선택
7. 가입 완료!

### 확인하기

본인 프로필 페이지가 이 주소로 열려야 정상:
```
https://github.com/본인ID
```

→ ✅ 이 URL을 기억해두세요.

> 💡 **이미 계정 있으세요?** 좋아요. 이 단계는 건너뛰셔도 됩니다.

---

## 2️⃣ Vercel 계정 만들기 (1분)

**Vercel** = 내 봇을 인터넷에 무료로 띄워주는 서비스.

### 가입 단계

1. <https://vercel.com/signup> 접속
2. **"Continue with GitHub"** 클릭 ⭐ 추천 (별도 비밀번호 안 만들어도 됨)
3. GitHub 인증 화면 → **Authorize Vercel** 클릭
4. (한국 사용자) 영문 이름 / 본인 정보 입력
5. **Hobby (개인용 무료)** 선택
6. 가입 완료!

### 확인하기

Vercel 대시보드가 열리고 우측 상단에 본인 GitHub 프로필 이미지가 보이면 OK:
```
https://vercel.com/dashboard
```

> 💡 GitHub로 가입하면 Vercel과 GitHub이 자동 연결되어 있어요 → 나중에 Ch 6에서 본인 레포 import가 한 번에 됩니다.

---

## 3️⃣ Node.js + Git 설치 (5~15분)

이 두 도구는 봇 개발의 필수품. **이미 설치되어 있을 수도 있어요** — Ch 2에서 먼저 확인부터 합니다.

### 미리 다운로드 받아두기 (없으면 설치 필요)

- **Node.js**: <https://nodejs.org/> → 좌측 **"LTS"** 큰 버튼 클릭 (Long Term Support 버전)
- **Git for Windows**: <https://git-scm.com/downloads> → Windows 클릭

📥 두 개 다운로드 받은 후:
1. Node.js 설치 파일 더블클릭 → "Next, Next, Install" (모든 옵션 기본값으로 OK)
2. Git 설치 파일 더블클릭 → 마찬가지 (기본값 강추 — 특히 "Git Credential Manager" 옵션은 켜져있어야 함)

### 확인하기 (자세한 건 Ch 2에서)

CMD 창에서:
```cmd
git --version
node --version
npm --version
```

모두 버전 번호가 나오면 OK.

> 💡 **회사/학교 PC라 설치 권한 없으세요?** 시스템 관리자에게 "Node.js 22.x LTS + Git for Windows" 설치 요청. 또는 본인 노트북으로.

---

## 4️⃣ VRM 파일 준비 (5~30분)

**VRM** = 3D 캐릭터 파일 (`.vrm` 확장자). 봉주 봇의 아바타가 됩니다.

### 옵션 A — VRoid Hub에서 무료 다운로드 ⭐ 가장 쉬움 (5분)

1. <https://hub.vroid.com/en/> 접속
2. 우측 상단 **Sign Up** → GitHub 또는 Twitter 계정으로 가입 (Pixiv 계정도 OK)
3. 메인에서 마음에 드는 캐릭터 클릭
4. ⚠️ **라이선스 확인 필수**: 우측에 다음 항목이 ✅ 인지 확인:
   - "사용 허락" (Allow Use)
   - "재배포 OK" (Allow Redistribution) — 만약 GitHub에 공개로 올릴 거면 중요
5. 우측 **Download** 버튼 → `.vrm` 파일 저장
6. 파일을 **바탕화면**에 두면 Ch 4에서 쉽게 사용 가능

> 💡 라이선스 잘 모르겠으면 다음 페이지에 있는 "Pixiv 공식 AvatarSample" 시리즈가 안전:
> <https://hub.vroid.com/en/users/2287322741607496883>

### 옵션 B — VRoid Studio로 직접 만들기 (30분~1시간)

1. <https://vroid.com/en/studio> 에서 다운로드 (~300MB)
2. 설치 후 실행 → **신규 캐릭터 만들기** → Sample Female/Male 선택
3. 슬라이더로 얼굴/머리/옷 커스터마이즈
4. 좌측 상단 **☰** → **Export** → **Export as VRM**
5. 라이선스 화면에서:
   ```
   Avatar Permission:    Everyone        ⭐
   Commercial Usage:     Allow            ⭐
   Modification:         Allow            ⭐
   Redistribution:       Allow            ⭐
   Credit Notation:      Required (그대로)
   ```
6. **avatar.vrm** 이라는 이름으로 바탕화면에 저장

이 옵션은 본인만의 캐릭터를 갖는 만족감 ↑, 단 시간 더 필요. **첫 도전은 옵션 A 추천**.

### 옵션 C — Booth에서 구매 ($5~$50)

<https://booth.pm> 의 VRM 카테고리. 퀄리티 좋은 작품이 많지만 일본어 사이트 + 유료. 진지한 봇 만들 때 고려.

---

## ✅ 준비 완료 체크리스트

진행하시기 전에 모두 ✅ 인지 확인:

```
☐ GitHub 계정 만들었음 (https://github.com/본인ID 접속 가능)
☐ Vercel 계정 만들었음 (https://vercel.com/dashboard 접속 가능)
☐ Node.js + Git 다운로드 받음 (또는 설치까지 완료)
☐ VRM 파일 (.vrm) 바탕화면에 있음
```

모두 ✅ 면 → [Ch 1: 작업 공간 만들기](./01-workspace.md) 로 가세요!

---

## 🛟 자주 묻는 질문

**Q. GitHub 가입할 때 한국 학생 이메일도 OK인가요?**
> 네, 모든 이메일 가능 (Gmail, Naver, 학교 이메일 등). 단, 학교 이메일 (`@cha.ac.kr` 등) 으로 가입하면 나중에 GitHub Student Pack (학생 특전) 신청 가능 — Copilot 무료 등.

**Q. Vercel 가입 시 GitHub 권한이 너무 많아 보여요. 안전한가요?**
> Vercel은 검증된 회사 (실리콘밸리 유니콘) 라 신뢰할 만합니다. 권한은 "내 코드 읽기 + 새 레포 import 권한" 정도. 의심스러우면 **레포 선택 권한**으로 제한 가능 ("Only select repositories" 옵션).

**Q. Node.js 설치할 때 LTS 말고 Current 버튼 누르면 안 되나요?**
> Current는 최신 실험 버전이라 가끔 호환성 문제 발생. **LTS (Long Term Support)** 가 안정 버전이라 학습용으로 안전. 우리 봇은 Node 18 이상이면 모두 작동.

**Q. VRoid Hub에서 다운받은 파일이 .vrm 이 아니라 .png 이에요.**
> VRoid Hub에서 캐릭터 상세 페이지로 들어간 후, 본문 우측의 **Download** 버튼을 눌러야 .vrm 파일이 받아짐. .png 다운로드는 미리보기 이미지.

**Q. 바탕화면에 두지 않고 다른 곳에 두면 안 되나요?**
> 됩니다. 단 Ch 4의 명령어 예시들이 `Desktop` 기준이라 본인 경로로 바꿔야 함. 처음엔 바탕화면이 가장 쉬움.

**Q. 모바일 / 태블릿으로도 따라할 수 있나요?**
> 어렵습니다. 이 자습서는 Windows / Mac / Linux 데스크탑 기준. 모바일은 코드 편집 / 터미널이 불편해서 비추.

**Q. Mac 사용자입니다.**
> 대부분 동일하지만 차이점:
> - Node.js / Git: Homebrew 추천 (`brew install node git`)
> - 터미널: Terminal.app 또는 iTerm2 (CMD 대신)
> - 경로: `~/dev/my-bot` (`C:\dev\` 대신)

---

📍 **현재 위치**: Chapter 0 / 8

(이전 챕터 없음) | [다음 → Chapter 1: 작업 공간 만들기](./01-workspace.md)
