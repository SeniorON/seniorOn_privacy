const API_BASE = import.meta.env.VITE_API_BASE_URL ?? (import.meta.env.DEV ? '/api' : 'https://senioron.site/api')

type Envelope<T> = { code?: string; message?: string; data?: T }

export class ApiError extends Error {
  status: number
  code?: string
  constructor(message: string, status: number, code?: string) {
    super(message)
    this.status = status
    this.code = code
  }
}

async function request<T>(path: string, init: RequestInit, token?: string): Promise<T> {
  let response: globalThis.Response
  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...init.headers,
      },
    })
  } catch {
    throw new ApiError('서버에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요.', 0)
  }
  let body: Envelope<T> | undefined
  try { body = await response.json() as Envelope<T> } catch { /* empty response */ }
  if (!response.ok || !body || !['COMMON_200', 'COMMON_201', 'COMMON_204'].includes(body.code ?? '')) {
    throw new ApiError(body?.message || '요청을 처리하지 못했습니다. 다시 시도해 주세요.', response.status, body?.code)
  }
  return body?.data as T
}

export type LoginData = { usersId: number; name: string; loginId: string; role: 'CHILD' | 'PARENT'; accessToken: string }
export type GoogleLoginData = { usersId: number | null; name: string; role: 'CHILD' | 'PARENT' | null; accessToken: string | null; newUser: boolean }
export type KakaoWithdrawalLoginData = { usersId: number; name: string; role: 'CHILD' | 'PARENT'; accessToken: string; newUser: false }
export type FamilyStatus = { familyId: number; seniorId: number | null; seniorName: string | null; managerType: 'PRIMARY' | 'SUB' | 'NONE' | null }
export type OnboardingStatus = { families: FamilyStatus[] }
export type FamilyMember = { usersId: number; name: string; role: 'CHILD' | 'PARENT'; canBecomePrimary: boolean; managerType: 'PRIMARY' | 'SUB' | 'NONE'; me: boolean }

export const accountApi = {
  login: (loginId: string, password: string) => request<LoginData>('/users/login', {
    method: 'POST', body: JSON.stringify({ loginId, password }),
  }),
  googleLogin: (firebaseIdToken: string) => request<GoogleLoginData>('/social-accounts/login/google', {
    method: 'POST', body: JSON.stringify({ firebaseIdToken }),
  }),
  kakaoWithdrawalLogin: (code: string) => request<KakaoWithdrawalLoginData>('/social-accounts/login/kakao/withdrawal', {
    method: 'POST', body: JSON.stringify({ code }),
  }),
  onboarding: (token: string) => request<OnboardingStatus>('/users/me/onboarding-status', { method: 'GET' }, token),
  members: (token: string, seniorId: number) => request<FamilyMember[]>(`/family/members?seniorId=${encodeURIComponent(seniorId)}`, { method: 'GET' }, token),
  transfer: (token: string, seniorId: number, targetUserId: number) => request<void>(`/family/primary-manager?seniorId=${encodeURIComponent(seniorId)}`, {
    method: 'PATCH', body: JSON.stringify({ targetUserId }),
  }, token),
  withdraw: (token: string) => request<void>('/users/me', {
    method: 'DELETE', body: JSON.stringify({ confirmation: '회원 탈퇴' }),
  }, token),
}
