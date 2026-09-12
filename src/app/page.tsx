import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, PlayCircle, FileText, Box, Settings, Database, MessageCircle, Users, LayoutGrid, CheckSquare } from 'lucide-react';
import { Button } from '@/components/studio/Shared';
import { HeroFilm } from '@/components/studio/HeroFilm';
import { ProblemExplorer, CapacityCalculator } from '@/components/studio/Interactive';
import { pageMetadata, SITE } from '@/lib/seo';
import '@/components/studio/hero-motion.css';
import './reference-home.css';

export const metadata = pageMetadata({
  title: SITE.defaultTitle,
  description: 'BYBO builds systems that handle recurring work, connect your tools and bring the right decisions back to people. AI systems and websites built around your business.',
  path: '/',
});

export default function Home() {
  return (
    <div className="reference-home">
      <section className="reference-hero">
        <Image className="reference-hero-scene" src="/images/reference-hero.webp" alt="A pile of paperwork becoming a clear violet workflow, with an amber human review step" fill sizes="100vw" priority />
        <HeroFilm src="/video/home-hero.mp4" poster="/images/reference-hero.webp" />
        <span className="hm-sheen" aria-hidden="true" /><span className="hm-charge" aria-hidden="true" /><span className="hm-gate" aria-hidden="true" />
        <div className="container reference-hero-content">
          <p className="eyebrow">AI systems for your business</p>
          <h1>Your team has<br />better things to do.</h1>
          <p className="lede">We build systems that handle recurring work, connect your tools and bring the right decisions back to your people.</p>
          <div className="actions">
            <Button href="#starting-point">Find your starting point</Button>
            <Link className="button button-secondary" href="#workflow"><PlayCircle size={22} />See a workflow</Link>
          </div>
        </div>
      </section>

      <section className="reference-problems light" id="starting-point">
        <div className="container">
          <h2>Where does the work get stuck?</h2>
          <ProblemExplorer reference />
        </div>
      </section>

      <section className="reference-comparison" id="workflow">
        <div className="container">
          <h2>Give recurring work a clear path.</h2>
          <div className="reference-comparison-grid">
            <article className="comparison-photo">
              <Image src="/images/reference-before.webp" alt="A crowded desk with paperwork, a repeated to-do list and a mug" fill sizes="(max-width: 760px) 100vw, 45vw" />
              <div className="comparison-copy"><p>Before</p><h3>Inbox. Spreadsheet.<br />Reminder. Repeat.</h3></div>
            </article>
            <div className="comparison-arrow" aria-hidden="true"><ArrowRight size={25} /></div>
            <article className="comparison-photo">
              <Image src="/images/reference-after.webp" alt="A tidy desk with a clear workflow and room to focus" fill sizes="(max-width: 760px) 100vw, 45vw" />
              <div className="comparison-copy"><p>After</p><h3>One workflow.<br />Clear ownership.<br />A record of what happened.</h3></div>
              <ul className="photo-checklist">
                {['Enquiry captured', 'Response drafted', 'Follow-up scheduled', 'Recorded in your system'].map(item => <li key={item}><CheckSquare size={20} />{item}</li>)}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="reference-calculator light" id="team-capacity">
        <div className="container"><h2>What could your team get back?</h2><CapacityCalculator /></div>
      </section>

      <section className="reference-integrations light">
        <div className="container">
          <h2>Built around the tools you already use.</h2>
          <p className="lede">We agree what the system may read, change and escalate.</p>
          <div className="integration-grid">
            {[{ Icon: Database, title: 'Accounts & ERP' }, { Icon: MessageCircle, title: 'Communication' }, { Icon: Users, title: 'Sales & service' }, { Icon: LayoutGrid, title: 'Operations & data' }].map(({ Icon, title }) => <div key={title}><Icon size={38} strokeWidth={1.6} /><h3>{title}</h3></div>)}
          </div>
        </div>
      </section>

      <section className="reference-method">
        <div className="container">
          <div className="reference-method-heading"><h2>Understand the work. Build the system. Keep it working.</h2><Link className="text-link" href="/how-we-work">How we work <ArrowRight size={16} /></Link></div>
          <div className="reference-method-grid">
            {[{ Icon: FileText, title: 'Blueprint', image: 'blueprint', href: '/blueprint', alt: 'A notebook with the steps Map, Prioritise and Plan' }, { Icon: Box, title: 'Build', image: 'build', href: '/systems', alt: 'Connected violet glass blocks representing tools, logic and data' }, { Icon: Settings, title: 'Operate', image: 'operate', href: '/how-we-work', alt: 'An operating notebook with Running, Monitored and Improving checked off' }].map(({ Icon, title, image, href, alt }) => <Link href={href} className="reference-method-card" key={title}><h3><Icon size={30} strokeWidth={1.5} />{title}</h3><Image src={`/images/reference-${image}.webp`} alt={alt} width={1000} height={700} sizes="(max-width: 600px) 100vw, 30vw" /></Link>)}
          </div>
        </div>
      </section>

      <section className="reference-closing">
        <Image src="/images/reference-closing.webp" alt="A violet glass sphere on a stack of books" fill sizes="100vw" />
        <div className="container"><div><h2>Bring us one recurring problem.</h2><p>We will help you decide whether it needs a system.</p></div><Button href="/apply">Talk to BYBO</Button></div>
      </section>
    </div>
  );
}
