const stateKey = 'senioron-kakao-withdrawal-state'

export const kakaoRedirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI || `${window.location.origin}/`

export function startKakaoLogin() {
  const clientId = import.meta.env.VITE_KAKAO_REST_API_KEY?.trim()
  if (!clientId) throw new Error('카카오 로그인 설정이 필요합니다. 관리자에게 문의해 주세요.')

  const state = crypto.randomUUID()
  sessionStorage.setItem(stateKey, state)
  const url = new URL('https://kauth.kakao.com/oauth/authorize')
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('client_id', clientId)
  url.searchParams.set('redirect_uri', kakaoRedirectUri)
  url.searchParams.set('state', state)
  window.location.assign(url.toString())
}

export function consumeKakaoCallback(): string | null {
  const url = new URL(window.location.href)
  const code = url.searchParams.get('code')
  const error = url.searchParams.get('error')
  if (code === null && error === null) return null

  const returnedState = url.searchParams.get('state')
  const expectedState = sessionStorage.getItem(stateKey)
  sessionStorage.removeItem(stateKey)
  url.searchParams.delete('code')
  url.searchParams.delete('state')
  url.searchParams.delete('error')
  url.searchParams.delete('error_description')
  window.history.replaceState(window.history.state, '', url)

  if (!expectedState || returnedState !== expectedState) {
    throw new Error('카카오 로그인 요청이 일치하지 않습니다. 다시 시도해 주세요.')
  }
  if (error) {
    throw new Error(error === 'access_denied' ? '카카오 로그인이 취소되었습니다.' : '카카오 인증에 실패했습니다. 다시 시도해 주세요.')
  }
  if (!code?.trim()) throw new Error('카카오 인가 코드가 없습니다. 다시 시도해 주세요.')
  return code
}
