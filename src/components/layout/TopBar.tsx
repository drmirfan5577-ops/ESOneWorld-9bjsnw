import { useAppStore } from "@/stores/appStore";
import { LANGUAGES } from "@/constants/languages";
import { THEMES } from "@/constants/themes";
import { NEWS_TICKER_ITEMS } from "@/constants/apps";
import { useEffect, useState } from "react";

const TABS = [
  { id: "home", label: "🏠", labelEn: "Home" },
  { id: "guests", label: "👥", labelEn: "Guests" },
  { id: "global", label: "🌍", labelEn: "Global" },
  { id: "esmart", label: "⚡", labelEn: "E-Smart" },
  { id: "paradise", label: "🕌", labelEn: "Paradise" },
  { id: "esonewworld", label: "⭐", labelEn: "ESOneWorld" },
];

export default function TopBar() {
  const {
    language, activeTheme, leftSidebarOpen, rightSidebarOpen,
    toggleLeftSidebar, toggleRightSidebar, openAdminPanel,
  } = useAppStore();
  const t = LANGUAGES[language];
  const theme = THEMES.find(th => th.id === activeTheme) || THEMES[0];

  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const dateStr = now.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="relative z-30 flex-shrink-0">
      {/* Main top bar */}
      <div
        className="flex items-center justify-between px-3 py-2 border-b"
        style={{
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(20px)",
          borderColor: "rgba(255,255,255,0.8)",
          boxShadow: "0 2px 20px rgba(0,0,0,0.06)"
        }}
      >
        {/* Left Star */}
        <button
          onClick={toggleLeftSidebar}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 text-lg ${
            leftSidebarOpen
              ? "bg-emerald-100 shadow-glow scale-110"
              : "bg-white/80 hover:bg-emerald-50"
          }`}
          style={{
            boxShadow: leftSidebarOpen ? "0 0 16px rgba(0,200,150,0.5)" : "0 2px 8px rgba(0,0,0,0.08)"
          }}
          title="Left Sidebar"
        >
          ⭐
        </button>

        {/* Center: Logo + Time */}
        <div className="flex items-center gap-2 flex-1 justify-center">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold text-white shadow-glow flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${theme.accentHex}, ${theme.accentHex}aa)` }}
            >
              ES
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold leading-none" style={{ color: theme.accentHex }}>
                ES OneWorld
              </div>
              <div className="text-[10px] text-gray-500 leading-none mt-0.5">Global Family Platform</div>
            </div>
          </div>

          {/* Clock */}
          <div className="hidden md:flex flex-col items-end ml-4">
            <div className="text-xs font-mono font-semibold text-gray-700">{timeStr}</div>
            <div className="text-[10px] text-gray-400">{dateStr}</div>
          </div>
        </div>

        {/* Right Star */}
        <button
          onClick={toggleRightSidebar}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 text-lg ${
            rightSidebarOpen
              ? "bg-red-100 scale-110"
              : "bg-white/80 hover:bg-red-50"
          }`}
          style={{
            boxShadow: rightSidebarOpen ? "0 0 16px rgba(232,0,61,0.5)" : "0 2px 8px rgba(0,0,0,0.08)"
          }}
          title="Right Sidebar"
        >
          ⭐
        </button>
      </div>

      {/* Bismillah Strip */}
      <div
        className="py-1.5 px-4 flex items-center justify-center gap-2 border-b"
        style={{
          background: "linear-gradient(90deg, rgba(0,200,150,0.08), rgba(255,255,255,0.95), rgba(232,0,61,0.08))",
          borderColor: "rgba(0,200,150,0.15)"
        }}
      >
        <span className="font-arabic text-sm font-bold" style={{ color: "#007A5A", textShadow: "0 0 8px rgba(0,200,150,0.4)" }}>
          {t.bismillah}
        </span>
      </div>

      {/* News Ticker */}
      <div
        className="py-1 overflow-hidden border-b"
        style={{
          background: "linear-gradient(90deg, rgba(232,0,61,0.12), rgba(255,255,255,0.9), rgba(232,0,61,0.12))",
          borderColor: "rgba(232,0,61,0.15)"
        }}
      >
        <div className="ticker-text text-xs font-semibold" style={{ color: "#C80030", textShadow: "0 0 6px rgba(232,0,61,0.3)" }}>
          {NEWS_TICKER_ITEMS.join("  ·  ")}
        </div>
      </div>
    </div>
  );
}
