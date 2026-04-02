import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function AuthCallbackPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    const refresh = params.get('refresh')

    if (token && refresh) {
      localStorage.setItem('token', token)
      localStorage.setItem('refreshToken', refresh)
      navigate('/chat', { replace: true })
    } else if (localStorage.getItem('token') && localStorage.getItem('refreshToken')) {
      // Already stored from a previous render (StrictMode double-invoke)
      navigate('/chat', { replace: true })
    } else {
      navigate('/login?error=auth_failed', { replace: true })
    }
  }, [navigate])

  return null
}
