// Photographic hero backdrop for the inner pages: a twilight mountain photo with
// faint stars and a slow drifting haze along the valley.

const PHOTOS = {
  investors: { src: '/images/hero-investors-blue.jpg', pos: '0% 60%' },
  about: { src: '/images/hero-about.jpg', pos: '65% 60%' },
}

const STARS = [
  [12, 8], [22, 16], [31, 6], [44, 12], [53, 5], [61, 18], [69, 9], [77, 14], [86, 7], [93, 19], [38, 22], [81, 25],
]

export default function PageScene({ variant = 'founders' }) {
  const photo = PHOTOS[variant] || PHOTOS.founders
  return (
    <div className="page-scene" aria-hidden="true">
      <img className="page-photo" src={photo.src} alt="" style={{ objectPosition: photo.pos }} />
      <div className="page-haze" />
      {STARS.map(([x, y], i) => (
        <span key={i} className="page-star" style={{ left: `${x}%`, top: `${y}%`, '--k': i }} />
      ))}
    </div>
  )
}
