import './PageHeader.css'

type PageHeaderProps = {
  title: string
  subtitle?: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="page-header">
      <h2 className="page-header__title">{title}</h2>
      {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
    </div>
  )
}
