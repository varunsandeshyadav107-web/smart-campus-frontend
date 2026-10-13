import { IconTrash, IconClose } from './Icons.jsx'

export default function ConfirmDialog({
  title = 'Confirm deletion',
  message,
  confirmText = 'Delete Record',
  busy,
  onConfirm,
  onCancel,
}) {
  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div
        className="modal-box"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-danger-icon">
            <IconTrash size={22} />
          </div>
          <button
            className="btn-icon modal-close-btn"
            onClick={onCancel}
            disabled={busy}
            aria-label="Close dialog"
          >
            <IconClose size={18} />
          </button>
        </div>

        <div className="modal-body">
          <h3 className="modal-title">{title}</h3>
          <p className="modal-desc">{message}</p>
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={busy}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={busy}
          >
            {busy ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
