import { useState, type FC } from 'react';
import { ThreeHeroScene, type SceneMode } from './ThreeHeroScene';
import {
  Globe,
  Layers,
  ChevronDown,
  ArrowLeft,
  Sparkles,
  MapPin
} from 'lucide-react';

interface HeroSequenceProps {
  onDiveToDashboard?: () => void;
}

export const HeroSequence: FC<HeroSequenceProps> = ({ onDiveToDashboard }) => {
  const [mode, setMode] = useState<SceneMode>('bark');
  const [selectedCity, setSelectedCity] = useState<string>('Tokyo Bay Corridor');

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setMode('local');
    if (onDiveToDashboard) {
      onDiveToDashboard();
    }
  };

  const handleExploreClick = () => {
    setMode('globe');
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#050a0c]">
      {/* Background 3D WebGL Scene */}
      <ThreeHeroScene
        mode={mode}
        timeOffset={0}
        onNodeClick={handleCitySelect}
      />

      {/* Atmospheric Mist & Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050a0c]/80 via-transparent to-[#050a0c]/90 pointer-events-none z-[2]" />

      {/* Top Controls / Mode Switcher Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 md:pt-28 flex items-center justify-between">
        {mode === 'local' ? (
          <button
            onClick={() => setMode('globe')}
            className="px-3.5 py-1.5 rounded-full bg-[#071914]/80 border border-[#1fd4a4]/30 text-[#1fd4a4] text-xs font-mono tracking-wider flex items-center gap-2 hover:bg-[#0b2720] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← BACK TO SURFACE</span>
          </button>
        ) : (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#071914]/70 border border-[#1fd4a4]/25 text-[#1fd4a4] text-[11px] font-mono tracking-widest uppercase backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1fd4a4] animate-pulse" />
            Lichen Bio-Transducer Network
          </div>
        )}

        {/* Cinematic Step Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#071410]/80 border border-[#1fd4a4]/20 backdrop-blur-lg">
          <button
            onClick={() => setMode('bark')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono transition-all ${
              mode === 'bark'
                ? 'bg-[#0a261e] text-[#1fd4a4] border border-[#1fd4a4]/40 shadow-sm shadow-[#1fd4a4]/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            1. The Bark
          </button>
          <button
            onClick={() => setMode('globe')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono transition-all flex items-center gap-1.5 ${
              mode === 'globe'
                ? 'bg-[#0a261e] text-[#1fd4a4] border border-[#1fd4a4]/40 shadow-sm shadow-[#1fd4a4]/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-[#1fd4a4]" />
            2. Planetary Earth
          </button>
          <button
            onClick={() => setMode('local')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono transition-all flex items-center gap-1.5 ${
              mode === 'local'
                ? 'bg-[#0a261e] text-[#1fd4a4] border border-[#1fd4a4]/40 shadow-sm shadow-[#1fd4a4]/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#8be9ff]" />
            3. Local Dive (3D)
          </button>
        </div>
      </div>

      {/* Main Centered Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center py-10 md:py-16 my-auto">
        {mode === 'bark' && (
          <div className="space-y-6 animate-in fade-in duration-700">
            {/* Eyebrow */}
            <div className="text-xs sm:text-sm font-mono tracking-[0.25em] text-[#1fd4a4] uppercase flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#1fd4a4]" />
              PLANETARY INTELLIGENCE NETWORK
            </div>

            {/* Huge Heading */}
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight text-white leading-none">
              OMNI <span className="text-[#1fd4a4] text-teal-glow">AIR</span>
            </h1>

            {/* Tagline */}
            <div className="text-lg sm:text-2xl md:text-3xl font-serif italic text-slate-200 max-w-3xl mx-auto font-light">
              “Where Trees Whisper What Cities Cannot Hear”
            </div>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed font-sans">
              Living organisms decode the invisible: translating biological signals from lichens into
              hyper-local, explainable air quality intelligence using transparent Boolean logic at the edge.
            </p>

            {/* Three Monospace Logic-Clause Pills */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 max-w-4xl mx-auto">
              <div className="glass-pill px-4 py-2.5 text-xs font-mono text-slate-200 border border-[#1fd4a4]/30 shadow-md shadow-[#1fd4a4]/10 hover:border-[#1fd4a4]/60 transition-colors">
                <span className="text-[#1fd4a4] font-semibold">IF</span> bio-impedance rise <span className="text-[#8be9ff]">AND</span> low wind <span className="text-[#1fd4a4]">→ PM2.5 dominant</span>
              </div>
              <div className="glass-pill px-4 py-2.5 text-xs font-mono text-slate-200 border border-[#1fd4a4]/30 shadow-md shadow-[#1fd4a4]/10 hover:border-[#1fd4a4]/60 transition-colors">
                <span className="text-[#8be9ff] font-semibold">AND</span> humidity spike <span className="text-[#1fd4a4]">→ trapped VOCs</span>
              </div>
              <div className="glass-pill px-4 py-2.5 text-xs font-mono text-slate-200 border border-[#1fd4a4]/30 shadow-md shadow-[#1fd4a4]/10 hover:border-[#1fd4a4]/60 transition-colors">
                <span className="text-[#1fd4a4] font-semibold">IF</span> piezo vibration + stagnant air <span className="text-[#f5a524]">→ particulate accumulation</span>
              </div>
            </div>

            {/* Spacing Fix: EXPLORE button sits clearly BELOW the pills with generous clearance */}
            <div className="pt-8 sm:pt-12">
              <button
                onClick={handleExploreClick}
                className="group inline-flex flex-col items-center gap-2 text-xs font-mono text-[#1fd4a4] tracking-widest uppercase hover:text-white transition-colors cursor-pointer"
              >
                <span>EXPLORE</span>
                <div className="w-8 h-8 rounded-full bg-[#071914] border border-[#1fd4a4]/40 flex items-center justify-center group-hover:border-[#1fd4a4] group-hover:translate-y-1 transition-all">
                  <ChevronDown className="w-4 h-4 text-[#1fd4a4] animate-bounce" />
                </div>
              </button>
            </div>
          </div>
        )}

        {mode === 'globe' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-700">
            <div className="text-xs font-mono tracking-[0.2em] text-[#1fd4a4] uppercase">
              SECTION 2 • THE DESCENT
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Planetary Epiphytic Mesh
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Slowly rotating 3D Earth composed of moss-textured continents. Lichen-like organic glowing
              nodes mark real city locations worldwide, pulsing calmly with living biosignals.
            </p>

            {/* Select a place prompt */}
            <div className="p-4 max-w-md mx-auto glass-panel border border-[#1fd4a4]/30">
              <div className="text-xs font-mono text-[#1fd4a4] uppercase tracking-wider mb-2 flex items-center justify-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Select a place to listen
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                {['Tokyo', 'London', 'Delhi', 'New York', 'São Paulo', 'Nairobi'].map((city) => (
                  <button
                    key={city}
                    onClick={() => handleCitySelect(`${city} Corridor`)}
                    className="p-2 rounded-lg bg-black/40 border border-white/10 hover:border-[#1fd4a4] text-slate-200 hover:text-[#1fd4a4] transition-all cursor-pointer"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setMode('local')}
                className="px-6 py-2.5 rounded-xl bg-[#071914] border border-[#1fd4a4]/50 text-[#1fd4a4] text-xs font-mono font-semibold tracking-wider hover:bg-[#0c2a22] transition-colors shadow-lg shadow-[#1fd4a4]/15 cursor-pointer"
              >
                Dive Into Hyper-Local Scene (Tokyo Bay) →
              </button>
            </div>
          </div>
        )}

        {mode === 'local' && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <div className="text-xs font-mono tracking-[0.2em] text-[#8be9ff] uppercase">
              LOCALIZED CANOPY SCAN • {selectedCity.toUpperCase()}
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Dense Urban Transit Corridor Cross-Section
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Simulating dynamic volumetric smog layers, wind vectors, and rising colored fog columns
              (crimson-orange for high bio-stress, blue-green for clean).
            </p>

            <div className="pt-2">
              <a
                href="#live-intelligence"
                className="px-5 py-2.5 rounded-xl bg-[#071914] border border-[#1fd4a4] text-[#1fd4a4] text-xs font-mono font-medium tracking-wide hover:bg-[#0c2a22] transition-colors shadow-lg shadow-[#1fd4a4]/20 cursor-pointer inline-flex items-center gap-2"
              >
                <span>Enter Mission Control Dashboard</span>
                <ChevronDown className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Subtle Status Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-6 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <div>Continuous Epiphytic Sweep • 47 μW Node Telemetry</div>
        <div className="hidden sm:flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1fd4a4] inline-block" />
          <span>Nominal Mesh Resiliency</span>
        </div>
      </div>
    </div>
  );
};
