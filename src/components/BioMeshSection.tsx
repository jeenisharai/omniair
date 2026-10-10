import { useState, type FC } from 'react';
import { BioMeshMapCanvas } from './BioMeshMapCanvas';
import { HardwareProbeExploded } from './HardwareProbeExploded';
import type { MapOverlaySettings } from '../types';
import { MapPin, SlidersHorizontal, ShieldAlert, Truck, Database } from 'lucide-react';

export const BioMeshSection: FC = () => {
  const [overlays, setOverlays] = useState<MapOverlaySettings>({
    showIncome: true,
    showSchools: true,
    showHospitals: true,
    showTraffic: true,
    showGovDeserts: true,
  });

  const toggleOverlay = (key: keyof MapOverlaySettings) => {
    setOverlays((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-16" id="bio-mesh">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#07241c] border border-[#1fd4a4]/30 text-[#1fd4a4] text-xs font-mono mb-3">
            <MapPin className="w-3.5 h-3.5" />
            Hyper-Local Bio-Mesh Topography
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            City-Scale Living Cartography.{' '}
            <span className="text-[#1fd4a4] font-serif italic text-teal-glow">Unmasking Sensor Deserts.</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
            Conventional regional monitors place one sensor per 40 square kilometers. The Lichen Bio-Mesh fills the void,
            mapping street canyon dynamics, transit arteries, and localized exposure disparities.
          </p>
        </div>

        {/* Layer Controls Bar */}
        <div className="p-2.5 rounded-2xl glass-panel flex flex-wrap items-center gap-2 self-start md:self-end border border-[#1fd4a4]/20">
          <span className="text-xs font-mono text-slate-400 px-2 flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#1fd4a4]" />
            Overlays:
          </span>

          <button
            onClick={() => toggleOverlay('showIncome')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
              overlays.showIncome
                ? 'bg-red-950/70 border border-red-500/40 text-red-300'
                : 'bg-black/30 border border-white/5 text-slate-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            Income Disparity
          </button>

          <button
            onClick={() => toggleOverlay('showTraffic')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
              overlays.showTraffic
                ? 'bg-amber-950/70 border border-[#f5a524]/40 text-[#f5a524]'
                : 'bg-black/30 border border-white/5 text-slate-400 hover:text-white'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            Traffic Corridors
          </button>

          <button
            onClick={() => toggleOverlay('showGovDeserts')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
              overlays.showGovDeserts
                ? 'bg-cyan-950/70 border border-cyan-500/40 text-[#8be9ff]'
                : 'bg-black/30 border border-white/5 text-slate-400 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            Sensor Deserts
          </button>
        </div>
      </div>

      {/* Interactive 2.5D Topographic Canvas */}
      <BioMeshMapCanvas overlays={overlays} />

      {/* Factual Disparity Metrics (Calm scientific tone) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-panel p-5 rounded-2xl border border-white/[0.08]">
          <div className="text-xs font-mono uppercase text-slate-400">Municipal Monitoring Density</div>
          <div className="text-2xl font-bold font-mono text-slate-200 mt-1">1 Station / 42.6 km²</div>
          <p className="text-xs text-slate-400 mt-1.5 font-sans leading-relaxed">
            Regional spatial smoothing overlooks street-level particulate concentrations and micro-canyons.
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-[#1fd4a4]/25">
          <div className="text-xs font-mono uppercase text-[#1fd4a4]">Lichen Bio-Mesh Density</div>
          <div className="text-2xl font-bold font-mono text-[#1fd4a4] mt-1">142 Nodes / 1 km²</div>
          <p className="text-xs text-slate-400 mt-1.5 font-sans leading-relaxed">
            Zero-infrastructure tree deployment yielding contiguous 5-meter spatial granularity.
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-[#ff5a3c]/25">
          <div className="text-xs font-mono uppercase text-[#ff5a3c]">Low-Income Exposure Delta</div>
          <div className="text-2xl font-bold font-mono text-[#ff5a3c] mt-1">+34.8% PM₂.₅ Index</div>
          <p className="text-xs text-slate-400 mt-1.5 font-sans leading-relaxed">
            Persistent elevation along freight corridors adjacent to non-air-filtered residential units.
          </p>
        </div>
      </div>

      {/* Hardware Probe Exploded 3D Widget */}
      <HardwareProbeExploded />
    </div>
  );
};
