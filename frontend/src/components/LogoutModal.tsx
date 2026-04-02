import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface LogoutModalProps {
  onCancel: () => void
}

export function LogoutModal({ onCancel }: LogoutModalProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  function handleConfirm() {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    navigate('/login', { replace: true })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.6)' }}>
      <div className="w-full max-w-sm mx-4 rounded-lg p-6 shadow-xl" style={{ background: 'var(--color-sidebar)' }}>
        <h2 className="text-base font-semibold mb-2" style={{ color: 'var(--color-textPrimary)' }}>
          {t('LOGOUT.TITLE')}
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--color-textMuted)' }}>
          {t('LOGOUT.MESSAGE')}
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
            style={{ color: 'var(--color-textMuted)' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-hoverItem)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            {t('LOGOUT.CANCEL')}
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded-md text-sm font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer"
            style={{ background: '#ef4444' }}
          >
            {t('LOGOUT.CONFIRM')}
          </button>
        </div>
      </div>
    </div>
  )
}
