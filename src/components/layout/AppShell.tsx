import { useAppStore } from "@/stores/appStore";
import { THEMES } from "@/constants/themes";
import TopBar from "./TopBar";
import BottomNav from "./BottomNav";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import AdminPanel from "@/components/admin/AdminPanel";
import RegistrationModal from "@/components/features/RegistrationModal";
import UniBrowser from "@/pages/home/UniBrowser";
import GuestRoom from "@/pages/guests/GuestRoom";
import GlobalPage from "@/pages/global/GlobalPage";
import ESmartPage from "@/pages/esmart/ESmartPage";
import ParadisePage from "@/pages/paradise/ParadisePage";
import ESOneWorldPage from "@/pages/esonewworld/ESOneWorldPage";

export default function AppShell() {
  const { activeTab, activeTheme, liveAnimations, brightness } = useAppStore();
  const theme = THEMES.find(t => t.id === activeTheme) || THEMES[0];

  const bgClass = liveAnimations ? theme.liveBgClass : theme.bgClass;

  return (
    <div
      className={`h-dvh w-screen flex flex-col overflow-hidden relative ${bgClass}`}
      style={{ filter: `brightness(${brightness / 100})` }}
    >
      {/* Glassmorphic overlay for crystal effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at top, rgba(255,255,255,0.4) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      {/* Decorative floating orbs */}
      <div
        className="absolute top-1/4 -left-16 w-48 h-48 rounded-full pointer-events-none opacity-20 animate-float"
        style={{ background: `radial-gradient(circle, ${theme.accentHex}44, transparent)`, zIndex: 0 }}
      />
      <div
        className="absolute bottom-1/3 -right-16 w-40 h-40 rounded-full pointer-events-none opacity-15 animate-float"
        style={{ background: `radial-gradient(circle, ${theme.accentHex}33, transparent)`, animationDelay: "1.5s", zIndex: 0 }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <TopBar />

        <div className="flex-1 min-h-0 relative">
          <div className="h-full">
            {activeTab === "home" && <UniBrowser />}
            {activeTab === "guests" && <GuestRoom />}
            {activeTab === "global" && <GlobalPage />}
            {activeTab === "esmart" && <ESmartPage />}
            {activeTab === "paradise" && <ParadisePage />}
            {activeTab === "esonewworld" && <ESOneWorldPage />}
          </div>
        </div>

        <BottomNav />
      </div>

      {/* Sidebars */}
      <LeftSidebar />
      <RightSidebar />

      {/* Modals */}
      <AdminPanel />
      <RegistrationModal />
    </div>
  );
}
