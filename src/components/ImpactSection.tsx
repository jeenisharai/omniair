import { useState, type FC } from 'react';
import {
  HeartPulse,
  Clock,
  TreePine,
  ShieldCheck,
  BookOpen,
  Sliders,
  Wind
} from 'lucide-react';

export const ImpactSection: FC = () => {
  const [age, setAge] = useState<number>(34);
  const [sensitivity, setSensitivity] = useState<'general' | 'asthma' | 'cardio'>('asthma');
  const [outdoorHours, setOutdoorHours] = useState<number>(3);
  const [teachingTab, setTeachingTab] = useState<'biology' | 'chemistry' | 'inversion'>('biology');

  const calculateRisk = () => {
    let base = outdoorHours * 12;
    if (age < 12 || age > 65) base += 22;
    if (sensitivity === 'asthma') base += 28;
    if (sensitivity === 'cardio') base += 25;
    return Math.min(Math.round(base), 98);
  };

  const riskScore = calculateRisk();

  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
          <HeartPulse className="w-3.5 h-3.5" />
          Clinical & Ecological Translation
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold text-slate-100 tracking-tight">
          Personalized Exposure Intelligence &{' '}
          <span className="text-emerald-400 font-serif italic">Regenerative Action.</span>
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-400 leading-relaxed">
          Transforming invisible micro-stress into actionable human protection schedules, targeted urban canopy
          prescriptions, and continuous biological education.
        </p>
      </div>

      {/* Interactive Personalized Exposure Intelligence Calculator */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-500/15">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5" />
              Micro-Exposure Diagnostic
            </div>
            <h3 className="text-xl font-semibold text-slate-100 mt-1">
              Personalized Clinical Vulnerability & Timing Window
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Coupled with hyper-local Bio-AQI (78)
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Inputs Column */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-slate-300">Individual Age:</span>
                <span className="text-emerald-400 font-bold">{age} years</span>
              </div>
              <input
                type="range"
                min="4"
                max="88"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                <span>Pediatric (0–12)</span>
                <span>Adult</span>
                <span>Geriatric (65+)</span>
              </div>
            </div>

            <div>
              <div className="text-xs font-mono text-slate-300 mb-2">
                Pre-Existing Clinical Profile:
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'general', label: 'General Population', tag: 'Standard Baseline' },
                  { id: 'asthma', label: 'Asthma / Pulmonary', tag: 'High Sensitivity' },
                  { id: 'cardio', label: 'Cardiovascular', tag: 'Vascular Sensitivity' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSensitivity(item.id as any)}
                    className={`p-3 rounded-xl text-left transition-all ${
                      sensitivity === item.id
                        ? 'bg-emerald-950/80 border-2 border-emerald-400 text-emerald-300'
                        : 'bg-black/30 border border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-semibold">{item.label}</div>
                    <div className="text-[10px] font-mono text-slate-500 mt-0.5">{item.tag}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-slate-300">Daily Outdoor Activity:</span>
                <span className="text-cyan-400 font-bold">{outdoorHours} hours / day</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="8"
                step="0.5"
                value={outdoorHours}
                onChange={(e) => setOutdoorHours(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-black/50 border border-emerald-500/20 flex flex-col justify-between space-y-4">
            <div>
              <div className="text-xs font-mono uppercase text-slate-400">
                Calculated Exposure Risk Index
              </div>
              <div className="flex items-baseline gap-3 mt-2">
                <span
                  className={`text-5xl font-mono font-bold ${
                    riskScore > 70
                      ? 'text-red-400'
                      : riskScore > 45
                      ? 'text-orange-400'
                      : 'text-emerald-400'
                  }`}
                >
                  {riskScore}
                </span>
                <span className="text-xs font-mono text-slate-400">/ 100</span>
                <span
                  className={`text-xs font-mono px-2 py-0.5 rounded ${
                    riskScore > 70
                      ? 'bg-red-950/60 border border-red-500/30 text-red-300'
                      : 'bg-orange-950/60 border border-orange-500/30 text-orange-300'
                  }`}
                >
                  {riskScore > 70 ? 'Severe Vulnerability' : 'Elevated Caution'}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <Clock className="w-4 h-4" />
                Optimal Protective Outdoor Window:
              </div>
              <div className="text-sm font-semibold text-slate-100 font-mono">
                10:45 AM – 1:30 PM UTC
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Post-morning thermal inversion lifting; boundary layer winds disperse nitrogen dioxide before photochemical ozone generation peaks.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Regenerative Suggestions */}
      <div className="space-y-6">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-2">
            <TreePine className="w-3.5 h-3.5" />
            Biological Remediation Protocols
          </div>
          <h3 className="text-2xl font-semibold text-slate-100 mt-1">
            Regenerative Interventions Informed by Lichen Physiology
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/70 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <TreePine className="w-5 h-5" />
            </div>
            <h4 className="text-base font-semibold text-slate-100 mb-1">
              Conifer Micro-Needle Canopies
            </h4>
            <div className="text-xs font-mono text-emerald-400 mb-2">PM10 Entrapment: +420%</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Lichen bio-impedance patterns confirm that evergreen pine and cedar species maintain high particulate filtration through winter months when deciduous trees shed leaves.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
              <Wind className="w-5 h-5" />
            </div>
            <h4 className="text-base font-semibold text-slate-100 mb-1">
              Stepped Vegetative Transit Buffers
            </h4>
            <div className="text-xs font-mono text-cyan-400 mb-2">Corridor Decay: 38m Boundary</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              5-meter thick stratified hedge-and-canopy buffers along freight arterials create physical turbulent deflection, shielding schoolyards from diesel aerosol plumes.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/70 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-semibold text-slate-100 mb-1">
              Adaptive Traffic Micro-Calming
            </h4>
            <div className="text-xs font-mono text-emerald-400 mb-2">Automated Divert Signal</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              When autonomous Tsetlin edge clauses detect stagnant morning inversions, municipal signal timings dynamically meter arterial vehicle ingress into urban residential basins.
            </p>
          </div>
        </div>
      </div>

      {/* Silent Teaching Layers */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-500/15">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" />
              Silent Teaching Layers
            </div>
            <h3 className="text-xl font-semibold text-slate-100 mt-1">
              Biological, Chemical, and Atmospheric Foundations
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {[
              { id: 'biology', label: 'Lichen Symbiosis' },
              { id: 'chemistry', label: 'Pollutant Chemistry' },
              { id: 'inversion', label: 'Thermal Inversions' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTeachingTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono transition-all ${
                  teachingTab === tab.id
                    ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300'
                    : 'bg-black/30 border border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {teachingTab === 'biology' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center animate-in fade-in duration-300">
            <div className="space-y-3">
              <h4 className="text-base font-semibold text-slate-100">
                The Dual Organism: Nature’s Perfect Diagnostic Matrix
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Lichens are not single organisms, but composite symbioses between fungi (the mycobiont, building the protective structural scaffold) and photosynthetic green algae or cyanobacteria (the photobiont, synthesizing nutrients from sunlight).
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Because lichens lack cuticle waxes, air pollutants cross directly into the thallus without metabolic filtering, allowing OmniAir probes to read immediate, unaltered environmental impact.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/20 font-mono text-xs space-y-2 text-slate-300">
              <div className="text-emerald-400 font-bold">Symbiotic Bio-Parameters:</div>
              <div>• Photobiont Chlorophyll Fluorescence: 685 nm peak</div>
              <div>• Mycobiont Chitin Cell-Wall Permeability: 4.2 × 10⁻⁸ m/s</div>
              <div>• Mineral Bio-Accumulation: Lead, Cadmium, Sulfur, Vanadium</div>
            </div>
          </div>
        )}

        {teachingTab === 'chemistry' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center animate-in fade-in duration-300">
            <div className="space-y-3">
              <h4 className="text-base font-semibold text-slate-100">
                Chemical Cascade: Acid Aerosols & Photo-Oxidants
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sulfur dioxide (SO₂) and nitrogen oxides (NOx) react with airborne water vapor to form microscopic sulfuric and nitric acid droplets. These acidic droplets dissolve extracellular calcium in the lichen thallus, shifting electrical conductivity.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Concurrently, tropospheric ozone degrades algal membranes, creating distinctive impedance harmonics detected instantly by our 10 kHz AC probes.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-black/40 border border-cyan-500/20 font-mono text-xs space-y-2 text-slate-300">
              <div className="text-cyan-400 font-bold">Ionic Reaction Vectors:</div>
              <div>• SO₂ + H₂O₂ → H₂SO₄ (Deposition on cortex)</div>
              <div>• NO₂ + hν → NO + O• → O₃ (Photochemical smog)</div>
              <div>• Heavy metal chelation via lichenic acids</div>
            </div>
          </div>
        )}

        {teachingTab === 'inversion' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center animate-in fade-in duration-300">
            <div className="space-y-3">
              <h4 className="text-base font-semibold text-slate-100">
                Atmospheric Trapping: Nocturnal Inversion Layers
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                During clear, calm nights, the ground rapidly cools via longwave radiation, chilling the immediate air layer while air above remains warmer. This temperature inversion acts as an impenetrable lid over the city.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Exhaust emissions cannot rise and become compressed into a shallow breathing zone 10 to 50 meters deep, causing acute spikes in Bio-AQI even when total regional emissions remain unchanged.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-black/40 border border-yellow-500/20 font-mono text-xs space-y-2 text-slate-300">
              <div className="text-yellow-400 font-bold">Thermodynamic Mechanics:</div>
              <div>• Normal Lapse Rate: -6.5°C per 1,000m altitude</div>
              <div>• Inversion Layer: +3.2°C cap trapping urban valley air</div>
              <div>• Dissipation Threshold: 10:30 AM convective solar heating</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

