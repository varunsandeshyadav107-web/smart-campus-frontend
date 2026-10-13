export default function Loader({ text = 'Loading records...' }) {
  return (
    <div className="loader-container" role="status">
      <div className="loader-pulse">
        <div className="spinner-ring" />
      </div>
      <p className="loader-text">{text}</p>
    </div>
  )
}
