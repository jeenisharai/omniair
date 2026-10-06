import { useState, useEffect, type FC } from 'react';
import { Cpu, ArrowRight, Play, Pause, RotateCcw, ShieldCheck } from 'lucide-react';

interface ClauseItem {
  id: number;
  clauseNumber: string;
  name: string;
  booleanLogic: string;
  phenomenon: string;
  weight: number;
  polarity: 'Positive' | 'Negative';
  signalOrigin: string;
  biologicalMechanism: string;
}

export const ExplainabilitySection: FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  const clauses: ClauseItem[] = [
    {
      id: 0,
      clauseNumber: 'Clause #01',
      name: 'Micro-Particulate Trapping',
      booleanLogic: 'IF piezo_vibration_spike == TRUE ∧ wind_speed < 1.8 m/s',
      phenomenon: 'Trapped Respirable Particulates (PM2.5 Dominant)',
      weight: 8.4,
      polarity: 'Positive',
      signalOrigin: 'Acoustic Piezo Transducer (14 μW)',
      biologicalMechanism:
        'Lichen thallus cilia physically dampen high-frequency resonant modes when fine soot particles accumulate in the intercellular cavities under stagnant boundary layer winds.',
    },
    {
      id: 1,
      clauseNumber: 'Clause #02',
      name: 'Volatile Organics Dissolution',
      booleanLogic: 'IF bio_impedance_shift > 34% ∧ relative_humidity > 75%',
      phenomenon: 'Trapped VOCs & Photochemical Smog (NO₂ + Ozone)',
      weight: 6.1,
      polarity: 'Positive',
      signalOrigin: 'Graphene Micro-Impedance Array (8 μW)',
      biologicalMechanism:
        'High humidity condenses a microscopic aqueous film across the lichen cortex, facilitating the dissolution of airborne acidic nitrogen and volatile aromatic compounds into ionic species.',
    },
    {
      id: 2,
      clauseNumber: 'Clause #03',
      name: 'Aerosol Column Densification',
      booleanLogic: 'IF ultrasonic_echo_delay > 42μs ∧ ambient_temp_delta < -2.1°C',
      phenomenon: 'Aerosol Density Surge / Nocturnal Temperature Inversion',
      weight: 4.9,
      polarity: 'Positive',
      signalOrigin: 'Ultrasonic Pulse Probe (18 μW)',
      biologicalMechanism:
        'Ground-level cold air capping traps vehicle exhaust below canopy height, dramatically delaying acoustic time-of-flight between epiphytic sensor nodes.',
    },
    {
      id: 3,
      clauseNumber: 'Clause #04',
      name: 'Atmospheric Clearing Baseline',
      booleanLogic: 'IF canopy_wind_vector > 4.5 m/s ∧ solar_irradiance > 650 W/m²',
      phenomenon: 'Boundary Layer Dispersion / Low Bio-Stress',
      weight: -7.2,
      polarity: 'Negative',
      signalOrigin: 'Micro-Solar Photodiode & Thermal Anemometer',
      biologicalMechanism:
        'Convective thermal lifting clears the canopy corridor, restoring lichen thallus photosynthesis and normalizing baseline membrane electrical potential.',
    },
  ];

  // Auto-play progression loop
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % clauses.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [isAutoPlaying, clauses.length]);

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/25 text-cyan-400 text-xs font-mono mb-3">
            <Cpu className="w-3.5 h-3.5" />
            Transparent Propositional AI
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-100 tracking-tight">
            Explainable AI Chain.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300 font-serif italic">
              Tsetlin Logic Assembly.
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400 leading-relaxed">
            In our Tsetlin architecture, every decision is an interpretable Boolean conjunction.
            Observe clauses assemble sequentially without black-box opacity.
          </p>
        </div>

        {/* Progression Controls */}
        <div className="flex items-center gap-2 p-1.5 rounded-xl glass-panel self-start md:self-end">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="p-2 rounded-lg text-slate-300 hover:text-emerald-400 transition-colors"
            title={isAutoPlaying ? 'Pause progression' : 'Play progression'}
          >
            {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setActiveStep(0)}
            className="p-2 rounded-lg text-slate-300 hover:text-white transition-colors"
            title="Reset progression"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <div className="h-4 w-[1px] bg-white/10 mx-1" />
          <span className="text-xs font-mono text-slate-400 px-2">
            Clause {activeStep + 1} of {clauses.length}
          </span>
        </div>
      </div>

      {/* Sequential Progression Stack */}
      <div className="space-y-4">
        {clauses.map((clause, idx) => {
          const isActive = activeStep === idx;
          const isPrevious = idx < activeStep;

          return (
            <div
              key={clause.id}
              onClick={() => {
                setIsAutoPlaying(false);
                setActiveStep(idx);
              }}
              className={`p-5 sm:p-6 rounded-2xl cursor-pointer transition-all duration-500 relative ${
                isActive
                  ? 'glass-panel border-2 border-emerald-400 shadow-2xl shadow-emerald-950/80 scale-[1.01]'
                  : isPrevious
                  ? 'bg-[#060b08]/70 border border-white/[0.06] opacity-45 hover:opacity-75'
                  : 'bg-[#060b08]/50 border border-white/[0.03] opacity-30 hover:opacity-60'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-3.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono text-xs font-bold transition-colors ${
                      isActive
                        ? 'bg-emerald-400 text-black shadow-lg shadow-emerald-400/40'
                        : isPrevious
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-900 text-slate-500 border border-slate-800'
                    }`}
                  >
                    0{idx + 1}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className={isActive ? 'text-emerald-400' : 'text-slate-400'}>
                        {clause.clauseNumber}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-300 font-semibold">{clause.name}</span>
                    </div>

                    <div
                      className={`font-mono text-xs sm:text-sm mt-1 transition-colors ${
                        isActive ? 'text-cyan-300 font-medium' : 'text-slate-400'
                      }`}
                    >
                      {clause.booleanLogic}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-start md:self-center">
                  <div className="text-right">
                    <div className="text-[10px] font-mono uppercase text-slate-400">Clause Weight</div>
                    <div
                      className={`text-sm font-mono font-bold ${
                        clause.weight > 0 ? 'text-emerald-400' : 'text-cyan-400'
                      }`}
                    >
                      {clause.weight > 0 ? `+${clause.weight}` : clause.weight}
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-slate-400">
                    <ArrowRight
                      className={`w-4 h-4 transition-transform ${
                        isActive ? 'text-emerald-400 translate-x-1' : ''
                      }`}
                    />
                  </div>
                </div>
              </div>

              {isActive && (
                <div className="mt-5 pt-4 border-t border-emerald-500/20 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs animate-in fade-in duration-300">
                  <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/15">
                    <span className="font-mono text-emerald-400 uppercase text-[10px] block mb-1">
                      Signal Transduction Origin
                    </span>
                    <p className="text-slate-200 font-mono">{clause.signalOrigin}</p>
                    <p className="text-slate-400 mt-1.5 text-[11px] leading-relaxed">
                      Consequence: <span className="text-slate-200 font-medium">{clause.phenomenon}</span>
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/15">
                    <span className="font-mono text-cyan-400 uppercase text-[10px] block mb-1">
                      Lichen Cellular Mechanism
                    </span>
                    <p className="text-slate-300 leading-relaxed text-[11px]">
                      {clause.biologicalMechanism}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Contrast Callout with Deep Neural Networks */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="text-xs font-mono uppercase text-emerald-400 mb-1 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            Deterministic Verifiability
          </div>
          <h3 className="text-lg font-semibold text-slate-100">
            Why Tsetlin Machines Over Black-Box Deep Learning?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
            Neural networks rely on billions of continuous weights that hallucinate, drift under unseen weather,
            and consume massive grid energy. Tsetlin Machines learn transparent propositional logic formulas
            that can be mathematically audited by environmental health scientists.
          </p>
        </div>

        <div className="space-y-3 font-mono text-xs">
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-emerald-300">
            <span>Tsetlin Machine Power:</span>
            <span className="font-bold">47 μW (Coin-cell edge)</span>
          </div>
          <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/20 flex items-center justify-between text-slate-400">
            <span>Server Transformer Model:</span>
            <span className="text-red-400 font-bold">1,800 W (Datacenter GPU)</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-emerald-300">
            <span>Explainability Guarantee:</span>
            <span className="font-bold">100% Boolean Transparent</span>
          </div>
        </div>
      </div>
    </div>
  );
};

