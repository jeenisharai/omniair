export interface SensorReading {
  aqi: number;
  stressIntensity: 'Low' | 'Moderate' | 'High' | 'Severe';
  dominantPollutant: string;
  confidence: number;
  treeAQI: number;
  officialAQI: number;
  timestamp: string;
  confidenceBand: string;
  temp: number;
  humidity: number;
  windSpeed: number;
  trafficIndex: number;
}

export interface LogicClause {
  id: string;
  clauseNumber: string;
  name: string;
  condition: string;
  consequence: string;
  weight: number;
  active: boolean;
  explanation: string;
  signalOrigin: string;
  biologicalMechanism: string;
}

export interface HardwarePart {
  id: string;
  name: string;
  powerDraw: string;
  signalType: string;
  role: string;
  details: string;
  position: [number, number, number];
}

export interface MapOverlaySettings {
  showIncome: boolean;
  showSchools: boolean;
  showHospitals: boolean;
  showTraffic: boolean;
  showGovDeserts: boolean;
}

export interface CitizenReport {
  id: string;
  timestamp: string;
  location: string;
  observation: string;
  category: 'Haze' | 'Smell' | 'Burning' | 'Dust' | 'Traffic' | 'Other';
  status: 'Integrated' | 'Validating';
  confidenceNudge: string;
}

export interface AccountabilityLogEntry {
  id: string;
  timestamp: string;
  action: string;
  zone: string;
  confidence: number;
  status: 'ACCEPTED' | 'DISMISSED' | 'PENDING' | 'EXECUTED';
  rationale: string;
}

export interface PlantationDrive {
  id: string;
  ngoName: string;
  isVerified: boolean;
  title: string;
  date: string;
  time: string;
  distance: string;
  zone: string;
  lat: number;
  lon: number;
  volunteersJoined: number;
  volunteersNeeded: number;
  toolsProvided: boolean;
  toolDetails: string;
  recommendedSpecies: {
    name: string;
    scientificName: string;
    mechanism: string;
  }[];
  estimatedBioAqiDelta: string;
  cause: 'tree planting' | 'green buffers' | 'urban forest' | 'lichen-habitat protection' | 'community clean-up';
  volunteerLevel: 'first-timer' | 'experienced' | 'all levels';
  isFamilyFriendly: boolean;
  isFree: boolean;
  contactEmail: string;
}

export interface CleanUpHotspot {
  id: string;
  title: string;
  location: string;
  lat: number;
  lon: number;
  category: 'open waste burning' | 'dust/construction debris' | 'blocked drains' | 'idling traffic' | 'illegal dumping';
  severity: 'Moderate' | 'High' | 'Critical';
  status: 'Reported' | 'Verified' | 'Assigned' | 'Cleaned';
  reportedDate: string;
  bioAqiContribution: string;
  beforePhoto: string;
  afterPhoto?: string;
  volunteersEnlisted?: number;
}
