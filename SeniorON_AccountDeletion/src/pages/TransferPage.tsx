import { useEffect, useRef, useState } from 'react'
import { accountApi, type FamilyMember, type FamilyStatus } from '../api/account'
import { PageHeading } from '../components/PageHeading'

export function TransferPage({ token, families, onDone, onCancel }: {
  token: string
  families: FamilyStatus[]
  onDone: (remaining: FamilyStatus[]) => void
  onCancel: () => void
}) {
  const [seniorId, setSeniorId] = useState<number | null>(families[0]?.seniorId ?? null)
  const [members, setMembers] = useState<FamilyMember[]>([])
  const [targetId, setTargetId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingMembers, setLoadingMembers] = useState(families[0]?.seniorId != null)
  const [error, setError] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!dropdownOpen) return
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setDropdownOpen(false)
    }
    document.addEventListener('pointerdown', closeOnOutsideClick)
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick)
  }, [dropdownOpen])

  useEffect(() => {
    if (seniorId == null) return
    let active = true
    accountApi.members(token, seniorId).then(data => {
      if (active) { setMembers(data); setTargetId(null); setError('') }
    }).catch((cause: Error) => { if (active) setError(cause.message) })
      .finally(() => { if (active) setLoadingMembers(false) })
    return () => { active = false }
  }, [token, seniorId])

  async function transfer() {
    if (seniorId == null || targetId == null) return
    setLoading(true)
    setError('')
    try {
      await accountApi.transfer(token, seniorId, targetId)
      const remaining = families.filter(family => family.seniorId !== seniorId)
      setLoadingMembers(remaining.length > 0)
      setSeniorId(remaining[0]?.seniorId ?? null)
      setMembers([])
      onDone(remaining)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : '권한을 양도하지 못했습니다.')
    } finally { setLoading(false) }
  }

  const selectedSenior = families.find(family => family.seniorId === seniorId)

  return <main className="confirmation-main transfer-main">
    <div className="confirmation-content transfer-content">
      <PageHeading currentStep="confirmation" />
      <section className="confirmation-card transfer-card" aria-labelledby="transfer-title">
        <div className="confirmation-card-inner">
          <h2 id="transfer-title">주담당자 권한을 양도해 주세요</h2>
          <p>주담당자인 시니어가 있어 바로 탈퇴할 수 없습니다. 다른 보호자에게 권한을 양도한 뒤 탈퇴를 진행해 주세요.</p>
          <label id="senior-select-label">담당 시니어</label>
          <div className="senior-dropdown" ref={dropdownRef} onKeyDown={event => { if (event.key === 'Escape') setDropdownOpen(false) }}>
            <button className="senior-dropdown-trigger" type="button" aria-labelledby="senior-select-label senior-select-value" aria-expanded={dropdownOpen} aria-controls={dropdownOpen ? 'senior-options' : undefined} onClick={() => setDropdownOpen(value => !value)}>
              <span id="senior-select-value">{selectedSenior?.seniorName || (seniorId != null ? `시니어 ${seniorId}` : '시니어를 선택해 주세요')}</span>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 9 7 7 7-7" /></svg>
            </button>
            {dropdownOpen && <div id="senior-options" className="senior-dropdown-options">
              {families.filter(family => family.seniorId != null).map(family => <button key={family.familyId} type="button" aria-current={family.seniorId === seniorId ? 'true' : undefined} onClick={() => { setMembers([]); setTargetId(null); setError(''); setLoadingMembers(true); setSeniorId(family.seniorId); setDropdownOpen(false) }}>{family.seniorName || `시니어 ${family.seniorId}`}</button>)}
            </div>}
          </div>
          <fieldset>
            <legend>새 주담당자 선택</legend>
            {members.filter(member => !member.me && member.canBecomePrimary).map(member =>
              <label key={member.usersId} className="transfer-member ds-body-xs-medium"><input type="radio" name="target" checked={targetId === member.usersId} onChange={() => setTargetId(member.usersId)} />{member.name}</label>)}
            {loadingMembers ? <p>보호자 목록을 불러오는 중입니다.</p> : !members.some(member => !member.me && member.canBecomePrimary) && <p>권한을 양도받을 수 있는 다른 보호자가 없습니다.</p>}
          </fieldset>
          {error && <p className="api-error" role="alert">{error}</p>}
          <div className="confirmation-actions">
            <button className="cancel-button" type="button" onClick={onCancel}>취소</button>
            <button className="transfer-submit" type="button" onClick={transfer} disabled={targetId == null || loading || loadingMembers}>{loading ? '양도 중...' : '권한 양도'}</button>
          </div>
        </div>
      </section>
    </div>
  </main>
}
