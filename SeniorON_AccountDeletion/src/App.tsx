import { useState, type FormEvent } from 'react'
import { SiteHeader, contactEmail } from './components/SiteHeader'
import { PageHeading } from './components/PageHeading'
import { InformationFooter } from './components/InformationFooter'
import { ConfirmationPage } from './pages/ConfirmationPage'
import { CompletionPage } from './pages/CompletionPage'
import { accountApi, ApiError, type FamilyStatus, type LoginData } from './api/account'
import { TransferPage } from './pages/TransferPage'
import './App.css'

function LoginPage({ onLogin, busy, serverError }: { onLogin: (id: string, password: string) => void; busy: boolean; serverError: string }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [loginNotice, setLoginNotice] = useState('')
  const [loginError, setLoginError] = useState('')
  const [invalidFields, setInvalidFields] = useState({ email: false, password: false })

  function clearLoginError() {
    setLoginError('')
    setInvalidFields({ email: false, password: false })
  }

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoginNotice('')
    const missingEmail = !email.trim()
    const missingPassword = !password
    if (missingEmail || missingPassword) {
      setInvalidFields({ email: missingEmail, password: missingPassword })
      setLoginError('아이디와 비밀번호를 입력해 주세요.')
      return
    }
    clearLoginError()
    onLogin(email.trim(), password)
  }

  function handleSocialLogin() {
    clearLoginError()
    setLoginNotice('소셜 로그인은 앱의 카카오 액세스 토큰 또는 Firebase ID 토큰 연동이 필요합니다. 현재는 아이디로 로그인해 주세요.')
  }

  return <main className="login-main">
    <section className="login-content" aria-labelledby="page-title">
      <PageHeading currentStep="login" />
      <form className="login-form" onSubmit={handleLogin} noValidate onFocusCapture={event => {
        if (event.target instanceof HTMLInputElement) clearLoginError()
      }}>
        <label className="sr-only" htmlFor="email">아이디</label>
        <input id="email" name="loginId" type="text" autoComplete="username" placeholder="아이디" value={email} aria-invalid={invalidFields.email || undefined} aria-describedby={loginError ? 'login-error' : undefined} onChange={event => { setEmail(event.target.value); clearLoginError() }} />
        <div className={`password-field${invalidFields.password ? ' invalid' : ''}`}>
          <label className="sr-only" htmlFor="password">비밀번호</label>
          <input id="password" name="password" type={passwordVisible ? 'text' : 'password'} autoComplete="current-password" placeholder="비밀번호" value={password} aria-invalid={invalidFields.password || undefined} aria-describedby={loginError ? 'login-error' : undefined} onChange={event => { setPassword(event.target.value); clearLoginError() }} />
          <button type="button" className="password-toggle" aria-label={passwordVisible ? '비밀번호 숨기기' : '비밀번호 보기'} aria-pressed={passwordVisible} onMouseDown={event => { if (event.button === 0) event.preventDefault() }} onClick={() => setPasswordVisible(value => !value)}>
            <img src={passwordVisible ? '/assets/auth-imgIconEye.svg' : '/assets/auth-eye.svg'} alt="" />
          </button>
        </div>
        {(loginError || serverError) && <p id="login-error" className="auth-field-error" role="alert"><img src="/assets/auth-error.svg" alt="" />{loginError || serverError}</p>}
        <button className="login-button ds-body-xs-medium" type="submit" disabled={busy}>{busy ? '로그인 중...' : '로그인'}</button>
      </form>
      <div className="social-divider ds-caption-m-medium"><span>SNS 계정으로 로그인</span></div>
      <div className="social-buttons">
        <button className="social-button kakao-button" type="button" aria-label="카카오로 로그인" onClick={handleSocialLogin}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5c-5.25 0-9.5 3.35-9.5 7.49 0 2.68 1.78 5.03 4.46 6.35l-.94 3.47a.4.4 0 0 0 .6.44l4.08-2.71c.42.05.85.07 1.3.07 5.25 0 9.5-3.35 9.5-7.49S17.25 3.5 12 3.5Z" /></svg>
        </button>
        <button className="social-button google-button" type="button" aria-label="구글로 로그인" onClick={handleSocialLogin}><span aria-hidden="true">G</span></button>
      </div>
      {loginNotice && <p className="login-notice ds-caption-m-regular" role="status">{loginNotice}</p>}
      <div className="login-help">
        <h2>로그인할 수 없나요?</h2>
        <p>가입한 아이디(또는 SNS 계정)와 이름을 적어<br />
          <a href={`mailto:${contactEmail}?subject=%5BSeniorON%5D%20%EA%B3%84%EC%A0%95%20%EC%82%AD%EC%A0%9C%20%EC%9A%94%EC%B2%AD`}>{contactEmail}</a> 으로 보내 주세요.<br />본인 확인 후 처리해 드립니다.</p>
      </div>
    </section>
  </main>
}

function App() {
  const previewScreen = import.meta.env.DEV ? new URLSearchParams(window.location.search).get('screen') : null
  const [screen, setScreen] = useState<'login' | 'confirmation' | 'transfer' | 'complete'>(previewScreen === 'complete' ? 'complete' : previewScreen === 'confirmation' ? 'confirmation' : 'login')
  const [account, setAccount] = useState<LoginData | null>(null)
  const [primaryFamilies, setPrimaryFamilies] = useState<FamilyStatus[]>([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(loginId: string, password: string) {
    setBusy(true)
    setError('')
    try {
      const loggedIn = await accountApi.login(loginId, password)
      const status = await accountApi.onboarding(loggedIn.accessToken)
      setAccount(loggedIn)
      const primary = (status.families ?? []).filter(family => family.managerType === 'PRIMARY')
      setPrimaryFamilies(primary)
      setScreen(primary.length ? 'transfer' : 'confirmation')
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : '로그인하지 못했습니다.')
    } finally { setBusy(false) }
  }

  async function handleDelete() {
    if (!account) return
    setBusy(true)
    setError('')
    try {
      await accountApi.withdraw(account.accessToken)
      setAccount(null)
      setScreen('complete')
    } catch (cause) {
      if (cause instanceof ApiError && cause.code === 'USER403_1') {
        try {
          const status = await accountApi.onboarding(account.accessToken)
          setPrimaryFamilies((status.families ?? []).filter(family => family.managerType === 'PRIMARY'))
          setScreen('transfer')
        } catch { setError('주담당자 정보를 불러오지 못했습니다. 다시 로그인해 주세요.') }
      } else {
        setError(cause instanceof Error ? cause.message : '탈퇴 요청에 실패했습니다.')
      }
    } finally { setBusy(false) }
  }

  function reset() {
    setAccount(null)
    setPrimaryFamilies([])
    setError('')
    setScreen('login')
  }

  return <div className="site-shell">
    <SiteHeader />
    {screen === 'complete' ? <CompletionPage /> : screen === 'transfer' && account ?
      <TransferPage token={account.accessToken} families={primaryFamilies} onDone={remaining => { setPrimaryFamilies(remaining); if (!remaining.length) setScreen('confirmation') }} onCancel={reset} /> :
      screen === 'confirmation' ? <ConfirmationPage accountId={account?.loginId ?? '미리보기 계정'} onDelete={handleDelete} onCancel={reset} busy={busy} error={error} /> :
      <LoginPage onLogin={handleLogin} busy={busy} serverError={error} />}
    {screen !== 'complete' && <InformationFooter />}
  </div>
}

export default App
