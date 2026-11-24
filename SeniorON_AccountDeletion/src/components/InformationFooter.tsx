const appSteps = [
  { title: '설정을 열어 주세요', description: <>보호자는 하단의 <strong>설정</strong> 탭을, 시니어는 홈 화면의 <strong>설정</strong>을 눌러 주세요.</> },
  { title: '탈퇴하기를 선택해 주세요', description: <>설정 화면을 아래로 내려 <strong>탈퇴하기</strong>를 눌러 주세요.</> },
  { title: '탈퇴를 확인해 주세요', description: <>안내를 읽고 탈퇴를 확인해 주세요. <strong>탈퇴한 계정은 복구할 수 없어요.</strong></> },
]

export function InformationFooter() {
  return <footer className="information-footer">
    <div className="footer-inner">
      <section className="app-guide" aria-labelledby="app-guide-title">
        <h2 id="app-guide-title" className="ds-body-m-semibold">앱에서 탈퇴하는 방법</h2>
        <ol className="app-steps">
          {appSteps.map((step, index) => <li key={step.title}>
            <div className="app-step-heading"><span className="app-step-number">{index + 1}</span>{step.title}</div>
            <span className="app-step-dot" aria-hidden="true" />
            <p className="ds-caption-s-medium">{step.description}</p>
          </li>)}
        </ol>
        <div className="app-note ds-caption-m-regular">
          <p>앱을 삭제하거나 가족과의 연결을 해제하는 것만으로는 회원 탈퇴가 되지 않아요. 앱을 사용할 수 없다면 이 페이지에서 가입할 때 사용한 방법으로 로그인한 뒤 탈퇴해 주세요.</p>
          <p>주담당자에게 연결된 다른 보호자가 있다면 먼저 권한을 넘겨 주세요. 시니어와 단둘이 연결되어 있다면 다른 보호자를 추가해 권한을 넘기거나, 시니어가 먼저 탈퇴한 뒤 진행할 수 있어요.</p>
        </div>
      </section>

      <section className="data-guide" aria-labelledby="data-guide-title">
        <h2 id="data-guide-title" className="ds-body-m-semibold">삭제·보관 정보와 처리 기간</h2>
        <div className="data-table-wrap">
          <table className="data-table ds-body-xs-regular"><tbody>
            <tr><th scope="row">삭제되는 정보</th><td><ul className="deleted-list">
              <li>아이디·이메일·이름은 원래 값을 알아볼 수 없도록 변경하고, 전화번호·생년월일·프로필 사진 정보는 삭제해요.</li>
              <li>소셜 계정 연결, 로그인 갱신 토큰, 기기 등록 정보와 본인의 가족 연결 정보를 삭제해요.</li>
              <li>본인이 올린 가족 사진을 삭제해요. 다른 가족이 올린 사진까지 삭제되는 것은 아니에요.</li>
              <li>시니어가 탈퇴하면 해당 시니어의 프로필, 복약·병원 정보와 위치·안전 이벤트 기록도 삭제해요.</li>
            </ul></td></tr>
            <tr><th scope="row">보관되는 정보</th><td><ul>
              <li>시니어가 탈퇴하면 보호자가 이를 확인할 수 있도록 이름과 탈퇴 안내 기록을 남겨요. 모든 보호자가 확인한 뒤 1일이 지나거나, 확인하지 않아도 탈퇴 후 30일이 지나면 정리 대상이 돼요.</li>
              <li>문의와 답변은 처리 완료 후 1년 동안 보관해요. 분쟁이 진행 중이라면 해당 절차가 끝날 때까지 보관해요.</li>
              <li>신고와 처리 내역은 분쟁 대응·감사에 필요한 목적이 달성될 때까지 보관하고, 법령상 보존 의무가 있는 기록은 해당 법령이 정한 기간 동안 보관해요.</li>
            </ul></td></tr>
            <tr><th scope="row">처리 시점</th><td>앱이나 이 페이지에서 탈퇴가 완료되면 해당 계정으로는 더 이상 로그인할 수 없어요. 별도로 보관하는 기록은 위 기간이나 목적이 끝난 뒤 파기해요. 자세한 내용은 <a href="?page=privacy">개인정보처리방침</a>에서 확인해 주세요.</td></tr>
          </tbody></table>
        </div>
      </section>
    </div>
  </footer>
}
