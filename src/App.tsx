import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { Navbar } from './components/Navbar';
import { SectionWrapper } from './components/SectionWrapper';
import { HeroSequence } from './components/HeroSequence';
import { PlatformSection } from './components/PlatformSection';
import { BioMeshSection } from './components/BioMeshSection';
import { ExplainabilitySection } from './components/ExplainabilitySection';
import { ImpactSection } from './components/ImpactSection';
import { Footer } from './components/Footer';
import { useScrollDiscipline } from './hooks/useScrollDiscipline';

function App() {
  const [count, setCount] = useState(0)
export function App() {
  const { activeSection, isScrolled, isRevealed } = useScrollDiscipline();

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
    <div className="relative min-h-screen bg-[#060b08] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* 1. Sticky Glassmorphic Navbar Overlay */}
      <Navbar activeSection={activeSection} isScrolled={isScrolled} />

      {/* Main Content Flow */}
      <main className="relative w-full">
        {/* Section: Home (Hero Sequence) */}
        <section id="home" className="relative w-full min-h-screen">
          <HeroSequence />
        </section>

        {/* Section: Platform */}
        <SectionWrapper
          id="platform"
          isActive={activeSection === 'platform'}
          isRevealed={isRevealed('platform')}
        >
          Count is {count}
        </button>
      </section>
          <PlatformSection />
        </SectionWrapper>

      <div className="ticks"></div>
        {/* Section: Bio-Mesh */}
        <SectionWrapper
          id="bio-mesh"
          isActive={activeSection === 'bio-mesh'}
          isRevealed={isRevealed('bio-mesh')}
        >
          <BioMeshSection />
        </SectionWrapper>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>
        {/* Section: Explainability */}
        <SectionWrapper
          id="explainability"
          isActive={activeSection === 'explainability'}
          isRevealed={isRevealed('explainability')}
        >
          <ExplainabilitySection />
        </SectionWrapper>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
        {/* Section: Impact */}
        <SectionWrapper
          id="impact"
          isActive={activeSection === 'impact'}
          isRevealed={isRevealed('impact')}
        >
          <ImpactSection />
        </SectionWrapper>
      </main>

      {/* Philosophical Closing Footer */}
      <Footer />
    </div>
  );
}

export default App
export default App;
