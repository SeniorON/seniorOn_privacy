# seniorOn_privacy

SeniorON 개인정보처리방침 및 계정 삭제 안내 페이지입니다.

## 회원 탈퇴 React 앱

웹 회원 탈퇴 React 프로젝트는 [`SeniorON_AccountDeletion/`](SeniorON_AccountDeletion/README.md)에 있습니다. 일반 로그인·주담당자 권한 양도·회원 탈퇴 API와 화면 흐름이 구현되어 있으며, 실행 방법과 현재 연동 상태는 앱 README를 확인하세요. 기존 GitHub Pages 게시 페이지에는 아직 연결되지 않았습니다.

## 게시 URL (GitHub Pages)

- 개인정보처리방침: <https://senioron.github.io/seniorOn_privacy/>
- 계정 삭제 안내: <https://senioron.github.io/seniorOn_privacy/account-deletion.html>

## GitHub Pages 설정

1. 저장소 **Settings → Pages**로 이동합니다.
2. **Source**를 `Deploy from a branch`로 선택합니다.
3. **Branch**를 `main`, 폴더를 `/(root)`로 선택합니다.
4. **Save**를 누릅니다.

설정 후 위 URL에서 페이지가 열립니다. 반영까지 1~2분 정도 걸릴 수 있습니다.

## 수정 방법

- 개인정보처리방침 원문: `privacy.md`
- 스타일: `style.css`
- 계정 삭제 안내: `account-deletion.html`
- 생성된 페이지: `index.html`

`privacy.md`를 수정한 뒤 아래 명령으로 `index.html`을 다시 생성합니다.

```bash
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/python build.py
```

`index.html`과 `account-deletion.html`을 함께 커밋합니다.

## 커스텀 도메인 사용 시

`senioron.site/privacy` 등으로 연결하려면 GitHub Pages에 커스텀 도메인을 설정한 뒤, `privacy.md`의 계정 삭제 안내 URL과 `account-deletion.html`의 안내 문구를 실제 주소로 변경하고 `build.py`를 다시 실행하세요.

## 주의

- 이 페이지는 **로그인 없이 접근 가능해야** Google Play·App Store 심사를 통과할 수 있습니다.
- 개인정보처리방침의 내용을 변경할 때는 실제 서비스의 데이터 처리 방식과 일치하는지 반드시 확인하세요.
- 운영 주체, 개인정보 보호책임자, 시행일 등 확정 정보가 변경되면 `privacy.md`와 `account-deletion.html`을 함께 수정하세요.
