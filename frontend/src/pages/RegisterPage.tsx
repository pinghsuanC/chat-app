import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Toolbar } from '../components/Toolbar'
import { FormField } from '../components/FormField'

type Step = 'details' | 'verify'

export function RegisterPage() {
  const { t } = useTranslation()
  const [step, setStep] = useState<Step>('details')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [code, setCode] = useState('')

  const passwordMismatch = confirmPassword.length > 0 && confirmPassword !== password

  function handleDetails(e: React.FormEvent) {
    e.preventDefault()
    if (passwordMismatch || !confirmPassword) return
    // TODO: call backend to create account + send verification email
    setStep('verify')
  }

  function handleVerify(e: React.FormEvent) {
    e.preventDefault()
    // TODO: call backend to verify code and complete registration
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ background: 'var(--color-bg)' }}>
      <Toolbar />
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md mx-4 rounded-lg p-8 shadow-lg" style={{ background: 'var(--color-sidebar)' }}>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-textPrimary)' }}>
              DiscordDup
            </h1>
            <p className="text-sm" style={{ color: 'var(--color-textMuted)' }}>
              {step === 'details' ? t('REGISTER.CREATE_ACCOUNT') : t('REGISTER.CHECK_EMAIL', { email })}
            </p>
          </div>

          {/* Step indicators */}
          <div className="flex items-center gap-2 mb-8">
            {(['details', 'verify'] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 text-white"
                  style={{ background: step === s || (s === 'details' && step === 'verify') ? 'var(--color-accent)' : 'var(--color-sidebarInput)' }}
                >
                  {s === 'details' && step === 'verify' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  ) : i + 1}
                </div>
                <span className="text-xs truncate" style={{ color: step === s ? 'var(--color-textPrimary)' : 'var(--color-textMuted)' }}>
                  {s === 'details' ? t('REGISTER.STEP_DETAILS') : t('REGISTER.STEP_VERIFY')}
                </span>
                {i < 1 && <div className="flex-1 h-px mx-1" style={{ background: 'var(--color-headerBorder)' }} />}
              </div>
            ))}
          </div>

          {/* Step 1 — account details */}
          {step === 'details' && (
            <form onSubmit={handleDetails} className="flex flex-col gap-4">
              <FormField label={t('AUTH.EMAIL')} type="email" value={email} onChange={setEmail} required />
              <FormField label={t('REGISTER.USERNAME')} value={username} onChange={setUsername} required />
              <FormField label={t('AUTH.PASSWORD')} type="password" value={password} onChange={setPassword} required />
              <FormField
                label={t('REGISTER.CONFIRM_PASSWORD')}
                type="password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                required
                error={passwordMismatch ? t('REGISTER.PASSWORDS_DONT_MATCH') : undefined}
              />

              <button
                type="submit"
                disabled={passwordMismatch || !confirmPassword}
                className="w-full py-2.5 rounded-md text-sm font-semibold text-white mt-2 transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: 'var(--color-accent)' }}
              >
                {t('REGISTER.CONTINUE')}
              </button>
            </form>
          )}

          {/* Step 2 — verify email */}
          {step === 'verify' && (
            <form onSubmit={handleVerify} className="flex flex-col gap-4">
              <FormField
                label={t('REGISTER.VERIFICATION_CODE')}
                value={code}
                onChange={setCode}
                required
                maxLength={6}
                placeholder="······"
                inputClassName="text-center text-lg tracking-widest font-mono"
                hint={t('REGISTER.CODE_HINT')}
              />

              <button
                type="submit"
                className="w-full py-2.5 rounded-md text-sm font-semibold text-white mt-2 transition-opacity hover:opacity-90"
                style={{ background: 'var(--color-accent)' }}
              >
                {t('REGISTER.VERIFY')}
              </button>

              <button
                type="button"
                onClick={() => setStep('details')}
                className="w-full py-2 text-sm transition-colors"
                style={{ color: 'var(--color-textMuted)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-textPrimary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-textMuted)')}
              >
                {t('REGISTER.BACK')}
              </button>
            </form>
          )}

          {/* Login link */}
          <p className="text-center text-sm mt-6" style={{ color: 'var(--color-textMuted)' }}>
            {t('REGISTER.HAVE_ACCOUNT')}{' '}
            <Link to="/login" className="font-medium hover:underline" style={{ color: 'var(--color-accent)' }}>
              {t('AUTH.LOGIN')}
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}
