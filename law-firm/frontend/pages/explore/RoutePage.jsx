import PageHero from '../../components/shared/PageHero.jsx'
import PageScene from '../../components/shared/PageScene.jsx'
import Achieve from './Achieve.jsx'
import HowWeWork from './HowWeWork.jsx'
import Expertise from '../../components/shared/Expertise.jsx'
import GrowTogether from '../../components/shared/GrowTogether.jsx'
import CompaniesRidge from './companies/CompaniesRidge.jsx'
import CompaniesScene from './companies/CompaniesScene.jsx'
import ExpertiseHub from './companies/ExpertiseHub.jsx'
import CompaniesHow from './companies/CompaniesHow.jsx'
import InvestorScene from './investors/InvestorScene.jsx'
import FounderScene from './founders/FounderScene.jsx'
import AchieveTimeline from './founders/AchieveTimeline.jsx'
import ExpertiseVenn from './founders/ExpertiseVenn.jsx'
import InvestorsAchieve from './investors/InvestorsAchieve.jsx'
import ExpertisePeaks from './investors/ExpertisePeaks.jsx'
import { ROUTE_PAGES } from './routes.js'

export default function RoutePage({ route }) {
  const page = ROUTE_PAGES[route]
  return (
    <main key={route} className={`page--${route}`}>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        sub={page.sub}
        edge={route === 'companies' || route === 'investors' ? <CompaniesRidge /> : null}
        scene={route === 'companies' ? <CompaniesScene /> : route === 'investors' ? <InvestorScene /> : route === 'founders' ? <FounderScene /> : <PageScene variant={route} />}
      >
        <div className="hero-actions">
          <a href="#contact" className="btn btn-solid btn-lg">Book a consultation <span aria-hidden="true">→</span></a>
        </div>
      </PageHero>
      {page.intro && (
        <section className={`inv-intro inv-intro--${route}`}>
          <div className="container">
            <h2 data-reveal>{page.intro.title}</h2>
            <p data-reveal style={{ '--d': '0.12s' }}>{page.intro.text}</p>
          </div>
        </section>
      )}
      {route === 'founders' ? <AchieveTimeline intro={page.achieveIntro} items={page.achieve} />
        : route === 'investors' ? <InvestorsAchieve intro={page.achieveIntro} items={page.achieve} />
        : <Achieve intro={page.achieveIntro} items={page.achieve} />}
      {route === 'companies' ? <CompaniesHow steps={page.how} />
        : route === 'investors' ? <CompaniesHow steps={page.how} eyebrow={null} title="How We Work with Investors" image="how-investors-facade.jpg" className="chow--investors" />
        : <HowWeWork audience={route} steps={page.how} />}
      {route === 'founders' ? <ExpertiseVenn /> : route === 'companies' ? <ExpertiseHub /> : route === 'investors' ? <ExpertisePeaks /> : <Expertise />}
      {route === 'founders' ? <GrowTogether image={`${import.meta.env.BASE_URL}images/footer-founders.jpg`} variant="sunset" />
        : route === 'companies' ? <GrowTogether image={`${import.meta.env.BASE_URL}images/footer-companies-grey-hikers.jpg`} variant="mist" />
        : route === 'investors' ? <GrowTogether image={`${import.meta.env.BASE_URL}images/footer-investors.jpg`} variant="twilight" />
        : <GrowTogether />}
    </main>
  )
}
