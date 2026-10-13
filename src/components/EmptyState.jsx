import { Link } from 'react-router-dom'
import { IconPlus } from './Icons.jsx'

export default function EmptyState({
  title = 'No records found',
  message = 'There are no entries matching your current filters or query.',
  actionText,
  actionLink,
  onAction,
}) {
  return (
    <div className="empty-state-card">
      <div className="empty-icon-wrap">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="m4.93 4.93 4.24 4.24" />
          <path d="m14.83 9.17 4.24-4.24" />
          <path d="m14.83 14.83 4.24 4.24" />
          <path d="m9.17 14.83-4.24 4.24" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      </div>
      <h3 className="empty-title">{title}</h3>
      <p className="empty-subtitle">{message}</p>
      {actionText && actionLink && (
        <Link to={actionLink} className="btn btn-primary empty-btn">
          <IconPlus size={16} />
          <span>{actionText}</span>
        </Link>
      )}
      {actionText && onAction && !actionLink && (
        <button onClick={onAction} className="btn btn-primary empty-btn">
          <IconPlus size={16} />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  )
}
