type Step = 'login' | 'confirmation' | 'complete'

const steps: { id: Step; label: string }[] = [
  { id: 'login', label: '로그인' },
  { id: 'confirmation', label: '탈퇴 확인' },
  { id: 'complete', label: '탈퇴 완료' },
]

export function PageHeading({ currentStep }: { currentStep: Step }) {
  return <div className="page-heading">
    <h1 id="page-title" className="ds-title-s">계정 및 데이터 삭제</h1>
    <p className="intro-copy ds-body-xs-medium">
      앱을 다시 설치하지 않아도 시니어On 계정을 삭제할 수 있어요.<br />
      가입할 때 사용한 아이디 또는 소셜 계정으로 로그인해 주세요.
    </p>
    <nav className="progress" aria-label="탈퇴 진행 단계">
      <ol>{steps.map(step => <li key={step.id} aria-current={step.id === currentStep ? 'step' : undefined}>{step.label}</li>)}</ol>
    </nav>
  </div>
}
