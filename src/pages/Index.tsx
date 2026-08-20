import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import CustomCursor from '../components/portfolio/CustomCursor';
import Navbar from '../components/portfolio/Navbar';
import Hero from '../components/portfolio/Hero';
import About from '../components/portfolio/About';
import Projects from '../components/portfolio/Projects';
import Skills from '../components/portfolio/Skills';
import Experience from '../components/portfolio/Experience';
import Stats from '../components/portfolio/Stats';
import Contact from '../components/portfolio/Contact';
import Footer from '../components/portfolio/Footer';

gsap.registerPlugin(ScrollTrigger);

const Content = () => (
  <>
    <Hero />
    <About />
    <Projects />
    <Skills />
    <Experience />
    <Stats />
    <Contact />
    <Footer />
  </>
);

const Index = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Force scroll to top on mount/refresh
    window.scrollTo(0, 0);
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      infinite: false, 
    });

    lenis.on('scroll', (e: any) => {
      ScrollTrigger.update();
      
      const contentHeight = contentRef.current?.offsetHeight || 0;
      if (contentHeight > 0 && e.scroll >= contentHeight) {
        lenis.scrollTo(e.scroll - contentHeight, { immediate: true });
      }
    });

    function update(time: number) {
      lenis.raf(time * 1000);
    }
    
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(update);
      clearTimeout(timer);
    };
  }, []);

  return (
    <main ref={scrollContainerRef} className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <div className="sections-wrapper">
        <div ref={contentRef}>
          <Content />
        </div>
        <div className="infinite-clone" aria-hidden="true">
          <Content />
        </div>
      </div>
    </main>
  );
};

export default Index;
