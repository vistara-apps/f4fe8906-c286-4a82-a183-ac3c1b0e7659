export interface User {
  userId: string;
  farcasterId?: string;
  currentLocation?: string;
  savedStates: string[];
  subscriptionStatus: 'free' | 'premium';
  trustedContacts: TrustedContact[];
}

export interface TrustedContact {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

export interface StateLaw {
  stateAbbreviation: string;
  title: string;
  summary: string;
  rights: string[];
  prohibitedActions: string[];
}

export interface Script {
  scriptId: string;
  title: string;
  scenario: string;
  englishText: string;
  spanishText: string;
  relatedLaws: string[];
}

export interface Encounter {
  encounterId: string;
  userId: string;
  timestamp: Date;
  location: string;
  scriptUsed?: string;
  recordingUrl?: string;
  notes: string;
  sharedWith: string[];
}

export type ScenarioType = 'traffic-stop' | 'questioning' | 'search' | 'arrest' | 'general';
export type Language = 'en' | 'es';
