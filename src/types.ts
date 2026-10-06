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
  condition: string;
  consequence: string;
  weight: number;
  active: boolean;
  explanation: string;
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

