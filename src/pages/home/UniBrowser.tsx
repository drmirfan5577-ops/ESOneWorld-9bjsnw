import { useState, useRef } from "react";
import { useAppStore } from "@/stores/appStore";
import { THEMES } from "@/constants/themes";
import { SOCIAL_MEDIA_APPS, AI_APPS, HOSTING_APPS, WEBSITE_APPS } from "@/constants/apps";
import { LANGUAGES } from "@/constants/languages";

const HUB_CATEGORIES = [
  { id: "all", label: "All", icon: "🌍" },
  { id: "ai", label: "AI Hub", icon: "🤖" },
  { id: "social", label: "Social Hub", icon: "💬" },
  { id: "website", label: "Web Hub", icon: "🌐" },
  { id: "hosting", label: "Dev Hub", icon: "⚙️" },
];

const ALL_APPS = [
  ...SOCIAL_MEDIA_APPS,
  ...AI_APPS,
  ...WEBSITE_APPS,
  ...HOSTING_APPS,
];

export default function UniBrowser() {
  const { browserUrl, setBrowserUrl, activeTheme, language } = useAppStore();
  const [inputUrl, setInputUrl] = useState(browserUrl);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showBrowser, setShowBrowser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const theme = THEMES.find(t => t.id === activeTheme) || THEMES[0];
  const t = LANGUAGES[language];

  const filteredApps = activeCategory === "all"
    ? ALL_APPS
    : ALL_APPS.filter(a => a.category === activeCategory);

  const navigateTo = (url: string) => {
    let finalUrl = url;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      if (url.includes(".") && !url.includes(" ")) {
        finalUrl = "https://" + url;
      } else {
        finalUrl = "https://www.google.com/search?q=" + encodeURIComponent(url);
      }
    }
    setBrowserUrl(finalUrl);
    setInputUrl(finalUrl);
    setShowBrowser(true);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo(inputUrl);
  };

  return (
    <div className="page-container">
      {/* Search Bar */}
      <div className="px-3 py-2 flex-shrink-0">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder={t.search}
            className="w-full pl-10 pr-16 py-2.5 rounded-2xl text-sm font-medium border-2 outline-none transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.92)",
              borderColor: "rgba(255,255,255,0.9)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06), inset 0 1px 3px rgba(0,0,0,0.03)",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = theme.accentHex + "88";
              e.target.style.boxShadow = `0 0 0 3px ${theme.accentHex}22, 0 2px 12px rgba(0,0,0,0.06)`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(255,255,255,0.9)";
              e.target.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06), inset 0 1px 3px rgba(0,0,0,0.03)";
            }}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base">🔍</span>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
            <button type="button" className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm transition-colors" title="Voice">🎙️</button>
            <button type="button" className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm transition-colors" title="Camera">📷</button>
          </div>
        </form>
      </div>

      {showBrowser ? (
        /* Browser Frame */
        <div className="flex-1 flex flex-col min-h-0">
          {/* Browser Controls */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/80 border-b border-gray-100">
            <button onClick={() => setShowBrowser(false)} className="text-xs text-gray-500 hover:text-red-500 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors">← Back</button>
            <button onClick={() => setShowBrowser(false)} className="text-xs text-gray-500 hover:text-red-500 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors" title="Close">✕ Close</button>
            {isLoading && <div className="ml-2 w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />}
            <span className="ml-auto text-[10px] text-gray-400 truncate max-w-[180px]">{browserUrl}</span>
          </div>
          {isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 border-4 rounded-full animate-spin" style={{ borderColor: `${theme.accentHex}44`, borderTopColor: theme.accentHex }} />
              <div className="text-sm text-gray-500">Loading...</div>
            </div>
          ) : (
            <iframe
              src={browserUrl}
              className="flex-1 w-full border-none"
              title="UniBrowser"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-navigation"
              onLoad={() => setIsLoading(false)}
            />
          )}
        </div>
      ) : (
        /* App Grid */
        <div className="flex-1 flex flex-col min-h-0">
          {/* Category Tabs */}
          <div className="flex gap-2 px-3 pb-2 overflow-x-auto flex-shrink-0" style={{ scrollbarWidth: "none" }}>
            {HUB_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-semibold whitespace-nowrap border-2 transition-all duration-200 flex-shrink-0 ${
                  activeCategory === cat.id
                    ? "text-white border-transparent shadow-glow"
                    : "bg-white/80 border-white/80 text-gray-600 hover:border-emerald-200"
                }`}
                style={activeCategory === cat.id ? {
                  background: `linear-gradient(135deg, ${theme.accentHex}, ${theme.accentHex}bb)`,
                  boxShadow: `0 4px 12px ${theme.accentHex}44`
                } : {}}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Apps Grid */}
          <div className="flex-1 panel-scroll px-3 pb-3">
            <div className="apps-grid">
              {filteredApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => navigateTo(app.url)}
                  className="app-icon"
                >
                  <div
                    className="app-icon-inner"
                    style={{
                      background: `linear-gradient(135deg, white, ${app.color}18)`,
                      borderColor: `${app.color}22`,
                    }}
                  >
                    <span className="text-2xl">{app.icon}</span>
                  </div>
                  <span className="text-[10px] font-medium text-gray-600 text-center leading-tight w-full truncate">
                    {app.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
