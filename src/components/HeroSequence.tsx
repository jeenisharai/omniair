import { useState, type FC } from 'react';
import { ThreeHeroScene, type SceneMode } from './ThreeHeroScene';
import {
  Globe,
  Layers,
  Sparkles,
  Compass,
  Cpu,
  RefreshCw,
  Clock,
  ChevronRight,
  Info
} from 'lucide-react';

interface HeroSequenceProps {
  onExploreMesh?: () => void;
}

export const HeroSequence: FC<HeroSequenceProps> = ({ onExploreMesh }) => {
  const [mode, setMode] = useState<SceneMode>('globe');
  const [timeOffset, setTimeOffset] = useState<number>(0);
  const [activePanel, setActivePanel] = useState<'all' | 'bio' | 'explain' | 'telemetry'>('all');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const togglePanelFocus = (panel: 'bio' | 'explain' | 'telemetry') => {
    if (activePanel === panel && isFocused) {
      setActivePanel('all');
      setIsFocused(false);
    } else {
      setActivePanel(panel);
      setIsFocused(true);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#060b08] pt-20">
      {/* Background 3D WebGL Scene */}
      <ThreeHeroScene
        mode={mode}
        timeOffset={timeOffset}
        isPaused={isFocused}
      />

      {/* Atmospheric Top Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060b08]/80 via-transparent to-[#060b08]/90 pointer-events-none z-[2]" />

      {/* Floating Mode Switcher & Poetic Hero Tagline */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4 md:pt-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/25 text-emerald-300 text-xs font-mono tracking-wide mb-2 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Living Planetary Intelligence
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-slate-100 tracking-tight leading-tight max-w-2xl">
              What the organism feels.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300 font-serif italic">
                Decoded at the edge.
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl">
              Translating biological impedance, acoustic particulate spikes, and botanical stress
              into transparent, microwatt air quality intelligence.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0a130c]/80 border border-emerald-500/20 backdrop-blur-lg self-start md:self-center">
            <button
              onClick={() => setMode('bark')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                mode === 'bark'
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Bark Origin
            </button>
            <button
              onClick={() => setMode('globe')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                mode === 'globe'
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              2. Planetary Globe
            </button>
            <button
              onClick={() => setMode('local')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                mode === 'local'
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              3. Local Smog (3D)
            </button>
          </div>
        </div>

        {/* Cinematic Bark Etching Overlay */}
        {mode === 'bark' && (
          <div className="mt-8 p-6 max-w-lg rounded-2xl glass-panel animate-in fade-in duration-500">
            <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Lichen Biological Script — Soft Dawn Mist
            </div>
            <div className="space-y-2.5 font-mono text-xs text-slate-300">
              <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-emerald-300">
                “What the tree feels” — living membrane polarization
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300">
                <span className="text-emerald-400">IF</span> bio-impedance rise <span className="text-cyan-400">AND</span> low wind
                <span className="text-emerald-400"> → PM2.5 dominant</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300">
                <span className="text-emerald-400">AND</span> humidity spike
                <span className="text-cyan-400"> → trapped VOCs</span>
              </div>
            </div>
            <button
              onClick={() => setMode('globe')}
              className="mt-4 w-full py-2 px-3 rounded-lg text-xs font-medium text-emerald-300 bg-emerald-950/70 border border-emerald-500/30 hover:bg-emerald-900/50 flex items-center justify-center gap-2 transition-colors"
            >
              <span>Expand to Planetary Scale</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Floating Glassmorphic Panels Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
          {/* PANEL 1: Left Panel – Bio-AQI Live Readout */}
          <div
            onClick={() => togglePanelFocus('bio')}
            className={`glass-panel p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 cursor-pointer ${
              activePanel === 'bio' || activePanel === 'all'
                ? 'opacity-100 ring-1 ring-emerald-500/30'
                : 'opacity-40 hover:opacity-70'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-emerald-500/15 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-ping" />
                  <span className="text-xs font-mono tracking-wider uppercase text-slate-300">
                    Bio-AQI Live Readout
                  </span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-mono">
                  91% Confidence
                </span>
              </div>

              {/* Large Centered Bio-AQI Score */}
              <div className="text-center my-3">
                <div className="text-5xl md:text-6xl font-semibold font-mono tracking-tight text-slate-100">
                  78
                </div>
                <div className="text-xs font-medium text-orange-400 uppercase tracking-widest mt-1">
                  High Stress Intensity
                </div>
                <div className="text-[11px] text-slate-400 mt-1 font-mono">
                  Dominant: NO₂ + PM₂.₅ combined
                </div>
              </div>
            </div>

            {/* Comparison Bar: Tree vs Official City Sensor */}
            <div className="mt-4 pt-3 border-t border-emerald-500/15 space-y-2">
              <div className="text-[11px] font-mono text-slate-400 uppercase">
                Sensor Resolution Disparity
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    What the tree feels (5m)
                  </span>
                  <span className="font-mono font-semibold text-orange-400">78 • Moderate-High</span>
                </div>
                <div className="w-full bg-slate-900/80 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500 to-orange-500 h-full w-[65%]" />
                </div>

                <div className="flex justify-between items-center pt-1">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                    Official city AQI (10km avg)
                  </span>
                  <span className="font-mono font-medium text-slate-300">62 • Moderate</span>
                </div>
                <div className="w-full bg-slate-900/80 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-slate-600 h-full w-[48%]" />
                </div>
              </div>
            </div>
          </div>

          {/* PANEL 2: Center Panel – Explainable AI Chain (Tsetlin Machine) */}
          <div
            onClick={() => togglePanelFocus('explain')}
            className={`glass-panel p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 cursor-pointer ${
              activePanel === 'explain' || activePanel === 'all'
                ? 'opacity-100 ring-1 ring-cyan-500/30'
                : 'opacity-40 hover:opacity-70'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-cyan-500/15 mb-4">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono tracking-wider uppercase text-slate-300">
                    Explainable AI Chain (Tsetlin)
                  </span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 font-mono">
                  Micro-watt Edge
                </span>
              </div>

              <div className="space-y-2">
                <div className="text-[11px] text-slate-400 font-mono uppercase">
                  Top 3 Biological Contributors:
                </div>
                <div className="p-2.5 rounded-xl bg-[#0d1c14]/80 border border-emerald-500/25 text-xs text-slate-200">
                  <div className="font-mono text-emerald-400 text-[11px]">Clause #1 • Weight +8.4</div>
                  <div>Piezo vibration spike <span className="text-cyan-400 font-semibold">AND</span> low wind speed → trapped particulates</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0d1c14]/60 border border-emerald-500/20 text-xs text-slate-300">
                  <div className="font-mono text-emerald-400 text-[11px]">Clause #2 • Weight +6.1</div>
                  <div>Bio-impedance shift <span className="text-cyan-400 font-semibold">UNDER</span> high humidity → VOC accumulation</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0d1c14]/40 border border-emerald-500/15 text-xs text-slate-400">
                  <div className="font-mono text-emerald-400 text-[11px]">Clause #3 • Weight +4.9</div>
                  <div>Ultrasonic echo delay → aerosol density increase</div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-cyan-500/15 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-400 leading-relaxed">
                <span className="text-slate-200 font-medium">Transparent Propositional Logic:</span> Unlike
                energy-hungry, opaque black-box neural nets, this runs on 47 microwatts at the tree edge.
              </p>
            </div>
          </div>

          {/* PANEL 3: Right Panel – Live Data Pulses */}
          <div
            onClick={() => togglePanelFocus('telemetry')}
            className={`glass-panel p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 cursor-pointer ${
              activePanel === 'telemetry' || activePanel === 'all'
                ? 'opacity-100 ring-1 ring-emerald-500/30'
                : 'opacity-40 hover:opacity-70'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-emerald-500/15 mb-4">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '8s' }} />
                  <span className="text-xs font-mono tracking-wider uppercase text-slate-300">
                    Live Telemetry Streams
                  </span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 font-mono">
                  Breathing Sync
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-1.5 border-b border-white/[0.04] text-xs">
                  <span className="text-slate-400">Open-Meteo Weather</span>
                  <span className="font-mono text-slate-200">22.4°C • 68% RH • 3.2 m/s NW</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/[0.04] text-xs">
                  <span className="text-slate-400">Corridor Traffic Index</span>
                  <span className="font-mono text-orange-400">84% Heavy Congestion</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/[0.04] text-xs">
                  <span className="text-slate-400">Confidence Interval</span>
                  <span className="font-mono text-emerald-400">±4% Standard Error</span>
                </div>
                <div className="flex justify-between items-center py-1.5 text-xs">
                  <span className="text-slate-400">Last Telemetry Heartbeat</span>
                  <span className="font-mono text-cyan-300 text-[11px]">2026-01-30 14:23:41 UTC</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-emerald-500/15">
              <a
                href="#bio-mesh"
                onClick={onExploreMesh}
                className="w-full py-2 px-3 rounded-lg text-xs font-medium text-emerald-200 bg-emerald-950/50 hover:bg-emerald-900/50 border border-emerald-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-emerald-400" />
                <span>Examine Bio-Mesh Topography</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Time Slider / 24h Scrubber */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8">
        <div className="p-3.5 sm:p-4 rounded-xl glass-panel flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-xs font-mono text-slate-300">
            <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Temporal Vector Scrub:</span>
            <span className="text-emerald-400 font-semibold">
              {timeOffset === 0
                ? 'Present (Live)'
                : timeOffset > 0
                ? `+${timeOffset}h Predicted Future`
                : `${timeOffset}h Historical Archive`}
            </span>
          </div>

          {/* Range Slider */}
          <div className="w-full sm:max-w-md flex items-center gap-3">
            <span className="text-[11px] font-mono text-slate-500">-12h</span>
            <input
              type="range"
              min="-12"
              max="24"
              step="1"
              value={timeOffset}
              onChange={(e) => setTimeOffset(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            <span className="text-[11px] font-mono text-slate-500">+24h</span>
          </div>

          <div className="text-[11px] font-mono text-slate-400 hidden lg:block">
            Modulates smog layer buoyancy & wind vectors
          </div>
        </div>
      </div>
    </div>
  );
};

