import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Most Partners home">
      <span className="logo-word">MOST</span>
      <span className="logo-sub">PARTNERS</span>
    </Link>
  )
}
