export const contactEmail = 'skishin04@naver.com'

function BrandLogo() {
  return <span className="brand-logo">
    <img className="brand-logo-white" src="/assets/auth-logo.png" alt="시니어온" />
    <img className="brand-logo-color" src="/assets/auth-logo.png" alt="" aria-hidden="true" />
  </span>
}

export function SiteHeader() {
  return <header className="site-header">
    <div className="header-inner">
      <div className="brand-lockup">
        <BrandLogo />
        <span className="brand-caption ds-caption-m-medium">부모님과 자녀를 잇는 <strong>디지털 케어 서비스</strong></span>
      </div>
      <a className="contact-pill ds-body-xs-regular" href={`mailto:${contactEmail}`}>
        <svg viewBox="0 0 20 20" aria-hidden="true"><rect x="2.5" y="4.5" width="15" height="11" rx="1.5" /><path d="m3.5 6 6.5 5 6.5-5" /></svg>
        {contactEmail}
      </a>
    </div>
  </header>
}
