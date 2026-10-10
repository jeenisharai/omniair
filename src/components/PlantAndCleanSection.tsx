import { useState, type FC } from 'react';
import {
  TreePine,
  MapPin,
  CheckCircle,
  Filter,
  Calendar,
  Users,
  Wrench,
  ShieldCheck,
  PlusCircle,
  AlertTriangle,
  ArrowRight,
  Info,
  Compass
} from 'lucide-react';
import {
  PLANTATION_DRIVES,
  CLEANUP_HOTSPOTS,
  CLEAN_AIR_ACTIONS,
  IMPACT_LEDGER_STATS
} from '../data/impactData';
import type { CleanUpHotspot } from '../types';

export const PlantAndCleanSection: FC = () => {
  const [activeTab, setActiveTab] = useState<'plantation' | 'cleanups' | 'ledger'>('plantation');

  // Filters
  const [selectedCause, setSelectedCause] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [joinedDrives, setJoinedDrives] = useState<Set<string>>(new Set());
  const [savedDrives, setSavedDrives] = useState<Set<string>>(new Set());

  // Modals & Submissions
  const [showSuggestSpotModal, setShowSuggestSpotModal] = useState<boolean>(false);
  const [suggestedAddress, setSuggestedAddress] = useState<string>('');
  const [suggestedResult, setSuggestedResult] = useState<boolean>(false);

  const [showListDriveModal, setShowListDriveModal] = useState<boolean>(false);
  const [listDriveSuccess, setListDriveSuccess] = useState<boolean>(false);

  const [showReportHotspotModal, setShowReportHotspotModal] = useState<boolean>(false);
  const [hotspotReportSuccess, setHotspotReportSuccess] = useState<boolean>(false);
  const [hotspotCategory, setHotspotCategory] = useState<CleanUpHotspot['category']>('dust/construction debris');
  const [hotspotLocation, setHotspotLocation] = useState<string>('');

  // Before / After Slider state (0 to 100)
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  const toggleJoinDrive = (id: string) => {
    setJoinedDrives((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSaveDrive = (id: string) => {
    setSavedDrives((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredDrives = PLANTATION_DRIVES.filter((drive) => {
    if (selectedCause !== 'all' && drive.cause !== selectedCause) return false;
    if (selectedLevel !== 'all' && drive.volunteerLevel !== selectedLevel) return false;
    return true;
  });

  return (
    <div className="w-full space-y-12" id="impact">
      {/* Section Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#07241c] border border-[#1fd4a4]/30 text-[#1fd4a4] text-xs font-mono mb-3">
          <TreePine className="w-3.5 h-3.5" />
          Action Layer • Plant & Clean
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
          Where the Data Points,{' '}
          <span className="text-[#1fd4a4] font-serif italic text-teal-glow">People Can Help.</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
          Air quality monitoring is incomplete without direct intervention. Connect with grassroots NGOs,
          join targeted evergreen canopy plantation drives, report neighborhood pollution hotspots, and inspect our verified impact ledger.
        </p>
      </div>

      {/* Main Mode Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-2 rounded-2xl glass-panel border border-[#1fd4a4]/20">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab('plantation')}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'plantation'
                ? 'bg-[#07241c] text-[#1fd4a4] border border-[#1fd4a4]/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            6a. Plantation Drives & NGO Finder
          </button>
          <button
            onClick={() => setActiveTab('cleanups')}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'cleanups'
                ? 'bg-[#07241c] text-[#1fd4a4] border border-[#1fd4a4]/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            6b. Clean-Up Missions
          </button>
          <button
            onClick={() => setActiveTab('ledger')}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'ledger'
                ? 'bg-[#07241c] text-[#1fd4a4] border border-[#1fd4a4]/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            6c. Impact Ledger
          </button>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'plantation' && (
            <>
              <button
                onClick={() => setShowSuggestSpotModal(true)}
                className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 hover:border-[#1fd4a4] text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#1fd4a4]" />
                <span>Suggest a Spot</span>
              </button>
              <button
                onClick={() => setShowListDriveModal(true)}
                className="px-3 py-1.5 rounded-lg bg-[#07241c] border border-[#1fd4a4]/40 hover:bg-[#0c3127] text-xs font-mono text-[#1fd4a4] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>List Your Drive (NGO)</span>
              </button>
            </>
          )}

          {activeTab === 'cleanups' && (
            <button
              onClick={() => setShowReportHotspotModal(true)}
              className="px-3.5 py-1.5 rounded-lg bg-[#ff5a3c]/20 border border-[#ff5a3c]/40 text-[#ff5a3c] hover:bg-[#ff5a3c]/30 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Report a Hotspot</span>
            </button>
          )}
        </div>
      </div>

      {/* 6A: PLANTATION DRIVE & NGO FINDER */}
      {activeTab === 'plantation' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-wrap items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/[0.06] text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1 px-2">
              <Filter className="w-3.5 h-3.5 text-[#1fd4a4]" />
              Filter Drives:
            </span>

            <select
              value={selectedCause}
              onChange={(e) => setSelectedCause(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-black border border-white/10 text-slate-200 focus:outline-none focus:border-[#1fd4a4]"
            >
              <option value="all">All Causes</option>
              <option value="green buffers">Green Buffers</option>
              <option value="urban forest">Urban Forest</option>
              <option value="lichen-habitat protection">Lichen Habitat</option>
              <option value="tree planting">Tree Planting</option>
            </select>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-black border border-white/10 text-slate-200 focus:outline-none focus:border-[#1fd4a4]"
            >
              <option value="all">All Skill Levels</option>
              <option value="first-timer">First-Timer Friendly</option>
              <option value="experienced">Experienced Volunteers</option>
            </select>

            <span className="text-[11px] text-slate-500 ml-auto">
              Showing {filteredDrives.length} verified drives
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Interactive Map */}
            <div className="lg:col-span-5 glass-panel p-5 rounded-2xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-mono uppercase text-[#1fd4a4] tracking-wider flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  Priority Planting Cartography
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/50 text-slate-400">
                  AI Prioritized
                </span>
              </div>

              <div className="relative w-full h-[360px] rounded-xl overflow-hidden bg-[#07130e] border border-[#1fd4a4]/20 p-4 flex flex-col justify-between">
                <div className="absolute inset-0 pointer-events-none opacity-20">
                  <svg className="w-full h-full">
                    <defs>
                      <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
                        <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#1fd4a4" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                <div className="absolute top-[28%] left-[24%] p-2 rounded-xl bg-red-950/40 border border-red-500/40 backdrop-blur-sm text-[10px] font-mono text-red-300">
                  <div className="font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                    Priority Zone #1
                  </div>
                  <div>Bio-AQI 84 • Low Canopy (12%)</div>
                </div>

                <div className="absolute bottom-[26%] right-[22%] p-2 rounded-xl bg-[#07241c]/60 border border-[#1fd4a4]/40 backdrop-blur-sm text-[10px] font-mono text-[#1fd4a4]">
                  <div className="font-bold">Priority Zone #2</div>
                  <div>School Corridor • Desired Delta -12 AQI</div>
                </div>

                {filteredDrives.map((d, idx) => (
                  <div
                    key={d.id}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      top: `${35 + idx * 16}%`,
                      left: `${45 + (idx % 2 === 0 ? 12 : -18)}%`,
                    }}
                    title={`${d.title} (${d.ngoName})`}
                  >
                    <div className="w-7 h-7 rounded-full bg-[#07241c] border-2 border-[#1fd4a4] flex items-center justify-center text-[#1fd4a4] shadow-lg shadow-[#1fd4a4]/30 hover:scale-110 transition-transform">
                      <TreePine className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}

                <div className="relative z-10 p-2 rounded-lg bg-black/70 border border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="flex items-center gap-1 text-red-400">● Stress Desert</span>
                  <span className="flex items-center gap-1 text-[#1fd4a4]">● Upcoming Drive</span>
                  <span className="flex items-center gap-1 text-[#8be9ff]">● NGO Base</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 font-mono leading-tight">
                Calculated from high Bio-AQI stress + sparse tree canopy + sensor desert boundaries + proximity to pediatric clinics.
              </div>
            </div>

            {/* Right Drive Cards List */}
            <div className="lg:col-span-7 space-y-4">
              {filteredDrives.map((drive) => {
                const isJoined = joinedDrives.has(drive.id);
                const isSaved = savedDrives.has(drive.id);

                return (
                  <div
                    key={drive.id}
                    className="glass-panel p-5 rounded-2xl space-y-3.5 hover:border-[#1fd4a4]/40 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white font-mono">{drive.ngoName}</span>
                        {drive.isVerified && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#07241c] text-[#1fd4a4] border border-[#1fd4a4]/30">
                            <ShieldCheck className="w-3 h-3" />
                            Verified NGO
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">{drive.distance}</span>
                    </div>

                    <div>
                      <h4 className="text-base font-semibold text-slate-100">{drive.title}</h4>
                      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 mt-1.5">
                        <span className="flex items-center gap-1 text-slate-300">
                          <Calendar className="w-3.5 h-3.5 text-[#1fd4a4]" />
                          {drive.date} ({drive.time})
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-[#8be9ff]" />
                          {drive.volunteersJoined} / {drive.volunteersNeeded} volunteers
                        </span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <Wrench className="w-3.5 h-3.5 text-[#f5a524]" />
                          {drive.toolsProvided ? 'Tools Provided' : 'Bring Own Gloves'}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-black/40 border border-white/[0.05] space-y-1.5 text-xs">
                      <div className="text-[10px] font-mono uppercase text-[#1fd4a4] font-semibold">
                        Recommended Species & Filtration Mechanism:
                      </div>
                      {drive.recommendedSpecies.map((s, idx) => (
                        <div key={idx} className="text-slate-300 font-sans text-xs">
                          <span className="font-semibold text-white">{s.name}</span>{' '}
                          <span className="font-mono text-slate-400 italic">({s.scientificName})</span> —{' '}
                          <span className="text-slate-400">{s.mechanism}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono py-1">
                      <span className="text-slate-400">Estimated Bio-AQI Delta:</span>
                      <span className="text-[#1fd4a4] font-semibold">{drive.estimatedBioAqiDelta}</span>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-2.5">
                      <button
                        onClick={() => toggleJoinDrive(drive.id)}
                        className={`py-2 px-4 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
                          isJoined
                            ? 'bg-[#10b981] text-black font-semibold'
                            : 'bg-[#1fd4a4] hover:bg-[#19b28a] text-black font-semibold'
                        }`}
                      >
                        {isJoined ? 'JOINED DRIVE ✓' : 'JOIN DRIVE'}
                      </button>

                      <button
                        onClick={() => toggleSaveDrive(drive.id)}
                        className={`py-2 px-3 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
                          isSaved
                            ? 'bg-white/10 text-white border-white/30'
                            : 'bg-transparent text-slate-400 hover:text-white border-white/10 hover:border-white/20'
                        }`}
                      >
                        {isSaved ? 'SAVED ★' : 'SAVE'}
                      </button>

                      <a
                        href={`mailto:${drive.contactEmail}`}
                        className="py-2 px-3 rounded-xl text-xs font-mono text-slate-400 hover:text-[#8be9ff] hover:underline transition-colors ml-auto"
                      >
                        Contact NGO →
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 6B: CLEAN-UP MISSIONS */}
      {activeTab === 'cleanups' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Active Neighborhood Hotspot Queue</h3>
              <span className="text-xs font-mono text-slate-400">
                AI categorizes severity and maps localized Bio-stress
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {CLEANUP_HOTSPOTS.map((hotspot) => (
                <div key={hotspot.id} className="glass-panel p-5 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-black/50 text-[#8be9ff] border border-[#8be9ff]/20">
                      {hotspot.category}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        hotspot.status === 'Cleaned'
                          ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30'
                          : hotspot.status === 'Assigned'
                          ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30'
                          : 'bg-amber-950/40 text-[#f5a524] border border-[#f5a524]/30'
                      }`}
                    >
                      {hotspot.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-white">{hotspot.title}</h4>
                    <p className="text-xs font-mono text-slate-400 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#ff5a3c]" />
                      {hotspot.location}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/[0.04] text-[11px] font-mono text-slate-300">
                    <span className="text-slate-500 block text-[9px] uppercase">Modelled Airshed Impact</span>
                    {hotspot.bioAqiContribution}
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500">Reported: {hotspot.reportedDate}</span>
                    <button className="text-[#1fd4a4] hover:underline flex items-center gap-1 cursor-pointer">
                      <span>Start clean-up squad</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Before / After Photo Slider */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
              <div>
                <h4 className="text-base font-semibold text-white">
                  Before & After Interventions: Biological Recovery Inspection
                </h4>
                <p className="text-xs font-mono text-slate-400">
                  South Basin Interceptor • Cleaned September 2026 • Bio-AQI Shift: 86 → 68
                </p>
              </div>
              <span className="text-xs font-mono text-[#1fd4a4]">Slide to compare</span>
            </div>

            <div className="relative w-full h-[320px] rounded-xl overflow-hidden select-none border border-[#1fd4a4]/20">
              <img
                src={CLEANUP_HOTSPOTS[3].afterPhoto}
                alt="After cleanup"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 px-3 py-1 rounded-md bg-black/70 backdrop-blur-md text-xs font-mono text-[#1fd4a4] border border-[#1fd4a4]/40">
                AFTER: Ecological Recovery
              </div>

              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={CLEANUP_HOTSPOTS[3].beforePhoto}
                  alt="Before cleanup"
                  className="w-full h-full object-cover max-w-none"
                  style={{ width: '100%', minWidth: '800px' }}
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-black/70 backdrop-blur-md text-xs font-mono text-red-400 border border-red-500/40">
                  BEFORE: Blocked Drainage Eddy
                </div>
              </div>

              <div
                className="absolute top-0 bottom-0 w-0.5 bg-[#1fd4a4] shadow-lg shadow-[#1fd4a4]"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#07241c] border-2 border-[#1fd4a4] flex items-center justify-center text-[10px] text-white">
                  ⟷
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(parseFloat(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
              />
            </div>
          </div>

          {/* Simple Clean Air Actions Checklist */}
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <h4 className="text-base font-semibold text-white">Individual Clean Air Actions Checklist</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CLEAN_AIR_ACTIONS.map((action) => (
                <div key={action.id} className="p-4 rounded-xl bg-black/40 border border-white/[0.05] space-y-1.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#1fd4a4] shrink-0" />
                    <span className="text-xs font-semibold text-white">{action.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{action.mechanism}</p>
                  <div className="text-[10px] font-mono text-[#8be9ff] pt-1">{action.impact}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6C: IMPACT LEDGER */}
      {activeTab === 'ledger' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <div>
              <h3 className="text-lg font-semibold text-white">Verified Impact Ledger</h3>
              <p className="text-xs text-slate-400 font-mono">
                All statistics are labelled as reported or estimated with explicit uncertainty bands.
              </p>
            </div>
            <span className="text-xs font-mono text-[#1fd4a4]">Audited by Sensor Mesh</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.entries(IMPACT_LEDGER_STATS).map(([key, stat]) => (
              <div key={key} className="glass-panel p-5 rounded-2xl space-y-1 text-center">
                <div className="text-3xl font-mono font-bold text-white tracking-tight">
                  {stat.value.toLocaleString()}
                </div>
                <div className="text-xs font-semibold text-slate-200 mt-1">{stat.label}</div>
                <div className="text-[10px] font-mono text-[#1fd4a4] uppercase pt-1">
                  [{stat.type}]
                </div>
                <div className="text-[10px] font-mono text-slate-500 pt-0.5">
                  {stat.uncertainty}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-[#1fd4a4]/20 flex items-start gap-3">
            <Info className="w-4 h-4 text-[#1fd4a4] shrink-0 mt-0.5" />
            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              Modelled air-quality improvements reflect Bayesian post-canopy inversion attenuation curves calculated from 142 continuous epiphytic test nodes over an 18-month duration. No claims of complete mitigation are made.
            </p>
          </div>
        </div>
      )}

      {/* SUGGEST A SPOT MODAL */}
      {showSuggestSpotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-md w-full glass-panel p-6 rounded-2xl border border-[#1fd4a4]/40 space-y-4">
            <h3 className="text-base font-semibold text-white">Suggest a Planting Location</h3>
            <p className="text-xs text-slate-400 font-sans">
              The AI will analyze local Bio-AQI stress, road proximity, and space suitability before routing to partner NGOs.
            </p>

            <input
              type="text"
              placeholder="Enter street, intersection or landmark..."
              value={suggestedAddress}
              onChange={(e) => setSuggestedAddress(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-[#1fd4a4]"
            />

            {suggestedResult ? (
              <div className="p-3 rounded-xl bg-[#07241c] border border-[#1fd4a4]/40 text-xs font-mono text-[#1fd4a4] space-y-1">
                <div>✓ Suitability Analysis Complete: High Priority</div>
                <div className="text-[11px] text-slate-300">
                  Zone Stress: 82 • Nearest school: 320m • Routed to Canopy Continuum
                </div>
              </div>
            ) : null}

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setShowSuggestSpotModal(false);
                  setSuggestedResult(false);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => setSuggestedResult(true)}
                className="px-4 py-1.5 rounded-lg text-xs font-mono font-medium bg-[#1fd4a4] text-black hover:bg-[#19b28a] cursor-pointer"
              >
                Evaluate & Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LIST YOUR DRIVE MODAL */}
      {showListDriveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-md w-full glass-panel p-6 rounded-2xl border border-[#1fd4a4]/40 space-y-4">
            <h3 className="text-base font-semibold text-white">List Your Drive (NGO Onboarding)</h3>
            <p className="text-xs text-slate-400 font-sans">
              Connect your verified organization to our hyper-local sensor network.
            </p>

            <div className="space-y-2.5 text-xs font-mono">
              <input
                type="text"
                placeholder="NGO / Community Group Name"
                className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#1fd4a4]"
              />
              <input
                type="text"
                placeholder="Drive Title (e.g. Pine Canopy Expansion)"
                className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#1fd4a4]"
              />
              <input
                type="email"
                placeholder="Official Verification Email"
                className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#1fd4a4]"
              />
            </div>

            {listDriveSuccess && (
              <div className="p-3 rounded-xl bg-[#07241c] border border-[#1fd4a4]/40 text-xs font-mono text-[#1fd4a4]">
                ✓ Drive submitted for Bio-Airshed suitability review!
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setShowListDriveModal(false);
                  setListDriveSuccess(false);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => setListDriveSuccess(true)}
                className="px-4 py-1.5 rounded-lg text-xs font-mono font-medium bg-[#1fd4a4] text-black hover:bg-[#19b28a] cursor-pointer"
              >
                Publish Drive
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REPORT A HOTSPOT MODAL */}
      {showReportHotspotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-md w-full glass-panel p-6 rounded-2xl border border-[#ff5a3c]/40 space-y-4">
            <h3 className="text-base font-semibold text-white">Report an Air Pollution Hotspot</h3>
            <p className="text-xs text-slate-400 font-sans">
              Upload photos and tag the category. AI will assess severity and correlate with Bio-AQI readings.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-mono text-[10px] block mb-1">CATEGORY</label>
                <select
                  value={hotspotCategory}
                  onChange={(e) => setHotspotCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-white font-mono focus:outline-none focus:border-[#ff5a3c]"
                >
                  <option value="open waste burning">Open waste burning</option>
                  <option value="dust/construction debris">Dust / Construction debris</option>
                  <option value="blocked drains">Blocked drains & biogas</option>
                  <option value="idling traffic">Heavy idling traffic</option>
                  <option value="illegal dumping">Illegal dumping</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 font-mono text-[10px] block mb-1">LOCATION DESCRIPTION</label>
                <input
                  type="text"
                  placeholder="Exact street corner or building reference..."
                  value={hotspotLocation}
                  onChange={(e) => setHotspotLocation(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#ff5a3c]"
                />
              </div>

              <div className="p-4 rounded-xl border border-dashed border-white/20 text-center font-mono text-[11px] text-slate-400 hover:border-[#1fd4a4] cursor-pointer">
                [ Click or drag photo evidence here ]
              </div>
            </div>

            {hotspotReportSuccess && (
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-xs font-mono text-red-300">
                ✓ Hotspot reported! AI severity auto-tagged: High. Integrated with Bio-Mesh overlay.
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setShowReportHotspotModal(false);
                  setHotspotReportSuccess(false);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => setHotspotReportSuccess(true)}
                className="px-4 py-1.5 rounded-lg text-xs font-mono font-medium bg-[#ff5a3c] text-white hover:bg-[#e0482c] cursor-pointer"
              >
                Dispatch Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
