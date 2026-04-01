import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Toolbar } from '../components/Toolbar'
import { FormField } from '../components/FormField'
import { Divider } from '../components/Divider'

export function LoginPage() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit: React.ComponentProps<'form'>['onSubmit'] = (e) => {
    e.preventDefault()
    // TODO: implement email/password auth
  }

  function handleGoogleLogin() {
    window.location.href = '/api/auth/google'
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: 'var(--color-bg)' }}>
      <Toolbar />
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md mx-4 rounded-lg p-8 shadow-lg" style={{ background: 'var(--color-sidebar)' }}>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-textPrimary)' }}>
              DiscordDup
            </h1>
            <p className="text-sm" style={{ color: 'var(--color-textMuted)' }}>
              {t('AUTH.WELCOME_BACK')}
            </p>
          </div>

          {/* Email/password form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <FormField label={t('AUTH.EMAIL')} type="email" value={email} onChange={setEmail} required />
            <FormField label={t('AUTH.PASSWORD')} type="password" value={password} onChange={setPassword} required />

            <button
              type="submit"
              className="w-full py-2.5 rounded-md text-sm font-semibold text-white mt-2 transition-opacity hover:opacity-90 cursor-pointer"
              style={{ background: 'var(--color-accent)' }}
            >
              {t('AUTH.LOGIN')}
            </button>
          </form>

          <Divider label={t('AUTH.OR')} />

          {/* Google button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-2.5 rounded-md text-sm font-medium transition-colors border cursor-pointer"
            style={{
              background: 'transparent',
              color: 'var(--color-textBody)',
              borderColor: 'var(--color-headerBorder)',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-hoverItem)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            {t('AUTH.CONTINUE_WITH_GOOGLE')}
          </button>

          {/* Register link */}
          <p className="text-center text-sm mt-6" style={{ color: 'var(--color-textMuted)' }}>
            {t('AUTH.NO_ACCOUNT')}{' '}
            <Link to="/register" className="font-medium hover:underline" style={{ color: 'var(--color-accent)' }}>
              {t('AUTH.REGISTER')}
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}
