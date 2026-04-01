interface FormFieldProps {
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  error?: string
  hint?: string
  placeholder?: string
  inputClassName?: string
  maxLength?: number
}

export function FormField({
  label,
  type = 'text',
  value,
  onChange,
  required,
  error,
  hint,
  placeholder,
  inputClassName = '',
  maxLength,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase" style={{ color: 'var(--color-textMuted)' }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full px-3 py-2 rounded-md text-sm outline-none ${inputClassName}`}
        style={{ background: 'var(--color-sidebarInput)', color: 'var(--color-textBody)' }}
        onFocus={e => (e.currentTarget.style.outline = `2px solid ${error ? '#f87171' : 'var(--color-accent)'}`)}
        onBlur={e => (e.currentTarget.style.outline = error ? '2px solid #f87171' : 'none')}
      />
      {error && <p className="text-xs" style={{ color: '#f87171' }}>{error}</p>}
      {hint && !error && <p className="text-xs" style={{ color: 'var(--color-textMuted)' }}>{hint}</p>}
    </div>
  )
}
