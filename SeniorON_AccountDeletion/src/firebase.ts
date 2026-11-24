import { FirebaseError, initializeApp } from 'firebase/app'
import { browserPopupRedirectResolver, GoogleAuthProvider, inMemoryPersistence, initializeAuth, signInWithPopup, signOut } from 'firebase/auth'

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyB-XNzoaxyEOUVq_batK8jB8lNQNobn9JA',
  authDomain: 'senioron-8c2e1.firebaseapp.com',
  projectId: 'senioron-8c2e1',
  storageBucket: 'senioron-8c2e1.firebasestorage.app',
  messagingSenderId: '96611521228',
  appId: '1:96611521228:web:953222093ee9d479d6a869',
})

const auth = initializeAuth(firebaseApp, {
  persistence: inMemoryPersistence,
  popupRedirectResolver: browserPopupRedirectResolver,
})

export async function googleIdToken(): Promise<{ idToken: string; email: string | null }> {
  const { user } = await signInWithPopup(auth, new GoogleAuthProvider())
  try {
    return { idToken: await user.getIdToken(), email: user.email }
  } finally {
    await signOut(auth)
  }
}

export function googleLoginError(cause: unknown): string {
  if (cause instanceof FirebaseError) {
    if (cause.code === 'auth/popup-closed-by-user' || cause.code === 'auth/cancelled-popup-request') return ''
    if (cause.code === 'auth/popup-blocked') return '팝업이 차단되었습니다. 브라우저에서 팝업을 허용한 뒤 다시 시도해 주세요.'
    if (cause.code === 'auth/unauthorized-domain') return '현재 웹 주소가 Firebase 승인된 도메인에 등록되지 않았습니다.'
    if (cause.code === 'auth/operation-not-allowed') return 'Firebase에서 Google 로그인 제공자를 활성화해 주세요.'
  }
  return cause instanceof Error ? cause.message : '구글 로그인에 실패했습니다. 다시 시도해 주세요.'
}
