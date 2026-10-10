import { useState, type FC } from 'react';
import {
  HeartPulse,
  Clock,
  TreePine,
  ShieldCheck,
  BookOpen,
  Sliders,
  Wind,
  ArrowRight
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

  const scrollToPlantClean = () => {
    document.getElementById('impact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#07241c] border border-[#1fd4a4]/30 text-[#1fd4a4] text-xs font-mono mb-3">
          <HeartPulse className="w-3.5 h-3.5" />
          Clinical & Ecological Translation
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
          Personal Exposure Intelligence &{' '}
          <span className="text-[#1fd4a4] font-serif italic text-teal-glow">Silent Teaching Layers.</span>
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
          Transforming invisible micro-stress into actionable personal protection schedules, targeted urban canopy
          prescriptions, and continuous biological education.
        </p>
      </div>

      {/* Interactive Personalized Exposure Intelligence Calculator */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6 border border-[#1fd4a4]/25">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#1fd4a4] flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5" />
              Micro-Exposure Diagnostic
            </div>
            <h3 className="text-xl font-semibold text-white mt-1">
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
                <span className="text-[#1fd4a4] font-bold">{age} years</span>
              </div>
              <input
                type="range"
                min="4"
                max="88"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#1fd4a4]"
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
                    className={`p-3 rounded-xl text-left transition-all cursor-pointer ${
                      sensitivity === item.id
                        ? 'bg-[#07241c] border-2 border-[#1fd4a4] text-[#1fd4a4]'
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
                <span className="text-[#8be9ff] font-bold">{outdoorHours} hours / day</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="8"
                step="0.5"
                value={outdoorHours}
                onChange={(e) => setOutdoorHours(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#8be9ff]"
              />
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-black/60 border border-[#1fd4a4]/25 flex flex-col justify-between space-y-4">
            <div>
              <div className="text-xs font-mono uppercase text-slate-400">
                Calculated Clinical Risk Score
              </div>
              <div className="flex items-baseline gap-3 mt-2">
                <span
                  className={`text-5xl font-mono font-bold ${
                    riskScore > 70
                      ? 'text-[#ff5a3c]'
                      : riskScore > 45
                      ? 'text-[#f5a524]'
                      : 'text-[#1fd4a4]'
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
                  {riskScore > 70 ? 'High Vulnerability' : 'Elevated Caution'}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#07241c] border border-[#1fd4a4]/30 space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-[#1fd4a4]">
                <Clock className="w-4 h-4" />
                Optimal Protective Outdoor Window:
              </div>
              <div className="text-sm font-semibold text-white font-mono">
                10:45 AM – 1:30 PM UTC
              </div>
              <p className="text-[11px] text-slate-400 leading-normal font-sans">
                Post-morning thermal inversion lifting; boundary layer winds disperse nitrogen dioxide before photochemical ozone generation peaks.
              </p>
            </div>

            {/* Direct Link when risk is high */}
            {riskScore > 45 && (
              <button
                onClick={scrollToPlantClean}
                className="w-full py-2 px-3 rounded-xl bg-black/40 border border-[#1fd4a4]/30 text-xs font-mono text-[#1fd4a4] hover:bg-[#07241c] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Plant or clean near you to reduce risk</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Regenerative Suggestions */}
      <div className="space-y-6">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-[#1fd4a4] flex items-center gap-2">
            <TreePine className="w-3.5 h-3.5" />
            Biological Remediation Protocols
          </div>
          <h3 className="text-2xl font-semibold text-white mt-1">
            Regenerative Interventions Informed by Lichen Physiology
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-[#1fd4a4]/20">
            <div className="w-10 h-10 rounded-xl bg-[#07241c] border border-[#1fd4a4]/30 flex items-center justify-center text-[#1fd4a4] mb-4">
              <TreePine className="w-5 h-5" />
            </div>
            <h4 className="text-base font-semibold text-white mb-1">
              Conifer Micro-Needle Canopies
            </h4>
            <div className="text-xs font-mono text-[#1fd4a4] mb-2">PM10 Entrapment: +420%</div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Lichen bio-impedance patterns confirm that evergreen pine and cedar species maintain high particulate filtration through winter months when deciduous trees shed leaves.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-[#1fd4a4]/20">
            <div className="w-10 h-10 rounded-xl bg-[#071914] border border-[#8be9ff]/30 flex items-center justify-center text-[#8be9ff] mb-4">
              <Wind className="w-5 h-5" />
            </div>
            <h4 className="text-base font-semibold text-white mb-1">
              Stepped Vegetative Transit Buffers
            </h4>
            <div className="text-xs font-mono text-[#8be9ff] mb-2">Corridor Decay: 38m Boundary</div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              5-meter thick stratified hedge-and-canopy buffers along freight arterials create physical turbulent deflection, shielding schoolyards from diesel aerosol plumes.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-[#1fd4a4]/20">
            <div className="w-10 h-10 rounded-xl bg-[#07241c] border border-[#1fd4a4]/30 flex items-center justify-center text-[#1fd4a4] mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-semibold text-white mb-1">
              Adaptive Traffic Micro-Calming
            </h4>
            <div className="text-xs font-mono text-[#1fd4a4] mb-2">Automated Divert Signal</div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              When autonomous Tsetlin edge clauses detect stagnant morning inversions, municipal signal timings dynamically meter arterial vehicle ingress into urban residential basins.
            </p>
          </div>
        </div>
      </div>

      {/* Silent Teaching Layers */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6 border border-[#1fd4a4]/25">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#1fd4a4] flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" />
              Silent Teaching Layers
            </div>
            <h3 className="text-xl font-semibold text-white mt-1">
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
                className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono transition-all cursor-pointer ${
                  teachingTab === tab.id
                    ? 'bg-[#07241c] border border-[#1fd4a4]/40 text-[#1fd4a4]'
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
              <h4 className="text-base font-semibold text-white">
                The Dual Organism: Nature’s Perfect Diagnostic Matrix
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Lichens are not single organisms, but composite symbioses between fungi (the mycobiont, building the protective structural scaffold) and photosynthetic green algae or cyanobacteria (the photobiont, synthesizing nutrients from sunlight).
              </p>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Because lichens lack cuticle waxes, air pollutants cross directly into the thallus without metabolic filtering, allowing OmniAir probes to read immediate, unaltered environmental impact.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-black/40 border border-[#1fd4a4]/20 font-mono text-xs space-y-2 text-slate-300">
              <div className="text-[#1fd4a4] font-bold">Symbiotic Bio-Parameters:</div>
              <div>• Photobiont Chlorophyll Fluorescence: 685 nm peak</div>
              <div>• Mycobiont Chitin Cell-Wall Permeability: 4.2 × 10⁻⁸ m/s</div>
              <div>• Mineral Bio-Accumulation: Lead, Cadmium, Sulfur, Vanadium</div>
            </div>
          </div>
        )}

        {teachingTab === 'chemistry' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center animate-in fade-in duration-300">
            <div className="space-y-3">
              <h4 className="text-base font-semibold text-white">
                Chemical Cascade: Acid Aerosols & Photo-Oxidants
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Sulfur dioxide (SO₂) and nitrogen oxides (NOx) react with airborne water vapor to form microscopic sulfuric and nitric acid droplets. These acidic droplets dissolve extracellular calcium in the lichen thallus, shifting electrical conductivity.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Concurrently, tropospheric ozone degrades algal membranes, creating distinctive impedance harmonics detected instantly by our 10 kHz AC probes.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-black/40 border border-[#8be9ff]/20 font-mono text-xs space-y-2 text-slate-300">
              <div className="text-[#8be9ff] font-bold">Ionic Reaction Vectors:</div>
              <div>• SO₂ + H₂O₂ → H₂SO₄ (Deposition on cortex)</div>
              <div>• NO₂ + hν → NO + O• → O₃ (Photochemical smog)</div>
              <div>• Heavy metal chelation via lichenic acids</div>
            </div>
          </div>
        )}

        {teachingTab === 'inversion' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center animate-in fade-in duration-300">
            <div className="space-y-3">
              <h4 className="text-base font-semibold text-white">
                Atmospheric Trapping: Nocturnal Inversion Layers
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                During clear, calm nights, the ground rapidly cools via longwave radiation, chilling the immediate air layer while air above remains warmer. This temperature inversion acts as an impenetrable lid over the city.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Exhaust emissions cannot rise and become compressed into a shallow breathing zone 10 to 50 meters deep, causing acute spikes in Bio-AQI even when total regional emissions remain unchanged.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-black/40 border border-[#f5a524]/20 font-mono text-xs space-y-2 text-slate-300">
              <div className="text-[#f5a524] font-bold">Thermodynamic Mechanics:</div>
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
