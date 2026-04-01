interface DividerProps {
  label?: string
}

export function Divider({ label }: DividerProps) {
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="flex-1 h-px" style={{ background: 'var(--color-headerBorder)' }} />
      {label && <span className="text-xs" style={{ color: 'var(--color-textMuted)' }}>{label}</span>}
      <div className="flex-1 h-px" style={{ background: 'var(--color-headerBorder)' }} />
    </div>
  )
}
