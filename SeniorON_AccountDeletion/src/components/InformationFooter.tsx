const appSteps = [
  { title: '앱을 열고 설정으로 이동하세요', description: <>아래 메뉴에서 <strong>설정</strong>을 누릅니다.</> },
  { title: '내 계정을 누르세요', description: <>설정 화면의 <strong>관리</strong> 항목에 있습니다.</> },
  { title: '탈퇴를 두 번 확인하세요', description: <>탈퇴를 누르면 안내 창이 열립니다.<br /><strong>한 번 더 탈퇴를 누르면 삭제됩니다.</strong></> },
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
          <p>시니어 계정은 앱 설정에서 직접 탈퇴하거나, 보호자가 시니어 연결을 해제할 수 있습니다.</p>
          <p>시니어가 탈퇴하면 개인정보가 바로 삭제되고, 쓰던 시니어 코드는 쓸 수 없게 됩니다. 보호자는 새 코드를 발급할 수 있습니다.</p>
        </div>
      </section>

      <section className="data-guide" aria-labelledby="data-guide-title">
        <h2 id="data-guide-title" className="ds-body-m-semibold">삭제·보관 정보와 처리 기간</h2>
        <div className="data-table-wrap">
          <table className="data-table ds-body-xs-regular"><tbody>
            <tr><th scope="row">삭제되는 정보</th><td><ul className="deleted-list">
              <li>이름, 아이디, 프로필 사진 등 계정 정보</li>
              <li>시니어와 가족(주담당자·보조담당자) 연결 정보</li>
              <li>가족과 공유한 사진</li>
              <li>복약 기록</li>
              <li>외출·귀가 및 위치 기록</li>
              <li>안전 알림 내역과 시니어 홈화면 설정</li>
            </ul></td></tr>
            <tr><th scope="row">보관되는 정보</th><td><ul>
              <li>신고·문의 처리 기록 <em>보관 기간 입력</em></li>
              <li>관련 법령에서 보관을 요구하는 정보 <em>보관 기간 입력</em></li>
            </ul><p className="table-note">위 정보는 필요한 기간 동안만 별도로 보관한 뒤 파기하며, 다른 용도로는 쓰지 않습니다.</p></td></tr>
            <tr><th scope="row">처리 기간</th><td><ul>
              <li>앱이나 이 페이지에서 탈퇴하면 계정은 <strong>바로 삭제됩니다.</strong></li>
              <li>서버에 남은 데이터는 <strong>7일 이내</strong>에 모두 삭제합니다.</li>
            </ul></td></tr>
          </tbody></table>
        </div>
      </section>
    </div>
  </footer>
}
