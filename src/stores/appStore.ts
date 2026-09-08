import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeId, Language, TabId, AdminSettings } from '@/types';

interface AppState {
  // Current navigation
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;

  // Sidebars
  leftSidebarOpen: boolean;
  rightSidebarOpen: boolean;
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
  closeBothSidebars: () => void;

  // Theme
  activeTheme: ThemeId;
  setActiveTheme: (theme: ThemeId) => void;
  liveAnimations: boolean;
  toggleLiveAnimations: () => void;

  // Language
  language: Language;
  setLanguage: (lang: Language) => void;

  // Admin Panel
  adminPanelOpen: boolean;
  adminAuthenticated: boolean;
  openAdminPanel: () => void;
  closeAdminPanel: () => void;
  authenticateAdmin: (password: string) => boolean;
  logoutAdmin: () => void;

  // Admin Settings
  adminSettings: AdminSettings;
  updateAdminSettings: (settings: Partial<AdminSettings>) => void;

  // Display mode brightness
  brightness: number;
  setBrightness: (val: number) => void;

  // OTP Registration
  registrationOpen: boolean;
  setRegistrationOpen: (open: boolean) => void;

  // Browser URL (UniBrowser)
  browserUrl: string;
  setBrowserUrl: (url: string) => void;
}

const DEFAULT_ADMIN_SETTINGS: AdminSettings = {
  password: "@1122#",
  appName: "ES OneWorld",
  tagline: "Global Family Platform",
  activeTheme: "crystal",
  displayMode: "super-bright",
  language: "en",
  enabledTabs: ["home", "guests", "global", "esmart", "paradise", "esonewworld"],
  tabOrder: ["home", "guests", "global", "esmart", "paradise", "esonewworld"],
  enabledFeatures: {
    liveAnimations: true,
    ticker: true,
    bismillah: true,
    islamicContent: true,
    voiceCalls: true,
    videoCalls: true,
    liveStreaming: true,
    mediaSharing: true,
  },
  contacts: [
    { email: "Admin@drirfan.online", label: "Admin" },
    { email: "Contact@drirfan.online", label: "Contact" },
    { email: "Support@drirfan.online", label: "Support" },
  ],
  integrations: {
    youtube: true, whatsapp: true, facebook: true, twitterX: true, tiktok: true,
    instagram: true, telegram: true, netlify: true, github: true, vercel: true,
    firebase: true, supabase: true, cloudflare: true, chatgpt: true, gemini: true,
    claude: true, perplexity: true, zoho: true, wordpress: true,
  },
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      activeTab: "home",
      setActiveTab: (tab) => set({ activeTab: tab }),

      leftSidebarOpen: false,
      rightSidebarOpen: false,
      toggleLeftSidebar: () => set((s) => ({
        leftSidebarOpen: !s.leftSidebarOpen,
        rightSidebarOpen: false,
      })),
      toggleRightSidebar: () => set((s) => ({
        rightSidebarOpen: !s.rightSidebarOpen,
        leftSidebarOpen: false,
      })),
      closeBothSidebars: () => set({ leftSidebarOpen: false, rightSidebarOpen: false }),

      activeTheme: "crystal",
      setActiveTheme: (theme) => set({ activeTheme: theme }),
      liveAnimations: true,
      toggleLiveAnimations: () => set((s) => ({ liveAnimations: !s.liveAnimations })),

      language: "en",
      setLanguage: (lang) => set({ language: lang }),

      adminPanelOpen: false,
      adminAuthenticated: false,
      openAdminPanel: () => set({ adminPanelOpen: true }),
      closeAdminPanel: () => set({ adminPanelOpen: false }),
      authenticateAdmin: (password) => {
        const { adminSettings } = get();
        const correct = password === adminSettings.password;
        if (correct) set({ adminAuthenticated: true });
        return correct;
      },
      logoutAdmin: () => set({ adminAuthenticated: false }),

      adminSettings: DEFAULT_ADMIN_SETTINGS,
      updateAdminSettings: (settings) => set((s) => ({
        adminSettings: { ...s.adminSettings, ...settings },
      })),

      brightness: 100,
      setBrightness: (val) => set({ brightness: val }),

      registrationOpen: false,
      setRegistrationOpen: (open) => set({ registrationOpen: open }),

      browserUrl: "https://www.google.com",
      setBrowserUrl: (url) => set({ browserUrl: url }),
    }),
    {
      name: "esonewworld-store",
      partialize: (state) => ({
        activeTheme: state.activeTheme,
        language: state.language,
        liveAnimations: state.liveAnimations,
        adminSettings: state.adminSettings,
        brightness: state.brightness,
        browserUrl: state.browserUrl,
      }),
    }
  )
);
