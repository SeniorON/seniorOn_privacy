export const contactEmail = 'senioron.official@gmail.com'

function BrandLogo() {
  return <span className="brand-logo">
    <img className="brand-logo-white" src="/assets/auth-logo.png" alt="시니어온" />
    <img className="brand-logo-color" src="/assets/auth-logo.png" alt="" aria-hidden="true" />
  </span>
}

export function SiteHeader({ privacy = false }: { privacy?: boolean }) {
  return <header className="site-header">
    <div className="header-inner">
      <div className="brand-lockup">
        <BrandLogo />
        <span className="brand-caption ds-caption-m-medium">부모님과 자녀를 잇는 <strong>디지털 케어 서비스</strong></span>
      </div>
      <nav className="site-tabs" aria-label="주요 페이지">
        <a href="?page=privacy" aria-current={privacy ? 'page' : undefined}>개인정보처리방침</a>
        <a href="?" aria-current={!privacy ? 'page' : undefined}>계정 삭제</a>
      </nav>
    </div>
  </header>
}
