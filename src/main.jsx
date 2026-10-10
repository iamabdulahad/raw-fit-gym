import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { SiteHeader, SiteCursor, SiteFooter, IdentityPage, FranchisePage, FormatsPage, FoundersPage, FAQPage } from './pages.jsx';
import './style.css';

gsap.registerPlugin(ScrollTrigger);

const rows = [
  { n: '01', title: 'Built for the bold', desc: 'A new breed of training space. Made for people who show up, push limits and keep moving.', to: '/built-for-the-bold' },
  { n: '02', title: 'More than a gym', desc: 'World-class coaching, serious equipment and a community that makes every rep count.', to: '/more-than-a-gym' },
];

function HomePage() {
  const [activeRow, setActiveRow] = useState(-1);
  const formatsRef = useRef(null);
  const scaleRef = useRef(null);
  const foundersRef = useRef(null);

  useLayoutEffect(() => {
    const root = scaleRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from('.scale-index, .scale-copy', {
        opacity: 0, y: 38, duration: .85, stagger: .12, ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 72%', once: true }
      });
      const headline = root.querySelector('.scale-title');
      const headlineChars = root.querySelectorAll('.scale-char');
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(headlineChars, { color: '#171a11' });
      } else {
        gsap.to(headlineChars, {
          color: '#171a11', ease: 'none', stagger: .055,
          scrollTrigger: { trigger: headline, start: 'top 76%', end: 'bottom 32%', scrub: .6 }
        });
      }
      gsap.from('.scale-point', {
        opacity: 0, y: 24, duration: .65, stagger: .12, ease: 'power2.out',
        scrollTrigger: { trigger: '.scale-points', start: 'top 82%', once: true }
      });
      gsap.from('.scale-progress', {
        scaleX: 0, transformOrigin: 'left center', duration: 1.2, ease: 'power2.inOut',
        scrollTrigger: { trigger: '.scale-points', start: 'top 82%', once: true }
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const root = formatsRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from('.formats-heading, .format-card', {
        opacity: 0, y: 45, duration: .9, stagger: .18, ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 75%', once: true }
      });
      root.querySelectorAll('.count-up').forEach((el) => {
        const target = Number(el.dataset.count);
        const decimals = Number(el.dataset.decimals || 0);
        const counter = { value: 0 };
        gsap.to(counter, { value: target, duration: 1.7, delay: Number(el.dataset.delay || 0), ease: 'power2.out',
          scrollTrigger: { trigger: root, start: 'top 70%', once: true },
          onUpdate: () => { el.textContent = counter.value.toFixed(decimals); }
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const root = foundersRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const reveal = gsap.timeline({
        scrollTrigger: { trigger: root, start: 'top 86%', end: 'top 35%', scrub: .8 }
      });
      reveal.fromTo('.founder-visual', { xPercent: -130, opacity: 0 }, { xPercent: 0, opacity: 1, ease: 'none' }, 0);
      reveal.fromTo('.founder-copy', { xPercent: 130, opacity: 0 }, { xPercent: 0, opacity: 1, ease: 'none' }, .08);
      reveal.fromTo('.founder-bio', { y: 26, opacity: 0 }, { y: 0, opacity: 1, stagger: .12, ease: 'none' }, .25);
    }, root);
    return () => ctx.revert();
  }, []);
  return <main>
    <section className="hero" id="top">
      <video className="hero-video" autoPlay muted loop playsInline poster="/homebacgimg.avif">
        <source src="https://videos.pexels.com/video-files/3196299/3196299-hd_1920_1080_25fps.mp4" type="video/mp4" />
      </video>
      <div className="hero-shade" />
      <div className="hero-content">
        <p className="eyebrow"><span className="live-dot" /> THE FUTURE OF FITNESS STARTS HERE</p>
        <h1><span>BUILD</span> THE NEXT<br /><em>RAW GYM</em> FITNESS</h1>
        <div className="hero-bottom">
          <p>Make room for the ones who<br />refuse to stand still.</p>
          <a className="circle-link" href="#identity" aria-label="Discover RAW FIT"><ArrowDown size={19} /></a>
          <div className="hero-index"><span>01</span><i /><span>03</span></div>
        </div>
      </div>
      <div className="vertical-note">TRAIN DIFFERENT. LIVE RAW.</div>
      <div className="hero-label">RAW FIT / EST. 2024</div>
    </section>

    <section className="intro" id="identity">
      <div className="ticker" aria-label="Strength in motion"><div className="ticker-track">{Array.from({length: 4}, (_, i) => <span key={i}>STRENGTH IN MOTION <b>✳</b> BUILT TO BREAK THROUGH <b>✳</b> RAW BY NATURE <b>✳</b></span>)}</div></div>
      <div className="intro-top"><p className="section-kicker">01 / OUR IDENTITY</p><p className="intro-aside">NO SHORTCUTS.<br />NO SOFT EDGES.<br /><span>JUST RAW POTENTIAL.</span></p></div>
      <div className="rows">
        {rows.map((row, i) => <Link to={row.to} className={`feature-row ${activeRow === i ? 'active' : ''}`} key={row.n} onMouseEnter={() => setActiveRow(i)} onMouseLeave={() => setActiveRow(-1)}>
          <span className="row-number">{row.n}</span><h2>{row.title}<span className="row-arrow"><ArrowUpRight size={28} /></span></h2><p>{row.desc}</p>
        </Link>)}
      </div>
    </section>

    <section className="scale-section" ref={scaleRef}>
      <div className="scale-section-inner">
        <div className="scale-topline"><span>FOR FRANCHISE PARTNERS</span><span>RAW FIT / GROWTH MODEL</span></div>
        <div className="scale-main">
          <div className="scale-heading"><p className="scale-index"><span>03</span> / A MODEL MADE TO MOVE</p><h2 className="scale-title" aria-label="Scalable by design."><span className="scale-word" aria-hidden="true">{'SCALABLE'.split('').map((char, i) => <span className="scale-char" key={`scale-${i}`}>{char}</span>)}</span><span className="scale-word scale-word-second" aria-hidden="true">{'BY DESIGN.'.split('').map((char, i) => <span className="scale-char" key={`design-${i}`}>{char}</span>)}</span></h2></div>
          <div className="scale-copy"><span className="scale-orbit" aria-hidden="true"><i /><i /><i /></span><p>Build a gym with a clear point of view. RAW FIT brings together a distinctive brand, purposeful training zones and a member journey that can flex with your market.</p><a href="#formats">EXPLORE THE FORMATS <ArrowDown size={16} /></a></div>
        </div>
        <div className="scale-points">
          <article className="scale-point"><div className="scale-point-top"><span>01</span><ArrowUpRight size={17} /></div><h3>ONE<br />CLEAR IDENTITY</h3><p>A consistent RAW FIT presence, built to stand out in your city.</p></article>
          <article className="scale-point"><div className="scale-point-top"><span>02</span><ArrowUpRight size={17} /></div><h3>SPACE THAT<br />WORKS HARD</h3><p>Training zones planned around the way members move.</p></article>
          <article className="scale-point"><div className="scale-point-top"><span>03</span><ArrowUpRight size={17} /></div><h3>EXPERIENCE<br />THAT CONNECTS</h3><p>A strong member journey, from the first visit to every return.</p></article>
          <article className="scale-point"><div className="scale-point-top"><span>04</span><ArrowUpRight size={17} /></div><h3>FLEXIBLE<br />FORMATS</h3><p>Choose a footprint that fits the opportunity in front of you.</p></article>
          <div className="scale-progress" />
        </div>
        <div className="scale-bottomline"><span>BUILT FOR YOUR MARKET</span><span>04 PRINCIPLES · ONE RAW STANDARD</span></div>
      </div>
    </section>

    <section className="formats-section" id="formats" ref={formatsRef}>
      <div className="formats-heading">
        <div><p className="format-kicker"><span>04</span><i /> FRANCHISE OPPORTUNITY</p><h2>BUILD A GYM THAT<br /><em>BUILDS YOUR FUTURE.</em></h2></div>
        <div className="format-intro"><p>Two ways to bring RAW FIT to your city.</p><a href="#franchise">Talk to our franchise team <ArrowUpRight size={16} /></a></div>
      </div>
      <div className="format-grid">
        <article className="format-card">
          <div className="format-photo"><img src="/photo-1541534741688-6078c6bfb5c5.avif" alt="Strength training inside a modern gym" /><img className="format-logo" src="/logo.png" alt="RAW FIT" /><span className="format-photo-label">01 / HIGH-ENERGY TRAINING</span><span className="format-chip">PRIME</span></div>
          <div className="format-card-body">
            <div className="format-title-line"><div><p className="format-card-kicker">THE COMPACT POWERHOUSE</p><h3>RAW FIT <em>PRIME</em></h3></div><a href="#franchise" className="format-arrow" aria-label="Enquire about Prime"><ArrowUpRight size={20} /></a></div>
            <p className="format-description">A high-performance club designed for dense, fast-moving catchments.</p>
            <div className="format-stats">
              <div><span>INDICATIVE INVESTMENT</span><strong>₹<b className="count-up" data-count="1.8" data-decimals="2">0.00</b><small> Cr</small></strong></div>
              <div><span>IDEAL AREA</span><strong><b className="count-up" data-count="3000">0</b>–<b className="count-up" data-count="4000" data-delay=".12">0</b><small> sq ft</small></strong></div>
              <div><span>FACILITY ZONES</span><strong><b className="count-up" data-count="9" data-delay=".2">0</b></strong></div>
            </div>
            <a className="format-cta" href="#franchise">EXPLORE PRIME <ArrowUpRight size={17} /></a>
          </div>
        </article>
        <article className="format-card featured">
          <div className="format-photo"><img src="/photo-1578763363228-6e8428de69b2.avif" alt="Premium gym floor with training equipment" /><img className="format-logo" src="/logo.png" alt="RAW FIT" /><span className="format-photo-label">02 / FLAGSHIP EXPERIENCE</span><span className="format-chip">LUXURY</span></div>
          <div className="format-card-body">
            <div className="format-title-line"><div><p className="format-card-kicker">THE FLAGSHIP DESTINATION</p><h3>RAW FIT <em>LUXURY</em></h3></div><a href="#franchise" className="format-arrow" aria-label="Enquire about Luxury"><ArrowUpRight size={20} /></a></div>
            <p className="format-description">A bigger stage for premium training, recovery and member experience.</p>
            <div className="format-stats">
              <div><span>INDICATIVE INVESTMENT</span><strong>₹<b className="count-up" data-count="3.2" data-decimals="2" data-delay=".1">0.00</b><small> Cr</small></strong></div>
              <div><span>IDEAL AREA</span><strong><b className="count-up" data-count="6000" data-delay=".1">0</b>–<b className="count-up" data-count="10000" data-delay=".22">0</b><small> sq ft</small></strong></div>
              <div><span>FACILITY ZONES</span><strong><b className="count-up" data-count="14" data-delay=".28">0</b></strong></div>
            </div>
            <a className="format-cta" href="#franchise">EXPLORE LUXURY <ArrowUpRight size={17} /></a>
          </div>
        </article>
      </div>
      <div className="format-reassurance"><span>BUILT FOR YOUR MARKET</span><i /><span>POWERED BY RAW FIT</span><i /><span>READY FOR WHAT'S NEXT</span></div>
      <p className="format-footnote">Investment and area figures are indicative and subject to final commercial agreement.</p>
    </section>

    <section className="statement" id="raw-standard">
      <img src="/photo-1517836357463-d25dfeac3438.avif" alt="Athlete training in a RAW FIT gym" />
      <div className="statement-overlay" />
      <div className="statement-copy"><p className="section-kicker">02 / THE RAW STANDARD</p><h2>FIND YOUR<br /><span>STRONG.</span></h2><p>Every space is built around one thing:<br />helping you become more than you were.</p><a href="#franchise" className="text-link">DISCOVER OUR FORMATS <ArrowUpRight size={16} /></a></div>
      <div className="image-caption">POWER YOUR NEXT CHAPTER <span>↗ 19° 04' N / 72° 52' E</span></div>
    </section>

    <section className="founders-section" id="founders" ref={foundersRef}>
      <div className="founders-inner">
        <div className="founders-topline"><span>05 / MEET THE FOUNDERS</span><span>THE PEOPLE BEHIND RAW FIT</span></div>
        <div className="founders-layout">
          <div className="founder-visual">
            <img src="/SaveClip-App_463362569_18442858009071724_411442800992287323_n.jpg" alt="Rahul, RAW FIT co-founder and IFBB Pro" />
            <div className="founder-photo-shade" />
            <div className="founder-photo-copy"><span>CO-FOUNDER · IFBB PRO</span><h3>RAHUL</h3><p>BUILT THROUGH DISCIPLINE.</p></div>
            <div className="founder-mark">RF<span>®</span></div>
          </div>
          <div className="founder-copy">
            <p className="founder-kicker"><span className="live-dot" /> BUILT BY PEOPLE WHO LIVE THE WORK</p>
            <h2>MEET RAHUL<br /><em>&amp; YASH.</em></h2>
            <p className="founder-intro">RAW FIT was founded by Rahul, an IFBB Pro, and co-founded by Yash Baliyan. Together, they bring competition-level experience and a culture of discipline to every RAW FIT club.</p>
            <div className="founder-bios">
              <article className="founder-bio"><span>01 / CO-FOUNDER</span><h3>RAHUL</h3><p>IFBB Pro · Sheru Classic Pro Card, 2022</p></article>
              <article className="founder-bio"><span>02 / CO-FOUNDER</span><h3>YASH BALIYAN</h3><p>Indian Air Force · Athlete</p></article>
            </div>
            <a href="#franchise" className="founder-cta">BUILD WITH RAW FIT <ArrowUpRight size={17} /></a>
          </div>
        </div>
        <div className="founders-bottomline"><span>COMPETITION MINDSET</span><i /><span>EVERYDAY DISCIPLINE</span><i /><span>ONE SHARED STANDARD</span></div>
      </div>
    </section>

    <section className="bottom" id="franchise"><div><p className="section-kicker">READY TO BUILD?</p><h2>MAKE YOUR<br /><em>MOVE.</em></h2></div><a className="bottom-cta" href="mailto:hello@rawfit.in">FRANCHISE WITH RAW <ArrowUpRight size={17} /></a></section>
  </main>
}

function ScrollToRoutePosition({ lenisRef }) {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const timer = window.setTimeout(() => {
        const target = document.querySelector(hash);
        if (target && lenisRef.current) lenisRef.current.scrollTo(target, { duration: 1.1, offset: -20 });
        else target?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
      return () => window.clearTimeout(timer);
    }
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, hash, lenisRef]);
  return null;
}

function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
      lerp: 0.08,
    });
    lenisRef.current = lenis;

    const updateScrollTrigger = () => ScrollTrigger.update();
    lenis.on('scroll', updateScrollTrigger);

    return () => {
      lenis.off('scroll', updateScrollTrigger);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <BrowserRouter>
    <ScrollToRoutePosition lenisRef={lenisRef} />
    <SiteHeader />
    <SiteCursor />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/identity" element={<IdentityPage />} />
      <Route path="/franchise" element={<FranchisePage />} />
      <Route path="/formats" element={<FormatsPage />} />
      <Route path="/founders" element={<FoundersPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/built-for-the-bold" element={<IdentityPage feature="bold" />} />
      <Route path="/more-than-a-gym" element={<IdentityPage feature="more" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    <SiteFooter />
  </BrowserRouter>;
}

createRoot(document.getElementById('root')).render(<App />);
