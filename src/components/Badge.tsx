import './Badge.css'

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'default'

type BadgeProps = {
  label: string
  variant?: BadgeVariant
}

export function Badge({ label, variant = 'default' }: BadgeProps) {
  return <span className={`badge badge--${variant}`}>{label}</span>
}
