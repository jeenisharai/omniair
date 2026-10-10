import { Navbar } from './components/Navbar';
import { SectionWrapper } from './components/SectionWrapper';
import { HeroSequence } from './components/HeroSequence';
import { PlatformSection } from './components/PlatformSection';
import { LiveIntelligenceDashboard } from './components/LiveIntelligenceDashboard';
import { BioMeshSection } from './components/BioMeshSection';
import { ExplainabilitySection } from './components/ExplainabilitySection';
import { PlantAndCleanSection } from './components/PlantAndCleanSection';
import { ImpactSection } from './components/ImpactSection';
import { Footer } from './components/Footer';
import { useScrollDiscipline } from './hooks/useScrollDiscipline';

export function App() {
  const { activeSection, isScrolled, isRevealed } = useScrollDiscipline();

  return (
    <div className="relative min-h-screen bg-[#050a0c] text-slate-100 selection:bg-[#1fd4a4]/30 selection:text-white">
      {/* 1. Sticky Glassmorphic Navbar Overlay */}
      <Navbar activeSection={activeSection} isScrolled={isScrolled} />

      {/* Main Content Flow */}
      <main className="relative w-full">
        {/* Section 1 & 2: Home & The Descent (The Bark -> 3D Globe -> Local Scene) */}
        <section id="home" className="relative w-full min-h-screen">
          <HeroSequence />
        </section>

        {/* Section: Platform */}
        <SectionWrapper
          id="platform"
          isActive={activeSection === 'platform'}
          isRevealed={isRevealed('platform')}
        >
          <PlatformSection />
        </SectionWrapper>

        {/* Section 3: Live Intelligence & Command Dashboard */}
        <SectionWrapper
          id="live-intelligence"
          isActive={activeSection === 'live-intelligence'}
          isRevealed={isRevealed('live-intelligence')}
        >
          <LiveIntelligenceDashboard />
        </SectionWrapper>

        {/* Section 4: Bio-Mesh Map & Hardware Probe */}
        <SectionWrapper
          id="bio-mesh"
          isActive={activeSection === 'bio-mesh'}
          isRevealed={isRevealed('bio-mesh')}
        >
          <BioMeshSection />
        </SectionWrapper>

        {/* Section 5: Explainability (Tsetlin Machine) */}
        <SectionWrapper
          id="explainability"
          isActive={activeSection === 'explainability'}
          isRevealed={isRevealed('explainability')}
        >
          <ExplainabilitySection />
        </SectionWrapper>

        {/* Section 6: Impact -> Plant & Clean Action Layer */}
        <SectionWrapper
          id="impact"
          isActive={activeSection === 'impact'}
          isRevealed={isRevealed('impact')}
        >
          <PlantAndCleanSection />
        </SectionWrapper>

        {/* Section 7: Personal Exposure Diagnostic & Silent Teaching Layers */}
        <SectionWrapper
          id="exposure"
          isActive={activeSection === 'exposure'}
          isRevealed={isRevealed('exposure')}
        >
          <ImpactSection />
        </SectionWrapper>
      </main>

      {/* Philosophical Closing Footer */}
      <Footer />
    </div>
  );
}

export default App;