import type { FC } from 'react';
import { Activity } from 'lucide-react';

export const Footer: FC = () => {
  return (
    <footer className="w-full bg-[#040805] border-t border-emerald-500/15 py-20 relative overflow-hidden">
      {/* Background Lichen Pulse Aura */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl animate-lichen-pulse" />
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-10">
        {/* Living Indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-lichen-pulse" />
          Autonomous Epiphytic Network • Active
        </div>

        {/* Closing Philosophical Quote */}
        <blockquote className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-slate-100 tracking-tight leading-relaxed max-w-2xl mx-auto">
          “This system exists to make invisible harm visible — and preventable.”
        </blockquote>

        {/* Technical Provenance & Telemetry Details */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            OmniAir © 2026 • Planetary Lichen Intelligence System
          </div>

          <div className="flex items-center gap-4">
            <span className="text-emerald-500/80 flex items-center gap-1">
              <Activity className="w-3.5 h-3.5" />
              Tsetlin Logic Engine: 100% Deterministic
            </span>
            <span>•</span>
            <span>Zero-Harm Biosensing</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

