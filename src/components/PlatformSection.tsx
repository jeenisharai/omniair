import { useState, type FC } from 'react';
import { ShieldCheck, Cpu, Activity, Radio } from 'lucide-react';

export const PlatformSection: FC = () => {
  const [selectedAqiTier, setSelectedAqiTier] = useState<number>(1);

  const aqiTiers = [
    {
      range: '0–50',
      label: 'Good',
      status: 'Satisfactory air quality.',
      color: 'text-[#10b981]',
      border: 'border-[#10b981]/30',
      bg: 'bg-[#10b981]/10',
      lichenBehavior: 'Full thallus hydration, active photosynthetic electron transport, steady baseline bio-impedance.',
    },
    {
      range: '51–100',
      label: 'Moderate',
      status: 'Acceptable, but potentially concerning for sensitive groups.',
      color: 'text-[#f5a524]',
      border: 'border-[#f5a524]/30',
      bg: 'bg-[#f5a524]/10',
      lichenBehavior: 'Mild surface particulate entrapment, slight cell membrane depolarization detectable via micro-probes.',
    },
    {
      range: '101–150',
      label: 'Unhealthy for Sensitive Groups',
      status: 'People with respiratory/heart conditions should limit prolonged outdoor exposure.',
      color: 'text-[#ff5a3c]',
      border: 'border-[#ff5a3c]/30',
      bg: 'bg-[#ff5a3c]/10',
      lichenBehavior: 'Acidic sulfur & nitrogen deposition inhibits chlorophyll fluorescence; acoustic resonance shifts.',
    },
    {
      range: '151–200',
      label: 'Unhealthy',
      status: 'Everyone may start experiencing health effects.',
      color: 'text-red-400',
      border: 'border-red-500/30',
      bg: 'bg-red-950/20',
      lichenBehavior: 'Cellular electrolyte leakage across lichen cortex; extreme piezo frequency dampening from dense soot.',
    },
    {
      range: '201+',
      label: 'Very Unhealthy to Hazardous',
      status: 'Health alert, serious risk to the public.',
      color: 'text-purple-400',
      border: 'border-purple-500/30',
      bg: 'bg-purple-950/20',
      lichenBehavior: 'Acute bio-membrane distress, photochemical oxidative surge, autonomous emergency sensor alert trigger.',
    },
  ];

  return (
    <div className="space-y-16" id="platform">
      {/* Section Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#07241c] border border-[#1fd4a4]/30 text-[#1fd4a4] text-xs font-mono mb-3">
          <Activity className="w-3.5 h-3.5" />
          The Biological Edge Computing Paradigm
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
          Nature’s Oldest Biosensors.{' '}
          <span className="text-[#1fd4a4] font-serif italic text-teal-glow">Synthesized with Edge AI.</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
          Lichens have no roots, cuticles, or stomata; their entire thallus directly absorbs atmospheric nutrients,
          aerosols, and heavy metals. OmniAir non-invasively interrogates this living cortex with microwatt Tsetlin
          Machines to produce unprecedented spatial resolution.
        </p>
      </div>

      {/* Core Architectural Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-[#1fd4a4]/20">
          <div className="w-10 h-10 rounded-xl bg-[#07241c] border border-[#1fd4a4]/30 flex items-center justify-center text-[#1fd4a4] mb-4">
            <Radio className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-white mb-2">5-Meter Hyper-Local Resolution</h3>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Government optical stations average data across 10 km radii. Lichen bio-nodes mount directly on urban
            street canopies, revealing micro-climates, bus-stop pollution eddies, and sensor deserts.
          </p>
          <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-[#1fd4a4]">
            Spatial fidelity: 2,000× denser than EPA stations
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-[#8be9ff]/20">
          <div className="w-10 h-10 rounded-xl bg-[#071914] border border-[#8be9ff]/30 flex items-center justify-center text-[#8be9ff] mb-4">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-white mb-2">Microwatt Tsetlin Machines</h3>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Instead of matrix floating-point multiplications that require kilowatts in remote datacenters, our models
            use boolean propositional logic running on 47 μW coin-cell microcontrollers right on the tree.
          </p>
          <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-[#8be9ff]">
            Compute footprint: 0.000047 Watts
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-[#1fd4a4]/20">
          <div className="w-10 h-10 rounded-xl bg-[#07241c] border border-[#1fd4a4]/30 flex items-center justify-center text-[#1fd4a4] mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-white mb-2">Zero-Harm Epiphytic Coupling</h3>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Flexible bio-compatible graphene needles sense moisture-film impedance and acoustic resonance without
            disrupting lichen photobiont algal cells or piercing the tree’s living phloem.
          </p>
          <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-[#1fd4a4]">
            Organism impact: 100% regenerative & benign
          </div>
        </div>
      </div>

      {/* Official AQI Standard vs Biological Indicator Matrix */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6 border border-[#1fd4a4]/25">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#1fd4a4]">
              Interactive Standard Matrix
            </div>
            <h3 className="text-xl font-semibold text-white mt-1">
              Air Quality Index (AQI) Classification & Biological Response
            </h3>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Click tier to inspect bio-cellular response
          </div>
        </div>

        {/* Tier Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {aqiTiers.map((tier, idx) => (
            <button
              key={tier.range}
              onClick={() => setSelectedAqiTier(idx)}
              className={`p-3.5 rounded-xl text-left transition-all cursor-pointer ${
                selectedAqiTier === idx
                  ? `${tier.bg} ${tier.border} border-2 shadow-lg shadow-black/50`
                  : 'bg-black/30 border border-white/[0.06] hover:border-white/[0.15]'
              }`}
            >
              <div className="text-sm font-mono font-bold text-white">{tier.range}</div>
              <div className={`text-xs font-medium mt-1 ${tier.color}`}>{tier.label}</div>
            </button>
          ))}
        </div>

        {/* Selected Tier Detail Box */}
        <div className="p-5 rounded-xl bg-black/50 border border-[#1fd4a4]/20 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className={`text-sm font-mono font-semibold ${aqiTiers[selectedAqiTier].color}`}>
              AQI {aqiTiers[selectedAqiTier].range} — {aqiTiers[selectedAqiTier].label}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Clinical Classification
            </span>
          </div>

          <p className="text-sm text-slate-200 font-sans">
            {aqiTiers[selectedAqiTier].status}
          </p>

          <div className="pt-2 border-t border-white/[0.06] flex items-start gap-2.5">
            <span className="text-xs font-mono text-[#1fd4a4] shrink-0 mt-0.5">Bio-Response:</span>
            <p className="text-xs text-slate-300 font-mono leading-relaxed">
              {aqiTiers[selectedAqiTier].lichenBehavior}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
