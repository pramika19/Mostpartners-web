// Slow-drifting orange and gold glows behind the whole site.
export default function Ambient() {
  return (
    <div className="ambient" aria-hidden="true">
      <span className="glow glow-1" />
      <span className="glow glow-2" />
      <span className="glow glow-3" />
      <span className="glow glow-4" />
    </div>
  )
}
