export default function ProgressBar({ value = 0, label = "" }) {
  const v = Math.max(0, Math.min(100, value))
  return (
    <div className="progress" role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <div className="progress-track">
        <div className="progress-bar" style={{ width: `${v}%` }} />
        <div className="progress-shine" />
      </div>
      <div className="progress-text" aria-live="polite">{label}</div>
    </div>
  )
}
