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

1. 앱에 가입한 **아이디(`loginId`)와 비밀번호**로 로그인합니다. 화면의 카카오·구글 버튼은 웹용 제공자 설정이 아직 없어 안내 문구만 표시합니다.
2. 로그인 후 서버에서 가족별 담당자 상태를 조회합니다. 주담당자인 시니어가 없다면 탈퇴 확인 화면으로 이동합니다.
3. 주담당자인 시니어가 있다면 다른 자녀 보호자를 새 주담당자로 선택해 권한을 양도합니다. 여러 시니어의 주담당자라면 모두 양도해야 합니다. 양도받을 수 있는 보호자가 없다면 이 페이지에서 탈퇴를 진행할 수 없습니다.
4. 탈퇴 확인 화면에서 삭제·보관 안내를 읽고 `회원 탈퇴`를 입력합니다. 앞뒤 공백은 허용하지만 두 단어 사이 공백은 정확해야 합니다.
5. **계정 삭제하기**를 누르면 서버에 탈퇴를 요청합니다. 서버가 성공을 반환한 뒤에만 완료 화면이 표시됩니다. 계정은 복구할 수 없습니다.

개발 중 시안만 확인하려면 `http://localhost:5174/?screen=confirmation` 또는 `http://localhost:5174/?screen=complete`를 열 수 있습니다. 이 미리보기 주소는 개발 환경에서만 동작하며, 실제 탈퇴 결과를 뜻하지 않습니다.

## API 연결 상태

| 기능 | 백엔드 API | 상태 |
| --- | --- | --- |
| 일반 로그인 | `POST /api/users/login` | 연결됨 |
| 가족별 담당자 상태 | `GET /api/users/me/onboarding-status` | 연결됨 |
| 가족 구성원 조회 | `GET /api/family/members?seniorId=...` | 연결됨 |
| 주담당자 양도 | `PATCH /api/family/primary-manager?seniorId=...` | 연결됨 |
| 회원 탈퇴 | `DELETE /api/users/me` | 연결됨 |
| 카카오·구글 로그인 | `POST /api/social-accounts/login/kakao`, `/google` | 웹 토큰 발급 설정 전까지 미연결 |

요청·응답 형식은 [SeniorON_BE의 develop 브랜치](https://github.com/SeniorON/SeniorON_BE/tree/develop) 컨트롤러·DTO·서비스를 기준으로 맞췄습니다. Swagger 원본 명세 조회는 점검 시 401을 반환했으며, 실제 계정을 사용한 전체 흐름 검증은 아직 하지 않았습니다. 인증 토큰은 브라우저 메모리에만 보관해 새로고침하면 다시 로그인해야 합니다.

## 프로젝트 구조

```text
SeniorON_AccountDeletion/
├── index.html                # React 진입 HTML
├── package.json              # 개발·빌드·린트 명령
├── vite.config.ts            # 5174 포트와 실서버 API 프록시
├── public/assets/            # 로고·아이콘·Pretendard 폰트
└── src/
    ├── api/account.ts        # 로그인·담당자 조회·양도·탈퇴 요청
    ├── components/           # 헤더·진행 단계·안내 푸터
    ├── pages/                # 권한 양도·탈퇴 확인·완료 화면
    ├── styles/design-system.css
    ├── App.tsx               # 로그인 화면과 화면 흐름
    ├── App.css               # 화면 스타일
    └── main.tsx              # React 마운트
```

`public/assets/`의 관리자 웹 에셋은 [SeniorOn_Admin develop](https://github.com/SeniorON/SeniorOn_Admin/tree/develop)에서 가져왔습니다. 완료 체크 아이콘은 제공된 SVG를 사용하고, Medium·SemiBold 폰트는 `SeniorON_AOS`의 Pretendard 파일을 사용합니다.

## 빌드와 배포 확인

```bash
npm run lint
npm run build
npm run preview
```

배포 시 API 주소가 다르면 `VITE_API_BASE_URL`에 `/api`까지 포함한 주소를 지정하세요. 브라우저가 API를 직접 호출하는 배포 환경에서는 웹 도메인을 백엔드 CORS 허용 목록에 등록해야 합니다.

현재 저장소의 GitHub Pages는 루트의 기존 정적 페이지를 게시합니다. 이 폴더의 `dist/`는 자동으로 게시되지 않습니다. 또한 기존 정적 안내에는 삭제 요청 **10일 이내 완료**, 이 웹 시안에는 서버 데이터 **7일 이내 삭제**가 적혀 있어 배포 전에 실제 운영 정책과 문구를 맞춰야 합니다.
