import { useAppStore } from "@/stores/appStore";
import { THEMES } from "@/constants/themes";
import { HOSTING_APPS, SOCIAL_MEDIA_APPS, CONTACTS_INFO } from "@/constants/apps";
import { LANGUAGES } from "@/constants/languages";

export default function RightSidebar() {
  const {
    rightSidebarOpen, toggleRightSidebar, activeTheme,
    language, setLanguage, liveAnimations, toggleLiveAnimations,
    brightness, setBrightness, openAdminPanel,
  } = useAppStore();
  const theme = THEMES.find(t => t.id === activeTheme) || THEMES[0];
  const t = LANGUAGES[language];

  return (
    <>
      {/* Backdrop */}
      {rightSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={toggleRightSidebar}
        />
      )}

      {/* Panel */}
      <div
        className={`sidebar-panel right-0 z-50 transition-transform duration-300 ${
          rightSidebarOpen ? "translate-x-0 animate-slide-in-right" : "translate-x-full"
        }`}
        style={{ boxShadow: "-4px 0 40px rgba(0,0,0,0.12)", width: 260 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/60">
          <button
            onClick={toggleRightSidebar}
            className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 text-sm transition-colors"
          >
            ✕
          </button>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm" style={{ color: theme.accentHex }}>Right Panel</span>
            <span className="text-xl">⭐</span>
          </div>
        </div>

        <div className="panel-scroll flex-1 p-3">
          {/* Language Switch */}
          <div className="mb-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Language</div>
            <div className="flex gap-2">
              {(["en", "ur", "ar"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-semibold border-2 transition-all duration-200 ${
                    language === lang
                      ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                      : "border-gray-200 bg-white/80 text-gray-600 hover:border-emerald-200"
                  }`}
                >
                  {lang === "en" ? "🇬🇧 EN" : lang === "ur" ? "🇵🇰 اردو" : "🇸🇦 عربی"}
                </button>
              ))}
            </div>
          </div>

          {/* Brightness */}
          <div className="mb-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
              Brightness ☀️
            </div>
            <input
              type="range"
              min={60}
              max={120}
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{ accentColor: theme.accentHex }}
            />
            <div className="flex justify-between text-[9px] text-gray-400 mt-1">
              <span>Dim</span>
              <span>Normal</span>
              <span>Super Bright</span>
            </div>
          </div>

          {/* Live Animations */}
          <div className="mb-4">
            <div className="flex items-center justify-between px-1">
              <div>
                <div className="text-xs font-semibold text-gray-700">Live Animations</div>
                <div className="text-[10px] text-gray-400">Dynamic background effects</div>
              </div>
              <button
                onClick={toggleLiveAnimations}
                className={`w-10 h-6 rounded-full transition-all duration-300 relative ${
                  liveAnimations ? "bg-emerald-400" : "bg-gray-300"
                }`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${
                  liveAnimations ? "left-5" : "left-1"
                }`} />
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
            Social Media
          </div>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {SOCIAL_MEDIA_APPS.slice(0, 8).map((app) => (
              <a
                key={app.id}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/70 hover:bg-white/95 border border-white/80 transition-all duration-200"
              >
                <span className="text-lg">{app.icon}</span>
                <span className="text-[8px] text-gray-600 text-center leading-tight">{app.name}</span>
              </a>
            ))}
          </div>

          {/* Integrations */}
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
            Integrations
          </div>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {HOSTING_APPS.slice(0, 8).map((app) => (
              <a
                key={app.id}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/70 hover:bg-white/95 border border-white/80 transition-all duration-200"
              >
                <span className="text-lg">{app.icon}</span>
                <span className="text-[8px] text-gray-600 text-center leading-tight">{app.name}</span>
              </a>
            ))}
          </div>

          {/* Admin Panel Button */}
          <button
            onClick={() => { toggleRightSidebar(); openAdminPanel(); }}
            className="w-full py-2.5 rounded-2xl font-bold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{
              background: `linear-gradient(135deg, ${theme.accentHex}, ${theme.accentHex}bb)`,
              boxShadow: `0 4px 16px ${theme.accentHex}44`
            }}
          >
            🔐 Admin Panel
          </button>

          {/* Contact */}
          <div className="mt-4 pt-3 border-t border-white/60">
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Contact</div>
            {CONTACTS_INFO.slice(0, 3).map((c) => (
              <a key={c.email} href={`mailto:${c.email}`} className="block text-[10px] text-emerald-700 hover:underline mb-0.5">
                {c.label}: {c.email}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
