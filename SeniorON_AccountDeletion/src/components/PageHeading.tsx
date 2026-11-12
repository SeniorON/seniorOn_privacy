type Step = 'login' | 'confirmation' | 'complete'

const steps: { id: Step; label: string }[] = [
  { id: 'login', label: '로그인' },
  { id: 'confirmation', label: '탈퇴 확인' },
  { id: 'complete', label: '접수 완료' },
]

export function PageHeading({ currentStep }: { currentStep: Step }) {
  return <div className="page-heading">
    <h1 id="page-title" className="ds-title-s">계정 및 데이터 삭제</h1>
    <p className="intro-copy ds-body-xs-medium">
      이 페이지는 Google Play에 게시된 시니어On 앱의 계정 삭제를 다룹니다.<br />
      앱을 다시 설치하지 않아도 아이디와 비밀번호로 바로 탈퇴할 수 있습니다.
    </p>
    <nav className="progress" aria-label="탈퇴 진행 단계">
      <ol>{steps.map(step => <li key={step.id} aria-current={step.id === currentStep ? 'step' : undefined}>{step.label}</li>)}</ol>
    </nav>
  </div>
}
