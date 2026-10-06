import { useState, type FC, type ReactNode } from 'react';
import type { HardwarePart } from '../types';
import { Cpu, Zap, Activity, Battery, Disc3, Info } from 'lucide-react';

export const HardwareProbeExploded: FC = () => {
  const [activePartId, setActivePartId] = useState<string>('part-electrodes');
  const [isExploded, setIsExploded] = useState<boolean>(true);

  const parts: (HardwarePart & { icon: ReactNode })[] = [
    {
      id: 'part-electrodes',
      name: 'Bio-Impedance Graphene Electrodes',
      powerDraw: '8 μW',
      signalType: '10 kHz AC Micro-Polarization',
      role: 'Interrogates cell-wall resistance and surface thallus moisture film for acidic ion accumulation (NOx, SOx).',
      details: 'Flexible 12-micron biocompatible graphene filaments that rest gently across the fungal cortex without cellular puncture.',
      position: [0, 1.4, 0],
      icon: <Zap className="w-4 h-4 text-emerald-400" />
    },
    {
      id: 'part-piezo',
      name: 'Piezo / Ultrasonic Acoustic Sensor',
      powerDraw: '14 μW',
      signalType: '40 kHz Resonant Frequency Shift',
      role: 'Measures fine particulate mass deposition (PM2.5 & PM10) via micro-vibration damping on lichen lobes.',
      details: 'Passive acoustic transducer that translates micro-droplet & aerosol impacts into quantifiable millivolt impulses.',
      position: [0, 0.5, 0],
      icon: <Activity className="w-4 h-4 text-cyan-400" />
    },
    {
      id: 'part-mcu',
      name: 'Edge Tsetlin Microcontroller',
      powerDraw: '18 μW',
      signalType: 'Propositional Boolean Inference',
      role: 'Evaluates 256 boolean logic clauses directly at the tree. Replaces high-power GPUs with transparent finite state automata.',
      details: 'Ultra-low power sub-threshold RISC-V core executing deterministic inclusion/exclusion clauses at 100 kHz.',
      position: [0, -0.4, 0],
      icon: <Cpu className="w-4 h-4 text-emerald-300" />
    },
    {
      id: 'part-battery',
      name: 'Coin-Cell & RF Harvester',
      powerDraw: '7 μW (Standby Avg)',
      signalType: 'Sub-GHz LoRaWAN (868/915 MHz)',
      role: 'Powers continuous operation for 5+ years with ambient thermoelectric micro-harvesting from tree bark temperature gradients.',
      details: 'Standard CR2032 form-factor augmented with dual-junction Peltier harvester, eliminating toxic battery disposals.',
      position: [0, -1.3, 0],
      icon: <Battery className="w-4 h-4 text-yellow-400" />
    }
  ];

  const selectedPart = parts.find((p) => p.id === activePartId) || parts[0];

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-500/15">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-2">
            <Disc3 className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '10s' }} />
            Interactive Hardware Probe
          </div>
          <h3 className="text-xl font-semibold text-slate-100 mt-1">
            Exploded 3D Architecture: 47 μW Non-Invasive Epiphytic Node
          </h3>
        </div>

        {/* Explode Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">View State:</span>
          <button
            onClick={() => setIsExploded(!isExploded)}
            className={`px-3 py-1 rounded-lg text-xs font-medium font-mono transition-all ${
              isExploded
                ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-300'
                : 'bg-black/40 border border-white/10 text-slate-400 hover:text-slate-200'
            }`}
          >
            {isExploded ? 'Exploded Layered View' : 'Compact Assembled Capsule'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Visual Layer Stack Diagram */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center min-h-[340px] relative py-6">
          <div className="w-full max-w-sm space-y-3 relative">
            {parts.map((part, index) => {
              const isSelected = activePartId === part.id;
              const spacingClass = isExploded
                ? 'translate-y-0 my-3'
                : 'translate-y-[-10px] -my-1.5 opacity-90 scale-95';

              return (
                <div
                  key={part.id}
                  onClick={() => setActivePartId(part.id)}
                  onMouseEnter={() => setActivePartId(part.id)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 transform relative ${spacingClass} ${
                    isSelected
                      ? 'bg-emerald-950/80 border-2 border-emerald-400 shadow-xl shadow-emerald-950/50 scale-102'
                      : 'bg-[#08130c]/90 border border-emerald-500/20 hover:border-emerald-500/40 hover:bg-[#0c1c12]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-black/50 border border-emerald-500/30 flex items-center justify-center">
                        {part.icon}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-100">{part.name}</div>
                        <div className="text-[10px] font-mono text-emerald-400 mt-0.5">
                          Draw: {part.powerDraw} • {part.signalType}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-slate-400 border border-white/5">
                      L{index + 1}
                    </span>
                  </div>

                  {/* Connecting Guides when exploded */}
                  {isExploded && index < parts.length - 1 && (
                    <div className="absolute left-8 -bottom-3.5 w-0.5 h-3 bg-emerald-500/30" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Part Inspector / Technical Detail Card */}
        <div className="lg:col-span-6 bg-black/40 border border-emerald-500/20 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-950/70 border border-emerald-500/30 flex items-center justify-center">
                {selectedPart.icon}
              </div>
              <div>
                <h4 className="text-base font-semibold text-slate-100">{selectedPart.name}</h4>
                <div className="text-xs font-mono text-emerald-400">{selectedPart.signalType}</div>
              </div>
            </div>
            <div className="text-right font-mono">
              <div className="text-[10px] text-slate-400 uppercase">Power Consumption</div>
              <div className="text-sm font-semibold text-cyan-300">{selectedPart.powerDraw}</div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="text-xs font-mono uppercase text-slate-400 mb-1">
                Role in Pollution Detection
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {selectedPart.role}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/25 border border-emerald-500/15">
              <div className="text-xs font-mono uppercase text-emerald-400 mb-1 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                Biological Interface Specification
              </div>
              <p className="text-xs text-slate-300 font-mono leading-relaxed">
                {selectedPart.details}
              </p>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Total Node Power Budget: 47 μW</span>
            <span>Harvesting Reserve: 99.4%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

