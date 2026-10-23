import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Navbar from '../components/portfolio/Navbar';
import Hero from '../components/portfolio/Hero';
import Projects from '../components/portfolio/Projects';
import Stats from '../components/portfolio/Stats';
import About from '../components/portfolio/About';
import Contact from '../components/portfolio/Contact';
import Footer from '../components/portfolio/Footer';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Force scroll to top on mount/refresh
    window.scrollTo(0, 0);
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      infinite: false,
    });

    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    function update(time: number) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 800);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(update);
      clearTimeout(timer);
    };
  }, []);

  return (
    <main ref={scrollContainerRef} className="bg-[#080808] text-white min-h-screen overflow-x-hidden selection:bg-gold/30 selection:text-[#FFE08A]">
      <Navbar />
      <div className="sections-wrapper">
        {/* 1. Executive Hero with Marquee Ticker */}
        <Hero />

        {/* 2. Main Portfolio Showcase Front & Center with Category Tabs */}
        <Projects />

        {/* 3. Business Outcomes & Project Quality Pillars */}
        <Stats />

        {/* 4. Executive Leadership & Company Profile */}
        <About />

        {/* 5. Consultation & Strategy Inquiry */}
        <Contact />

        {/* 6. Agency Footer */}
        <Footer />
      </div>
    </main>
  );
};

export default Index;
