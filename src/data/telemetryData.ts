import type { SensorReading, AccountabilityLogEntry, CitizenReport } from '../types';

export const CURRENT_TELEMETRY: SensorReading = {
  aqi: 78,
  stressIntensity: 'High',
  dominantPollutant: 'NO₂ + PM₂.₅ dominant',
  confidence: 91,
  treeAQI: 78,
  officialAQI: 62,
  timestamp: '2026-10-05 17:15:32 UTC',
  confidenceBand: '±4%',
  temp: 22.4,
  humidity: 68,
  windSpeed: 1.6, // low wind
  trafficIndex: 84, // heavy congestion
};

export const SENSOR_STREAMS = [
  {
    id: 'stream-impedance',
    name: 'Cortex Bio-Impedance',
    sensorType: 'Graphene Micro-Filament (10 kHz AC)',
    currentValue: '142.8 kΩ',
    baseline: '110.0 kΩ',
    delta: '+29.8%',
    status: 'NORMAL' as const,
    sparkline: [110, 114, 118, 122, 128, 134, 139, 142.8],
    detail: 'Reflects acidic micro-droplet accumulation across fungal thallus.',
  },
  {
    id: 'stream-piezo',
    name: 'Acoustic Piezo Resonance',
    sensorType: 'Sub-harmonic Piezoelectric Cantilever',
    currentValue: '38.4 kHz',
    baseline: '40.0 kHz',
    delta: '-1.6 kHz',
    status: 'NORMAL' as const,
    sparkline: [40.0, 39.8, 39.6, 39.2, 38.9, 38.7, 38.5, 38.4],
    detail: 'Particulate mass loading dampens resonant thallus oscillations.',
  },
  {
    id: 'stream-ultrasonic',
    name: 'Ultrasonic Echo Delay',
    sensorType: 'Epiphytic Acoustic Pulse Array',
    currentValue: '48.2 μs',
    baseline: '36.0 μs',
    delta: '+33.8%',
    status: 'AI RECONSTRUCTING' as const,
    sparkline: [36.0, 37.2, 38.5, 41.0, 44.2, 46.0, 47.5, 48.2],
    detail: 'Dense aerosol column delays time-of-flight; node reconstructing missing packet burst.',
  },
  {
    id: 'stream-humidity',
    name: 'Micro-Canopy Psychrometer',
    sensorType: 'Relative Humidity & Leaf Wetness',
    currentValue: '76.4 %RH',
    baseline: '60.0 %RH',
    delta: '+27.3%',
    status: 'HIGH LATENCY' as const,
    sparkline: [60, 62, 65, 68, 71, 74, 75, 76.4],
    detail: 'Waiting for gateway handshake across 868 MHz LoRa mesh repeaters.',
  },
];

export const INITIAL_ACCOUNTABILITY_LOG: AccountabilityLogEntry[] = [
  {
    id: 'acc-1',
    timestamp: '17:10:04 UTC',
    action: 'Reduce highway idling advisory transmitted',
    zone: 'East Highway Corridor (KM 14–18)',
    confidence: 92,
    status: 'ACCEPTED',
    rationale: 'Stagnant boundary wind + diesel soot spike triggered Tsetlin clause #01.',
  },
  {
    id: 'acc-2',
    timestamp: '16:45:18 UTC',
    action: 'Dynamic schoolyard outdoor recess alert',
    zone: 'Midtown Elementary Perimeter',
    confidence: 89,
    status: 'EXECUTED',
    rationale: 'Thermal inversion trapped ground-level NO₂ exceeded 45 μg/m³ threshold.',
  },
  {
    id: 'acc-3',
    timestamp: '15:20:55 UTC',
    action: 'Freight arterial signal timing metering',
    zone: 'Industrial Harbor Bypass',
    confidence: 94,
    status: 'ACCEPTED',
    rationale: 'Autonomous micro-calming diverted 18% freight volume around residential basin.',
  },
  {
    id: 'acc-4',
    timestamp: '14:02:11 UTC',
    action: 'Ventilation intake shutter protocol',
    zone: 'North Hill Hospital Ward 4',
    confidence: 86,
    status: 'DISMISSED',
    rationale: 'Manual override by facility manager; HEPA filtration already at stage 3.',
  },
];

export const INITIAL_CITIZEN_REPORTS: CitizenReport[] = [
  {
    id: 'rep-1',
    timestamp: '17:04 UTC',
    location: 'Underpass at 4th Ave & Expressway',
    observation: 'Heavy diesel exhaust accumulation, acrid smell settling near pedestrian steps.',
    category: 'Smell',
    status: 'Integrated',
    confidenceNudge: '+1.8% to Clause #01',
  },
  {
    id: 'rep-2',
    timestamp: '16:32 UTC',
    location: 'Midtown Park North Gate',
    observation: 'Low grey haze visible under tree line, very little air movement.',
    category: 'Haze',
    status: 'Integrated',
    confidenceNudge: '+2.4% to Inversion Vector',
  },
];
