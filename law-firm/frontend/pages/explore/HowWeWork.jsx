import Architecture from '../../components/shared/Architecture.jsx'
import ArchBackdrop from '../../components/shared/ArchBackdrop.jsx'
import Timeline from '../../components/shared/Timeline.jsx'
import BuildingConstruct from './companies/BuildingConstruct.jsx'
import DealFlow from './investors/DealFlow.jsx'
import OrangeArchitecture from './founders/OrangeArchitecture.jsx'

export default function HowWeWork({ audience, steps }) {
  return (
    <section className="section how">
      {audience === 'founders' ? <OrangeArchitecture variant="frame" flow /> : <ArchBackdrop variant="arches" />}
      <div className="container who-grid">
        <div className="who-intro">
          <p className="eyebrow" data-reveal>— Our process —</p>
          <h2 className="h-display" data-reveal style={{ '--d': '0.1s' }}>
            How we work with <span className="grad-text">{audience}</span>
          </h2>
          <p className="lead" data-reveal style={{ '--d': '0.2s' }}>
            A clear, partner-led process, so you always know what happens next and why.
          </p>
          {audience === 'companies' ? <BuildingConstruct /> : audience === 'investors' ? <DealFlow /> : audience === 'founders' ? null : <Architecture variant="courthouse" />}
        </div>
        <Timeline items={steps} />
      </div>
    </section>
  )
}
