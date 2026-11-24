import { useState } from 'react'
import { PageHeading } from '../components/PageHeading'

const confirmationPhrase = '회원 탈퇴'

export function ConfirmationPage({ accountId, onDelete, onCancel, busy, error }: {
  accountId: string
  onDelete: () => void
  onCancel: () => void
  busy: boolean
  error: string
}) {
  const [confirmation, setConfirmation] = useState('')
  const canDelete = confirmation.trim() === confirmationPhrase

  return <main className="confirmation-main">
    <div className="confirmation-content">
      <PageHeading currentStep="confirmation" />
      <section className="confirmation-card" aria-labelledby="confirmation-title">
        <div className="confirmation-card-inner">
          <h2 id="confirmation-title">정말 계정을 삭제하시겠어요?</h2>
          <div className="confirmation-warning">
            <strong>계정 삭제 후 복구할 수 없어요.</strong>
            <p>서비스 이용 정보와 연결 관계 등은 탈퇴 정책에 따라 처리됩니다.<br />삭제 및 보관 범위를 꼭 확인해 주세요.</p>
          </div>

          <div className="verified-account">
            <div><span>본인 확인 완료 계정</span><strong>{accountId}</strong></div>
            <button type="button" onClick={onCancel}>다른 계정으로 로그인 <span aria-hidden="true">›</span></button>
          </div>

          <div className="confirmation-field">
            <label htmlFor="confirmation-phrase">계속하려면 <strong>“회원 탈퇴”</strong>를 정확히 입력해 주세요.</label>
            <input id="confirmation-phrase" type="text" value={confirmation} onChange={event => setConfirmation(event.target.value)} placeholder="회원 탈퇴" autoComplete="off" />
            <p>앞뒤 공백을 제외하고 정확히 입력하면 계정 삭제하기 버튼이 활성화됩니다.</p>
            {error && <p className="api-error" role="alert">{error}</p>}
          </div>

          <div className="confirmation-actions">
            <button className="cancel-button" type="button" onClick={onCancel} disabled={busy}>취소</button>
            <button className="delete-button" type="button" disabled={!canDelete || busy} onClick={onDelete}>{busy ? '처리 중...' : '계정 삭제하기'}</button>
          </div>
        </div>
      </section>
    </div>
  </main>
}
