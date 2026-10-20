import Hero from './Hero.jsx'
import WhoWeAre from './WhoWeAre.jsx'
import ThreeRoutes from './ThreeRoutes.jsx'
import Expertise from '../../components/shared/Expertise.jsx'
import TeamsMarquee from './TeamsMarquee.jsx'
import BridgeLine from './BridgeLine.jsx'
import GrowTogether from '../../components/shared/GrowTogether.jsx'

export default function Home() {
  return (
    <main className="page--home">
      <Hero />
      <WhoWeAre />
      <ThreeRoutes />
      <Expertise
        sub="Combining legal expertise with business judgment to shape key decisions across startup growth, funding, operations and international expansion."
        intro="Through our expertise, we seamlessly integrate legal considerations into business strategy and operations, protect what is being built, execute transactions effectively and help navigate the many aspects of running a business."
        more={{ to: '/about', label: 'Explore our expertise' }}
      />
      <BridgeLine />
      <TeamsMarquee />
      <GrowTogether
        title={<>Unlock business potential.<br /><span className="grad-text">Built for growth.</span></>}
        cta="Let’s plan and structure smarter"
      />
    </main>
  )
}
