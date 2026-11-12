# SeniorON_AccountDeletion

시니어온 계정 및 데이터 삭제 웹 프론트엔드입니다. React·TypeScript·Vite로 만들었으며, 일반 로그인과 주담당자 권한 양도, 회원 탈퇴 요청을 처리합니다.

## 로컬 실행 (macOS · Windows)

Git, Node.js 22.12 이상, npm이 필요합니다. Mac에서는 터미널, Windows에서는 PowerShell 또는 Git Bash를 사용합니다.

```bash
git clone -b develop https://github.com/SeniorON/seniorOn_privacy.git
cd seniorOn_privacy/SeniorON_AccountDeletion
npm ci
cp .env.example .env.local
npm run dev
```

`.env.local`의 `VITE_KAKAO_REST_API_KEY`에 백엔드와 같은 카카오 앱의 REST API 키를 입력하세요. 로컬 Redirect URI는 `http://localhost:5174/`이며 카카오 디벨로퍼스와 백엔드 `KAKAO_WITHDRAWAL_REDIRECT_URI`에도 동일하게 등록해야 합니다. `.env.local`은 Git에서 제외됩니다.

이미 저장소가 있다면 `seniorOn_privacy` 폴더에서 `git switch develop`, `git pull --ff-only origin develop`을 실행한 뒤 `SeniorON_AccountDeletion` 폴더로 이동해 `npm ci`, `npm run dev`를 실행하세요.

브라우저에서 **http://localhost:5174**를 엽니다. 터미널은 열어 두고, 종료할 때는 `Ctrl+C`를 누르세요. 5174 포트가 사용 중이면 Vite가 다른 포트로 자동 변경하지 않고 종료되므로 기존 서버를 확인하세요.

개발 서버는 `/api` 요청을 **실제 서버(`https://senioron.site`)**로 전달합니다. 로컬에서 진행한 **권한 양도와 회원 탈퇴도 실제 서버에 반영**되므로 확인에는 테스트용 계정을 사용하세요.

## 계정 삭제 흐름

1. 앱에 가입한 **아이디와 비밀번호**, **카카오 계정** 또는 **구글 계정**으로 로그인합니다. 카카오 인가 코드는 `POST /api/social-accounts/login/kakao/withdrawal`로, 구글 Firebase ID 토큰은 `POST /api/social-accounts/login/google`로 전달합니다. 미가입 계정은 웹에서 새로 가입하지 않습니다.
2. 로그인 후 서버에서 가족별 담당자 상태를 조회합니다. 주담당자인 시니어가 없다면 탈퇴 확인 화면으로 이동합니다.
3. 주담당자인 시니어가 있다면 다른 자녀 보호자를 새 주담당자로 선택해 권한을 양도합니다. 여러 시니어의 주담당자라면 모두 양도해야 합니다. 양도받을 수 있는 보호자가 없다면 이 페이지에서 탈퇴를 진행할 수 없습니다.
4. 탈퇴 확인 화면에서 삭제·보관 안내를 읽고 `회원 탈퇴`를 입력합니다. 앞뒤 공백은 허용하지만 두 단어 사이 공백은 정확해야 합니다.
5. **계정 삭제하기**를 누르면 서버에 탈퇴를 요청합니다. 서버가 성공을 반환한 뒤에만 완료 화면이 표시됩니다. 계정은 복구할 수 없습니다.

구글 로그인은 Firebase 프로젝트 `senioron-8c2e1`을 사용합니다. Firebase Authentication에서 Google 제공자를 활성화하고 `localhost`를 승인된 도메인에 추가해야 합니다. 배포 시에는 카카오 Redirect URI, Firebase 승인 도메인, 웹 빌드 환경변수를 배포 주소에 맞게 설정하세요. 실제 카카오·구글 계정으로 전체 흐름을 검증해야 합니다.
