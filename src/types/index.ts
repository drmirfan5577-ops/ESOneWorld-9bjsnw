export type ThemeId = 'crystal' | 'emerald' | 'crimson' | 'arctic' | 'holographic' | 'golden' | 'nebula';
export type DisplayMode = 'super-bright' | 'milky-white' | 'semi-transparent' | 'holographic';
export type Language = 'en' | 'ur' | 'ar';
export type TabId = 'home' | 'guests' | 'global' | 'esmart' | 'paradise' | 'esonewworld';

export interface Theme {
  id: ThemeId;
  name: string;
  nameUr: string;
  bgClass: string;
  liveBgClass: string;
  accentColor: string;
  accentHex: string;
  description: string;
  gradient: string;
}

export interface AppItem {
  id: string;
  name: string;
  nameUr?: string;
  icon: string;
  url: string;
  category: string;
  color: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'me' | 'other';
  time: string;
  status?: 'sent' | 'delivered' | 'read';
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

export interface QuranSurah {
  number: number;
  name: string;
  nameArabic: string;
  nameUrdu: string;
  verses: number;
  type: 'Meccan' | 'Medinan';
}

export interface AdminSettings {
  password: string;
  appName: string;
  tagline: string;
  activeTheme: ThemeId;
  displayMode: DisplayMode;
  language: Language;
  enabledTabs: TabId[];
  tabOrder: TabId[];
  enabledFeatures: Record<string, boolean>;
  contacts: { email: string; label: string }[];
  integrations: Record<string, boolean>;
}
