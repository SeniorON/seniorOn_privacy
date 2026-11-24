import { PageHeading } from '../components/PageHeading'

export function CompletionPage() {
  return <main className="completion-main">
    <div className="completion-content">
      <PageHeading currentStep="complete" />
      <section className="completion-result" aria-labelledby="completion-title">
        <img src="/assets/confirmation-check.svg" width="68" height="68" alt="" />
        <div className="completion-message">
          <h2 id="completion-title">회원 탈퇴가 완료되었어요</h2>
          <p>이 계정으로는 더 이상 로그인할 수 없어요. 탈퇴 후에도 보관되는 기록과 기간은 <a href="?page=privacy">개인정보처리방침</a>에서 확인해 주세요.</p>
        </div>
      </section>
    </div>
  </main>
}
