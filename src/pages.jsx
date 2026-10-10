import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight, Dumbbell, MapPin, Phone, Mail, Menu, X } from 'lucide-react';
import { gsap } from 'gsap';

const destinations = [
  { label: 'Identity', to: '/identity' },
  { label: 'Franchise', to: '/franchise' },
  { label: 'Formats', to: '/formats' },
  { label: 'Founders', to: '/founders' },
  { label: 'FAQ', to: '/faq' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="header site-header">
    <Link className="brand" to="/" aria-label="RAW FIT home" onClick={() => setOpen(false)}><img src="/logo.png" alt="RAW FIT" /></Link>
    <nav className={open ? 'nav open' : 'nav'} aria-label="Main navigation">
      {destinations.map(({label,to}) => <Link key={to} to={to} onClick={() => setOpen(false)}>{label}</Link>)}
    </nav>
    <Link className="enquiry" to="/franchise#enquiry" onClick={() => setOpen(false)}>Franchise Enquiry <ArrowUpRight size={15} /></Link>
    <button className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
  </header>;
}

export function SiteCursor() {
  const cursorRef = useRef(null);
  useEffect(() => {
    const cursor = cursorRef.current;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!cursor || !finePointer || reduceMotion) return;
    gsap.set(cursor, { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    const moveX = gsap.quickTo(cursor, 'x', { duration: .16, ease: 'power3.out' });
    const moveY = gsap.quickTo(cursor, 'y', { duration: .16, ease: 'power3.out' });
    const icon = cursor.querySelector('.cursor-gym');
    let lastX = 0;
    const onMove = (event) => {
      if (event.pointerType === 'touch') return;
      moveX(event.clientX);
      moveY(event.clientY);
      const hero = document.querySelector('.hero');
      const bounds = hero?.getBoundingClientRect();
      const overHero = bounds && event.clientY >= bounds.top && event.clientY <= bounds.bottom && event.clientX >= bounds.left && event.clientX <= bounds.right;
      cursor.dataset.mode = overHero ? 'hero' : 'minimal';
      cursor.dataset.contrast = event.target.closest('.scale-section, .bottom, .format-cta, .footer-primary, .enquiry, .route-button') ? 'neon' : 'dark';
      cursor.dataset.hover = event.target.closest('a, button, [role="button"]') ? 'true' : 'false';
      cursor.classList.add('is-visible');
      if (overHero && icon) {
        const direction = Math.max(-13, Math.min(13, (event.clientX - lastX) * .35));
        gsap.to(icon, { rotation: direction, duration: .2, ease: 'power2.out', overwrite: true });
      }
      lastX = event.clientX;
    };
    const onDown = () => cursor.classList.add('is-pressed');
    const onUp = () => cursor.classList.remove('is-pressed');
    const onLeave = () => cursor.classList.remove('is-visible', 'is-pressed');
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointerleave', onLeave);
      gsap.killTweensOf([cursor, icon]);
    };
  }, []);
  return <div className="site-cursor" data-mode="minimal" data-hover="false" aria-hidden="true" ref={cursorRef}><span className="cursor-core" /><span className="cursor-halo" /><span className="cursor-gym"><Dumbbell size={21} strokeWidth={1.8} /></span><span className="cursor-word">TRAIN</span></div>;
}

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="footer-cta-row">
      <div><p className="footer-kicker">YOUR NEXT MOVE STARTS HERE</p><h2>READY TO BUILD<br />YOUR <em>RAW FIT?</em></h2></div>
      <div className="footer-cta-actions"><Link className="footer-primary" to="/franchise#enquiry">ENQUIRE NOW <ArrowUpRight size={17} /></Link><a className="footer-secondary" href="https://wa.me/916000609292" target="_blank" rel="noreferrer"><Phone size={16} /> WHATSAPP</a></div>
    </div>
    <div className="footer-main-grid">
      <div className="footer-brand-block"><Link to="/" className="footer-wordmark">RAW <em>FIT</em> GYM</Link><p>Premium fitness.<br />Premium experience.<br />Built to move you forward.</p></div>
      <div className="footer-column"><h3>EXPLORE</h3>{destinations.map(({label,to}) => <Link key={to} to={to}>{label}</Link>)}</div>
      <div className="footer-column"><h3>FRANCHISE</h3><Link to="/franchise">Why RAW FIT</Link><Link to="/formats">Our formats</Link><Link to="/franchise#enquiry">Start an enquiry</Link><Link to="/faq">Common questions</Link></div>
      <div className="footer-column footer-contact"><h3>GET IN TOUCH</h3><a href="tel:+916000609292"><Phone size={15} /> +91 60006 09292</a><a href="mailto:rawfitgym26@gmail.com"><Mail size={15} /> rawfitgym26@gmail.com</a><span><MapPin size={15} /> Sector-122, Noida</span></div>
    </div>
    <div className="footer-legal"><span>© 2026 RAW FIT GYM. ALL RIGHTS RESERVED.</span><span>Franchise information is indicative and subject to final commercial agreement.</span><a href="#top">BACK TO TOP ↑</a></div>
  </footer>;
}

function PageHero({ kicker, title, accent, copy, image }) {
  return <section className={`route-hero ${image ? 'route-hero-image' : ''}`} style={image ? { '--route-image': `url(${image})` } : undefined}>
    <div className="route-hero-inner"><p className="route-kicker"><span />{kicker}</p><h1>{title}<br /><em>{accent}</em></h1><p className="route-lead">{copy}</p></div>
    <span className="route-side-note">RAW FIT / BUILT DIFFERENT</span>
  </section>;
}

export function IdentityPage() {
  const pillars = [
    ['01', 'TRAIN WITH INTENT', 'A gym culture built on commitment, progress and showing up for the work.'],
    ['02', 'FEEL THE DIFFERENCE', 'Thoughtful spaces and serious equipment make every training day count.'],
    ['03', 'GROW TOGETHER', 'A community that turns individual effort into shared momentum.'],
  ];
  return <main className="route-page">
    <PageHero kicker="01 / THE RAW FIT IDENTITY" title="MADE FOR" accent="WHAT’S NEXT." copy="RAW FIT is a new kind of fitness experience: direct, focused and built around the people who keep moving." image="/photo-1517836357463-d25dfeac3438.avif" />
    <section className="route-content identity-content"><div className="route-section-heading"><p className="route-kicker"><span />OUR POINT OF VIEW</p><h2>NO SHORTCUTS.<br /><em>JUST PROGRESS.</em></h2></div><div className="pillar-grid">{pillars.map(([n,title,copy]) => <article className="pillar-card" key={n}><span>{n}</span><Dumbbell size={19} /><h3>{title}</h3><p>{copy}</p></article>)}</div><Link to="/formats" className="route-button">FIND YOUR FORMAT <ArrowRight size={17} /></Link></section>
  </main>;
}

export function FranchisePage() {
  return <main className="route-page">
    <PageHero kicker="02 / FRANCHISE WITH RAW FIT" title="BUILD A" accent="STRONGER BUSINESS." copy="Bring a distinctive fitness brand to your city. Explore the formats, get the key information and start a conversation with our team." image="/photo-1605296867304-46d5465a13f1.avif" />
    <section className="route-content franchise-content"><div className="franchise-intro"><div><p className="route-kicker"><span />A CLEAR PATH FORWARD</p><h2>YOUR CITY.<br /><em>OUR NEXT CHAPTER.</em></h2></div><p>Every strong partnership starts with a conversation. Tell us where you want to build, and we’ll help you explore the RAW FIT format that fits your opportunity.</p></div>
      <div className="franchise-steps"><article><span>01</span><h3>EXPLORE</h3><p>Compare the Prime and Luxury formats and decide what fits your market.</p></article><article><span>02</span><h3>CONNECT</h3><p>Share your interest with our franchise team and discuss your plans.</p></article><article><span>03</span><h3>PLAN</h3><p>Take the next steps together, subject to location and commercial review.</p></article></div>
      <div className="franchise-contact" id="enquiry"><div><p className="route-kicker"><span />START A CONVERSATION</p><h2>LET’S TALK<br /><em>RAW FIT.</em></h2></div><div className="franchise-contact-actions"><a href="mailto:rawfitgym26@gmail.com?subject=RAW%20FIT%20Franchise%20Enquiry" className="route-button">EMAIL THE FRANCHISE TEAM <ArrowUpRight size={17} /></a><a href="tel:+916000609292" className="contact-inline"><Phone size={16} /> +91 60006 09292</a></div></div>
    </section>
  </main>;
}

export function FormatsPage() {
  const formats = [
    { n: '01', name: 'PRIME', tag: 'THE COMPACT POWERHOUSE', image: '/photo-1541534741688-6078c6bfb5c5.avif', intro: 'A high-performance club designed for dense, fast-moving catchments.', investment: '₹1.80 Cr', area: '3,000–4,000 sq ft', zones: '09 zones' },
    { n: '02', name: 'LUXURY', tag: 'THE FLAGSHIP DESTINATION', image: '/photo-1578763363228-6e8428de69b2.avif', intro: 'A bigger stage for premium training, recovery and member experience.', investment: '₹3.20 Cr', area: '6,000–10,000 sq ft', zones: '14 zones' },
  ];
  return <main className="route-page">
    <PageHero kicker="03 / FRANCHISE FORMATS" title="FIND YOUR" accent="RAW FIT FORMAT." copy="Two premium formats. One shared training standard. Choose a footprint that fits the opportunity in front of you." />
    <section className="route-content formats-page-content"><div className="route-section-heading"><p className="route-kicker"><span />TWO WAYS TO BUILD</p><h2>CHOOSE YOUR<br /><em>FORMAT.</em></h2></div><div className="route-format-grid">{formats.map((item) => <article className="route-format-card" key={item.name}><div className="route-format-photo"><img src={item.image} alt={`${item.name} gym format`} /><span>{item.n} / {item.tag}</span></div><div className="route-format-body"><p className="route-kicker"><span />RAW FIT {item.name}</p><h3>{item.name}</h3><p>{item.intro}</p><div className="route-format-metrics"><div><small>INDICATIVE INVESTMENT</small><strong>{item.investment}</strong></div><div><small>IDEAL AREA</small><strong>{item.area}</strong></div><div><small>FACILITY ZONES</small><strong>{item.zones}</strong></div></div><Link to="/franchise#enquiry" className="route-button">ENQUIRE ABOUT {item.name} <ArrowUpRight size={17} /></Link></div></article>)}</div><p className="route-disclaimer">Figures are indicative and subject to final commercial agreement.</p></section>
  </main>;
}

export function FoundersPage() {
  return <main className="route-page">
    <PageHero kicker="04 / THE PEOPLE BEHIND RAW FIT" title="BUILT BY" accent="THE DRIVEN." copy="Meet the founders bringing competition-level experience and a culture of discipline to every RAW FIT club." />
    <section className="route-content founders-page-content"><div className="founders-page-photo"><img src="/SaveClip-App_463362569_18442858009071724_411442800992287323_n.jpg" alt="Rahul, RAW FIT co-founder and IFBB Pro" /><span>RAHUL / CO-FOUNDER</span></div><div className="founders-page-copy"><p className="route-kicker"><span />MEET RAHUL &amp; YASH</p><h2>COMPETITION<br /><em>MEETS DISCIPLINE.</em></h2><p>RAW FIT was founded by Rahul, an IFBB Pro, and co-founded by Yash Baliyan. Together, they bring competition-level experience and a culture of discipline to every RAW FIT club.</p><div className="founders-page-people"><div><small>CO-FOUNDER</small><h3>RAHUL</h3><p>IFBB Pro · Sheru Classic Pro Card, 2022</p></div><div><small>CO-FOUNDER</small><h3>YASH BALIYAN</h3><p>Indian Air Force · Athlete</p></div></div><Link to="/franchise#enquiry" className="route-button">BUILD WITH RAW FIT <ArrowUpRight size={17} /></Link></div></section>
  </main>;
}

export function FAQPage() {
  const questions = [
    ['What RAW FIT franchise formats are available?', 'RAW FIT currently presents two formats: Prime and Luxury. Explore the Formats page for indicative investment, area and facility information.'],
    ['How much investment is required?', 'Indicative investment is ₹1.80 Cr for Prime and ₹3.20 Cr for Luxury. Figures are subject to final commercial agreement.'],
    ['How do I enquire about a franchise?', 'Email rawfitgym26@gmail.com or call +91 60006 09292 to start a conversation with the RAW FIT franchise team.'],
    ['Where is RAW FIT based?', 'RAW FIT is based in Sector-122, Noida. Franchise opportunities can be discussed for other markets as well.'],
  ];
  return <main className="route-page">
    <PageHero kicker="05 / FREQUENTLY ASKED QUESTIONS" title="GOOD QUESTIONS." accent="STRAIGHT ANSWERS." copy="A few helpful details to get your RAW FIT franchise conversation started." />
    <section className="route-content faq-content"><div className="route-section-heading"><p className="route-kicker"><span />FRANCHISE FAQ</p><h2>WHAT YOU<br /><em>NEED TO KNOW.</em></h2></div><div className="faq-list">{questions.map(([question,answer], index) => <details key={question}><summary><span>{String(index + 1).padStart(2, '0')}</span>{question}<ArrowDown size={18} /></summary><p>{answer}</p></details>)}</div><div className="faq-contact"><p>Still have a question?</p><Link to="/franchise#enquiry">Talk to our franchise team <ArrowUpRight size={16} /></Link></div></section>
  </main>;
}
