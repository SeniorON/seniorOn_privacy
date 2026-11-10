# SeniorON_AccountDeletion

시니어온 계정 및 데이터 삭제 웹 프론트엔드입니다. React·TypeScript·Vite로 만들었으며, 일반 로그인과 주담당자 권한 양도, 회원 탈퇴 요청을 처리합니다.

## 로컬 실행 (macOS · Windows)

Git, Node.js 22.12 이상, npm이 필요합니다. Mac에서는 터미널, Windows에서는 PowerShell 또는 Git Bash를 사용합니다.

```bash
git clone -b develop https://github.com/SeniorON/seniorOn_privacy.git
cd seniorOn_privacy/SeniorON_AccountDeletion
npm ci
npm run dev
```

이미 저장소가 있다면 `seniorOn_privacy` 폴더에서 `git switch develop`, `git pull --ff-only origin develop`을 실행한 뒤 `SeniorON_AccountDeletion` 폴더로 이동해 `npm ci`, `npm run dev`를 실행하세요.

브라우저에서 **http://localhost:5174**를 엽니다. 터미널은 열어 두고, 종료할 때는 `Ctrl+C`를 누르세요. 5174 포트가 사용 중이면 Vite가 다른 포트로 자동 변경하지 않고 종료되므로 기존 서버를 확인하세요.

별도 백엔드 실행이나 로컬 환경변수 설정은 필요 없습니다. 개발 서버는 `/api` 요청을 **실제 서버(`https://senioron.site`)**로 전달합니다. 로그인에는 활성 사용자 계정이 필요합니다. 로컬에서 진행한 **권한 양도와 회원 탈퇴도 실제 서버에 반영**되므로 확인에는 테스트용 계정을 사용하세요.

## 계정 삭제 흐름

1. 앱에 가입한 **아이디와 비밀번호**로 로그인합니다. 화면의 카카오·구글 버튼은 웹용 제공자 설정이 아직 없어 안내 문구만 표시합니다.
2. 로그인 후 서버에서 가족별 담당자 상태를 조회합니다. 주담당자인 시니어가 없다면 탈퇴 확인 화면으로 이동합니다.
3. 주담당자인 시니어가 있다면 다른 자녀 보호자를 새 주담당자로 선택해 권한을 양도합니다. 여러 시니어의 주담당자라면 모두 양도해야 합니다. 양도받을 수 있는 보호자가 없다면 이 페이지에서 탈퇴를 진행할 수 없습니다.
4. 탈퇴 확인 화면에서 삭제·보관 안내를 읽고 `회원 탈퇴`를 입력합니다. 앞뒤 공백은 허용하지만 두 단어 사이 공백은 정확해야 합니다.
5. **계정 삭제하기**를 누르면 서버에 탈퇴를 요청합니다. 서버가 성공을 반환한 뒤에만 완료 화면이 표시됩니다. 계정은 복구할 수 없습니다.



