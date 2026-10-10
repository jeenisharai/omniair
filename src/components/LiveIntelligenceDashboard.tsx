import { useState, type FC } from 'react';
import {
  Activity,
  Radio,
  Sliders,
  RotateCcw,
  Clock,
  Sparkles,
  Layers,
  Send,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import {
  CURRENT_TELEMETRY,
  SENSOR_STREAMS,
  INITIAL_ACCOUNTABILITY_LOG,
  INITIAL_CITIZEN_REPORTS
} from '../data/telemetryData';
import type { AccountabilityLogEntry, CitizenReport } from '../types';

export type DashboardView =
  | 'map'
  | 'fusion'
  | 'simulation'
  | 'biosignals'
  | 'replay'
  | 'plant_clean'
  | 'settings';

export const LiveIntelligenceDashboard: FC = () => {
  const [activeView, setActiveView] = useState<DashboardView>('map');
  const [focusTunnel, setFocusTunnel] = useState<boolean>(false);
  const [accountabilityLog, setAccountabilityLog] = useState<AccountabilityLogEntry[]>(INITIAL_ACCOUNTABILITY_LOG);
  const [citizenReports, setCitizenReports] = useState<CitizenReport[]>(INITIAL_CITIZEN_REPORTS);
  const [newReportText, setNewReportText] = useState('');
  const [decisionDismissed, setDecisionDismissed] = useState(false);
  const [decisionAccepted, setDecisionAccepted] = useState(false);

  // Simulation State
  const [simWind, setSimWind] = useState(1.4);
  const [simTraffic, setSimTraffic] = useState(1.5);
  const [simHours, setSimHours] = useState(3.5);

  // Time Replay State
  const [replayOffset, setReplayOffset] = useState(0); // 0 = now, -3 to 0

  const handleSyncObservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReportText.trim()) return;

    const newReport: CitizenReport = {
      id: `rep-${Date.now()}`,
      timestamp: 'Just now (UTC)',
      location: 'Tokyo Bay Corridor (Sector 4)',
      observation: newReportText,
      category: 'Haze',
      status: 'Integrated',
      confidenceNudge: '+2.1% to Boundary Stagnation Vector',
    };

    setCitizenReports([newReport, ...citizenReports]);
    setNewReportText('');
  };

  const handleAdviseAction = () => {
    setDecisionAccepted(true);
    const newLog: AccountabilityLogEntry = {
      id: `acc-${Date.now()}`,
      timestamp: 'Just now UTC',
      action: 'Advisory accepted: Variable lane speed throttling & exhaust diversion dispatched',
      zone: 'Tokyo Bay Corridor (KM 12–16)',
      confidence: 93,
      status: 'ACCEPTED',
      rationale: 'Operator confirmed Tsetlin Clause #01 particulate risk projection.',
    };
    setAccountabilityLog([newLog, ...accountabilityLog]);
  };

  const handleDismissAction = () => {
    setDecisionDismissed(true);
    const newLog: AccountabilityLogEntry = {
      id: `acc-${Date.now()}`,
      timestamp: 'Just now UTC',
      action: 'Advisory dismissed: Route traffic bypass deferred',
      zone: 'Tokyo Bay Corridor',
      confidence: 91,
      status: 'DISMISSED',
      rationale: 'Dismissed by operator after automated sensor verification check.',
    };
    setAccountabilityLog([newLog, ...accountabilityLog]);
  };

  return (
    <div className="w-full space-y-6" id="live-intelligence">
      {/* 1. MISSION-CONTROL TOP BAR */}
      <div className="glass-panel p-4 flex flex-wrap items-center justify-between gap-4 border border-[#1fd4a4]/25 shadow-xl">
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-3 py-1 rounded-lg bg-black/50 border border-[#1fd4a4]/30 font-mono text-xs text-white flex items-center gap-2">
            <span className="text-slate-400">DOMAIN:</span>
            <span className="text-[#1fd4a4] font-bold">TOKYO BAY CORRIDOR (SECTOR 4)</span>
          </div>

          <div className="px-2.5 py-1 rounded-full bg-[#07241c] border border-[#1fd4a4]/40 font-mono text-[11px] text-[#1fd4a4] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#1fd4a4] animate-ping" />
            LIVE DATA STREAM
          </div>

          <div className="px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-700 font-mono text-[11px] text-slate-300">
            ETHICAL MODE: CONSERVATIVE
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Focus Tunnel Toggle */}
          <button
            onClick={() => setFocusTunnel(!focusTunnel)}
            className={`px-3 py-1 rounded-lg font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              focusTunnel
                ? 'bg-[#1fd4a4] text-black font-semibold shadow-md shadow-[#1fd4a4]/30'
                : 'bg-black/40 text-slate-300 border border-white/10 hover:border-[#1fd4a4]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>FOCUS TUNNEL: {focusTunnel ? 'ON' : 'OFF'}</span>
          </button>

          {/* System Status Pill */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-black/40 border border-[#1fd4a4]/20 font-mono text-xs">
            <span className="text-slate-400">Status:</span>
            <span className="text-[#1fd4a4] font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#1fd4a4] animate-pulse" />
              NOMINAL
            </span>
          </div>
        </div>
      </div>

      {/* 2. DASHBOARD BODY: SIDEBAR + CONTENT AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sidebar */}
        <aside className="lg:col-span-3 glass-panel p-3 rounded-2xl space-y-1.5">
          <div className="text-[10px] font-mono uppercase text-slate-400 px-3 py-1 tracking-wider">
            Operational Telemetry
          </div>

          {[
            { id: 'map', label: 'Intelligence Map', icon: <Radio className="w-4 h-4" /> },
            { id: 'fusion', label: 'Signal Fusion', icon: <Activity className="w-4 h-4" /> },
            { id: 'simulation', label: 'Simulation View', icon: <Sliders className="w-4 h-4" /> },
            { id: 'biosignals', label: 'Bio-Signals Spectrum', icon: <Sparkles className="w-4 h-4" /> },
            { id: 'replay', label: 'Time Replay', icon: <Clock className="w-4 h-4" /> },
            { id: 'plant_clean', label: 'Plant & Clean', icon: <Layers className="w-4 h-4 text-[#1fd4a4]" /> },
          ].map((tab) => {
            const isActive = activeView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'plant_clean') {
                    document.getElementById('impact')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    setActiveView(tab.id as DashboardView);
                  }
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-mono text-xs transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-[#07241c] text-[#1fd4a4] border border-[#1fd4a4]/40 shadow-sm shadow-[#1fd4a4]/10 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-[#1fd4a4]' : 'text-slate-400'}>{tab.icon}</span>
                  <span>{tab.label}</span>
                </div>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#1fd4a4]" />}
              </button>
            );
          })}
        </aside>

        {/* Main Operational View */}
        <div className="lg:col-span-9 space-y-6">
          {/* VIEW: INTELLIGENCE MAP */}
          {activeView === 'map' && (
            <div className={`space-y-6 transition-opacity duration-300 ${focusTunnel ? 'opacity-95' : 'opacity-100'}`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* LEFT: Bio-AQI Live Readout */}
                <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3">
                      <span className="text-xs font-mono uppercase text-slate-300 tracking-wider">
                        Bio-AQI Live Readout
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#07241c] text-[#1fd4a4] border border-[#1fd4a4]/30">
                        91% Confidence
                      </span>
                    </div>

                    <div className="text-center my-3">
                      <div className="text-5xl font-mono font-bold text-white tracking-tight animate-pulse">
                        {CURRENT_TELEMETRY.aqi}
                      </div>
                      <div className="text-xs font-mono text-[#ff5a3c] font-semibold uppercase tracking-widest mt-1">
                        High Stress Intensity
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        Dominant: {CURRENT_TELEMETRY.dominantPollutant}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] space-y-2 text-xs">
                    <div className="flex justify-between font-mono text-[11px]">
                      <span className="text-[#1fd4a4]">Tree Cortex (5m)</span>
                      <span className="text-[#ff5a3c] font-bold">78 • Moderate-High</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-[#10b981] to-[#ff5a3c] h-full w-[65%]" />
                    </div>

                    <div className="flex justify-between font-mono text-[11px] text-slate-400 pt-1">
                      <span>Official City Sensor (10km avg)</span>
                      <span className="text-slate-300">62 • Moderate</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-slate-600 h-full w-[50%]" />
                    </div>
                  </div>
                </div>

                {/* CENTER: Decision Moment Card */}
                <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-[#f5a524] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] mb-3">
                      <span className="text-xs font-mono uppercase text-[#f5a524] font-semibold flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5" />
                        Decision Moment
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#f5a524]/20 text-[#f5a524] border border-[#f5a524]/30">
                        93% Event Conf.
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-white">
                      Elevated particulate accumulation near highway
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed font-sans">
                      Lichen bio-impedance spike coupled with &lt;1.8 m/s wind indicates localized soot trapping along low-income residential blocks.
                    </p>

                    <div className="mt-3 space-y-1.5 font-mono text-[10px]">
                      <div className="flex justify-between text-slate-400">
                        <span>Acoustic Particulate Loading:</span>
                        <span className="text-[#f5a524] font-bold">78% Influence</span>
                      </div>
                      <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                        <div className="bg-[#f5a524] h-full w-[78%]" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2">
                    <button
                      onClick={handleAdviseAction}
                      disabled={decisionAccepted}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                        decisionAccepted
                          ? 'bg-[#10b981] text-black font-semibold'
                          : 'bg-[#1fd4a4] text-black hover:bg-[#19b28a]'
                      }`}
                    >
                      {decisionAccepted ? 'ACTION ADVISED ✓' : 'ADVISE ACTION'}
                    </button>
                    <button
                      onClick={handleDismissAction}
                      disabled={decisionDismissed}
                      className="py-1.5 px-3 rounded-lg text-xs font-mono text-slate-400 hover:text-white border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                    >
                      {decisionDismissed ? 'DISMISSED' : 'DISMISS'}
                    </button>
                  </div>
                </div>

                {/* RIGHT: Live Data Pulses */}
                <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3">
                      <span className="text-xs font-mono uppercase text-slate-300 tracking-wider">
                        Live Data Pulses
                      </span>
                      <span className="text-[10px] font-mono text-[#1fd4a4] px-1.5 py-0.5 rounded bg-black/40 border border-[#1fd4a4]/20">
                        Breathing Refresh
                      </span>
                    </div>

                    <div className="space-y-2.5 font-mono text-xs">
                      <div className="flex justify-between py-1 border-b border-white/[0.04]">
                        <span className="text-slate-400">Open-Meteo Wind</span>
                        <span className="text-slate-200">1.6 m/s NW (Stagnant)</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/[0.04]">
                        <span className="text-slate-400">Relative Humidity</span>
                        <span className="text-slate-200">76.4 %RH (Trapping)</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/[0.04]">
                        <span className="text-slate-400">Traffic Congestion</span>
                        <span className="text-[#f5a524]">84% Critical Density</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-400">Confidence Band</span>
                        <span className="text-[#1fd4a4]">±4% Std Error</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] text-[10px] font-mono text-slate-500">
                    Last update: 2026-10-05 17:15:32 UTC
                  </div>
                </div>
              </div>

              {/* Citizen Observation & Accountability Log Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-5 glass-panel p-5 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-[#1fd4a4] tracking-wider flex items-center gap-1.5">
                      <Send className="w-3.5 h-3.5" />
                      Citizen Observation Stream
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Live Nudge</span>
                  </div>

                  <form onSubmit={handleSyncObservation} className="space-y-3">
                    <textarea
                      value={newReportText}
                      onChange={(e) => setNewReportText(e.target.value)}
                      placeholder="Describe what you see: haze, smell, burning, dust near corridor..."
                      rows={2}
                      className="w-full p-3 rounded-xl bg-black/50 border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#1fd4a4] font-sans resize-none"
                    />
                    <button
                      type="submit"
                      className="w-full py-2 px-3 rounded-xl bg-[#07241c] border border-[#1fd4a4]/40 hover:bg-[#0c3327] text-[#1fd4a4] text-xs font-mono font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      SYNC TO AI MODEL
                    </button>
                  </form>

                  <div className="space-y-2 pt-2 border-t border-white/[0.06] max-h-36 overflow-y-auto">
                    {citizenReports.slice(0, 3).map((rep) => (
                      <div key={rep.id} className="p-2.5 rounded-lg bg-black/30 border border-white/[0.04] text-[11px]">
                        <div className="flex justify-between font-mono text-[10px] text-slate-400">
                          <span className="text-[#8be9ff]">{rep.category}</span>
                          <span>{rep.timestamp}</span>
                        </div>
                        <p className="text-slate-300 mt-1 line-clamp-2">{rep.observation}</p>
                        <div className="font-mono text-[9px] text-[#1fd4a4] mt-1">{rep.confidenceNudge}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-7 glass-panel p-5 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-slate-300 tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#1fd4a4]" />
                      Model Accountability Log
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">Autonomous & Supervised Decisions</span>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {accountabilityLog.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-xl bg-black/40 border border-white/[0.05] flex items-start justify-between gap-3 text-xs"
                      >
                        <div className="space-y-0.5">
                          <div className="text-slate-200 font-medium">{item.action}</div>
                          <div className="font-mono text-[10px] text-slate-400">
                            {item.zone} • {item.timestamp}
                          </div>
                          <p className="text-[11px] text-slate-500 leading-tight pt-1">
                            Rationale: {item.rationale}
                          </p>
                        </div>
                        <div className="shrink-0 text-right font-mono">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                              item.status === 'ACCEPTED'
                                ? 'bg-[#1fd4a4]/20 text-[#1fd4a4] border border-[#1fd4a4]/30'
                                : item.status === 'EXECUTED'
                                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30'
                                : 'bg-red-950/40 text-red-400 border border-red-500/20'
                            }`}
                          >
                            {item.status}
                          </span>
                          <div className="text-[10px] text-slate-400 mt-1">{item.confidence}% conf</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: SIGNAL FUSION */}
          {activeView === 'fusion' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <div>
                  <h3 className="text-base font-semibold text-white">Multi-Sensor Bio-Fusion Streams</h3>
                  <p className="text-xs text-slate-400 font-mono">Synchronized 10 kHz AC and Acoustic Transduction</p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#07241c] text-[#1fd4a4] border border-[#1fd4a4]/30">
                  Engine: Active
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SENSOR_STREAMS.map((stream) => (
                  <div key={stream.id} className="glass-panel p-4 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-slate-200">{stream.name}</span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          stream.status === 'NORMAL'
                            ? 'bg-[#07241c] text-[#1fd4a4] border border-[#1fd4a4]/30'
                            : stream.status === 'AI RECONSTRUCTING'
                            ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30 animate-pulse'
                            : 'bg-amber-950/60 text-[#f5a524] border border-[#f5a524]/40'
                        }`}
                      >
                        {stream.status}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-mono font-bold text-white">{stream.currentValue}</span>
                      <span className="text-xs font-mono text-slate-400">Delta: <span className="text-[#1fd4a4]">{stream.delta}</span></span>
                    </div>

                    <div className="h-9 w-full flex items-end gap-1.5 pt-2 border-t border-white/[0.05]">
                      {stream.sparkline.map((val, idx) => {
                        const min = Math.min(...stream.sparkline);
                        const max = Math.max(...stream.sparkline);
                        const pct = ((val - min) / (max - min || 1)) * 100;
                        return (
                          <div
                            key={idx}
                            style={{ height: `${Math.max(pct, 15)}%` }}
                            className="flex-1 bg-gradient-to-t from-[#1fd4a4]/20 to-[#1fd4a4] rounded-t-sm"
                          />
                        );
                      })}
                    </div>

                    <p className="text-[11px] text-slate-400 leading-tight">{stream.detail}</p>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-black/50 border border-[#1fd4a4]/20 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Fusion Engine: Tsetlin Automata Layer 1–4</span>
                <span className="text-[#1fd4a4]">Throughput: 1,420 vectors/sec • 47 μW Power Budget</span>
              </div>
            </div>
          )}

          {/* VIEW: SIMULATION VIEW */}
          {activeView === 'simulation' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <div>
                  <h3 className="text-base font-semibold text-white">Micro-Climate Scenario Simulation</h3>
                  <p className="text-xs text-slate-400 font-mono">Modulate variables to forecast localized trapped-particulate risk</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSimWind(1.4);
                      setSimTraffic(1.5);
                      setSimHours(3.5);
                    }}
                    className="p-1.5 rounded-lg bg-black/40 border border-white/10 hover:border-white/20 text-slate-400 hover:text-white cursor-pointer"
                    title="Reset simulation"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                <div className="md:col-span-5 glass-panel p-5 rounded-2xl space-y-4">
                  <div className="text-xs font-mono uppercase text-[#1fd4a4] flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    Input Variables
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-slate-300">Boundary Wind Speed:</span>
                      <span className="text-[#8be9ff] font-bold">{simWind.toFixed(1)} m/s</span>
                    </div>
                    <input
                      type="range"
                      min="0.4"
                      max="6.0"
                      step="0.2"
                      value={simWind}
                      onChange={(e) => setSimWind(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#1fd4a4]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-slate-300">Corridor Traffic Load:</span>
                      <span className="text-[#f5a524] font-bold">x{simTraffic.toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="3.0"
                      step="0.1"
                      value={simTraffic}
                      onChange={(e) => setSimTraffic(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#f5a524]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-slate-300">Continuous Outdoor Duration:</span>
                      <span className="text-[#ff5a3c] font-bold">{simHours.toFixed(1)} hrs</span>
                    </div>
                    <input
                      type="range"
                      min="1.0"
                      max="8.0"
                      step="0.5"
                      value={simHours}
                      onChange={(e) => setSimHours(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#ff5a3c]"
                    />
                  </div>
                </div>

                <div className="md:col-span-7 glass-panel p-5 rounded-2xl flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex justify-between items-center pb-2 border-b border-white/[0.06]">
                      <span className="text-xs font-mono uppercase text-slate-300">
                        Risk Curve Projection (24h)
                      </span>
                      <span className="text-[10px] font-mono text-[#ff5a3c]">
                        Peak: Hour +4 to +8
                      </span>
                    </div>

                    <div className="h-32 w-full mt-3 flex items-end gap-1 relative overflow-hidden bg-black/40 rounded-xl p-2">
                      {[35, 42, 54, 68, 85, 92, 88, 76, 62, 50, 44, 38].map((h, i) => {
                        const calculatedHeight = Math.min(Math.round(h * (simTraffic / 1.5) * (1.8 / simWind)), 100);
                        return (
                          <div
                            key={i}
                            style={{ height: `${calculatedHeight}%` }}
                            className={`flex-1 rounded-t-sm transition-all duration-300 ${
                              calculatedHeight > 75
                                ? 'bg-gradient-to-t from-[#ff5a3c]/30 to-[#ff5a3c]'
                                : calculatedHeight > 50
                                ? 'bg-gradient-to-t from-[#f5a524]/30 to-[#f5a524]'
                                : 'bg-gradient-to-t from-[#1fd4a4]/30 to-[#1fd4a4]'
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#f5a524]/10 border border-[#f5a524]/30 text-xs font-mono space-y-1">
                    <div className="text-[#f5a524] font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Predictive Model Insight
                    </div>
                    <p className="text-slate-300 leading-relaxed font-sans text-[11px]">
                      {simWind < 2.0
                        ? `Low boundary wind (${simWind.toFixed(1)} m/s) with current traffic load (x${simTraffic.toFixed(1)}) raises trapped-particulate probability by ~${Math.round(simTraffic * 28)}% over baseline.`
                        : `Wind ventilation (${simWind.toFixed(1)} m/s) is sufficient to lift boundary layer particulates within 45 minutes.`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: TIME REPLAY */}
          {activeView === 'replay' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <div>
                  <h3 className="text-base font-semibold text-white">Historical Reconstruction Scrubber</h3>
                  <p className="text-xs text-slate-400 font-mono">Observe model self-correction over the last 3 hours</p>
                </div>
                <span className="text-xs font-mono text-[#1fd4a4]">
                  {replayOffset === 0 ? 'NOW (17:15 UTC)' : `${replayOffset}h (${17 + replayOffset}:15 UTC)`}
                </span>
              </div>

              <div className="glass-panel p-5 rounded-2xl space-y-3">
                <div className="flex justify-between font-mono text-xs text-slate-400">
                  <span>-3h (14:15 UTC)</span>
                  <span>-2h (15:15 UTC)</span>
                  <span>-1h (16:15 UTC)</span>
                  <span className="text-[#1fd4a4] font-bold">NOW</span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="0"
                  step="0.5"
                  value={replayOffset}
                  onChange={(e) => setReplayOffset(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#1fd4a4]"
                />
              </div>

              <div className="glass-panel p-5 rounded-2xl space-y-3">
                <div className="text-xs font-mono uppercase text-slate-400">
                  Reconstructed Snapshot State • {replayOffset === 0 ? 'LIVE' : `${Math.abs(replayOffset)} hours ago`}
                </div>
                <div className="grid grid-cols-3 gap-4 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-slate-400 block text-[10px]">RECONSTRUCTED BIO-AQI</span>
                    <span className="text-xl font-bold text-white mt-1 block">
                      {replayOffset === 0 ? 78 : replayOffset === -1 ? 74 : replayOffset === -2 ? 69 : 64}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-slate-400 block text-[10px]">TSETLIN CLAUSE CONFIDENCE</span>
                    <span className="text-xl font-bold text-[#1fd4a4] mt-1 block">
                      {replayOffset === 0 ? '91%' : replayOffset === -1 ? '88%' : '84%'}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-slate-400 block text-[10px]">CONVERGENCE CYCLES</span>
                    <span className="text-xl font-bold text-[#8be9ff] mt-1 block">
                      {replayOffset === 0 ? '1,840' : '920'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: BIO-SIGNALS SPECTRUM */}
          {activeView === 'biosignals' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <div>
                  <h3 className="text-base font-semibold text-white">Epiphytic Acoustic & Impedance Spectrograms</h3>
                  <p className="text-xs text-slate-400 font-mono">Real-time physiological frequencies from living lichen thallus</p>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-2xl space-y-4">
                <div className="flex justify-between font-mono text-xs text-slate-400">
                  <span>Frequency Band: 10 Hz – 50 kHz</span>
                  <span className="text-[#1fd4a4]">Sampling: 100 kS/s</span>
                </div>
                <div className="h-40 w-full bg-black/60 rounded-xl p-3 flex items-end gap-1 overflow-hidden border border-[#1fd4a4]/20">
                  {Array.from({ length: 32 }).map((_, i) => {
                    const h = 20 + Math.sin(i * 0.4) * 35 + Math.cos(i * 0.8) * 20;
                    return (
                      <div
                        key={i}
                        style={{ height: `${Math.min(Math.max(h, 10), 95)}%` }}
                        className="flex-1 bg-gradient-to-t from-[#1fd4a4]/20 via-[#1fd4a4] to-[#8be9ff] rounded-t-sm"
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between text-[11px] font-mono text-slate-500">
                  <span>10 Hz (Membrane capacitance)</span>
                  <span>40 kHz (Piezo resonance)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
