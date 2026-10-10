import type { FC } from 'react';
import { Activity } from 'lucide-react';

export const Footer: FC = () => {
  return (
    <footer className="w-full bg-[#030708] border-t border-[#1fd4a4]/15 py-24 relative overflow-hidden">
      {/* Background Lichen Pulse Aura */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
        <div className="w-[640px] h-[360px] bg-[#1fd4a4]/10 rounded-full blur-3xl animate-lichen-pulse" />
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-10">
        {/* Living Indicator */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#07241c] border border-[#1fd4a4]/30 text-[#1fd4a4] text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-[#1fd4a4] animate-lichen-pulse" />
          Planetary Epiphytic Mesh • Continuous Sweep
        </div>

        {/* Closing Philosophical Quote (Exact prompt requirement) */}
        <blockquote className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-slate-100 tracking-tight leading-relaxed max-w-2xl mx-auto font-light">
          “This system exists to make invisible harm visible, and preventable.”
        </blockquote>

        {/* Technical Provenance & Telemetry Details */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            OMNI AIR © 2026 • Planetary Intelligence Network
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#1fd4a4] flex items-center gap-1">
              <Activity className="w-3.5 h-3.5" />
              Tsetlin Boolean Logic Engine: 100% Deterministic
            </span>
            <span>•</span>
            <span>Zero-Harm Epiphytic Biosensing</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
