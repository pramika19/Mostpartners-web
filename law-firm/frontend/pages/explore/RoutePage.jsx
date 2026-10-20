import { Link } from 'react-router-dom'
import PageHero from '../../components/shared/PageHero.jsx'
import PageScene from '../../components/shared/PageScene.jsx'
import Achieve from './Achieve.jsx'
import HowWeWork from './HowWeWork.jsx'
import Expertise from '../../components/shared/Expertise.jsx'
import GrowTogether from '../../components/shared/GrowTogether.jsx'
import CityBackdrop from './companies/CityBackdrop.jsx'
import InvestorScene from './investors/InvestorScene.jsx'
import FounderScene from './founders/FounderScene.jsx'
import AchieveTimeline from './founders/AchieveTimeline.jsx'
import { ROUTE_PAGES } from './routes.js'

export default function RoutePage({ route }) {
  const page = ROUTE_PAGES[route]
  return (
    <main key={route} className={`page--${route}`}>
      {route === 'companies' && <CityBackdrop />}
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        sub={page.sub}
        scene={route === 'companies' ? null : route === 'investors' ? <InvestorScene /> : route === 'founders' ? <FounderScene /> : <PageScene variant={route} />}
      >
        <div className="hero-actions">
          <a href="#contact" className="btn btn-solid btn-lg">Book a consultation <span aria-hidden="true">→</span></a>
          <Link to="/about" className="btn btn-outline btn-lg">About us</Link>
        </div>
      </PageHero>
      {route === 'founders'
        ? <AchieveTimeline intro={page.achieveIntro} items={page.achieve} />
        : <Achieve intro={page.achieveIntro} items={page.achieve} />}
      <HowWeWork audience={route} steps={page.how} />
      <Expertise />
      {route === 'founders' ? <GrowTogether image="/images/footer-founders.jpg" variant="sunset" />
        : route === 'companies' ? <GrowTogether image="/images/footer-companies.jpg" variant="mist" />
        : route === 'investors' ? <GrowTogether image="/images/footer-investors.jpg" variant="twilight" />
        : <GrowTogether />}
    </main>
  )
}
