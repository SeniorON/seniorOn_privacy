import { PageHeading } from '../components/PageHeading'

export function CompletionPage() {
  return <main className="completion-main">
    <div className="completion-content">
      <PageHeading currentStep="complete" />
      <section className="completion-result" aria-labelledby="completion-title">
        <img src="/assets/confirmation-check.svg" width="68" height="68" alt="" />
        <div className="completion-message">
          <h2 id="completion-title">계정 삭제 요청이 접수되었습니다</h2>
          <p>계정은 바로 삭제되었습니다.<br />서버에 남은 데이터는 7일 이내에 모두 삭제됩니다.</p>
        </div>
      </section>
    </div>
  </main>
}
