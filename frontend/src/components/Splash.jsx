import ProgressBar from "./ProgressBar"

export default function Splash({ progress = 0, label = "", onSkip = () => {}, done = false }) {
  return (
    <div className={`splash ${done ? "splash-exit" : ""}`}>
      <div className="splash-content">
        <div className="icons-row">
          <div className="icon glow">{"</>"}</div>
          <div className="icon glow">{"👤"}</div>
          <div className="icon glow">{"🛡️"}</div>
        </div>
        <h1 className="splash-title">
          Bienvenido a mi <span className="highlight">Portafolio</span>
        </h1>
        <ProgressBar value={progress} label={label} />
        <button className="btn" onClick={onSkip} style={{ marginTop: 18 }}>Saltar</button>
      </div>
    </div>
  )
}
