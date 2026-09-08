import { useAppStore } from "@/stores/appStore";
import { THEMES } from "@/constants/themes";
import { AI_APPS, WEBSITE_APPS } from "@/constants/apps";

const QUICK_TOOLS = [
  { icon: "🌡️", label: "Weather" },
  { icon: "📊", label: "Sheets" },
  { icon: "🐙", label: "GitHub" },
  { icon: "▲", label: "Vercel" },
  { icon: "🔥", label: "Firebase" },
  { icon: "⚡", label: "Supabase" },
  { icon: "🌐", label: "Cloudflare" },
  { icon: "🚀", label: "Expo" },
  { icon: "📝", label: "Tasks" },
  { icon: "⏰", label: "Reminders" },
  { icon: "📌", label: "Notes" },
  { icon: "🔖", label: "Bookmarks" },
  { icon: "⭐", label: "Favorites" },
  { icon: "🕌", label: "Prayer Times" },
];

export default function LeftSidebar() {
  const { leftSidebarOpen, toggleLeftSidebar, activeTheme, setActiveTheme } = useAppStore();
  const theme = THEMES.find(t => t.id === activeTheme) || THEMES[0];

  return (
    <>
      {/* Backdrop */}
      {leftSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={toggleLeftSidebar}
        />
      )}

      {/* Sidebar Panel */}
      <div
        className={`sidebar-panel left-0 z-50 transition-transform duration-300 ${
          leftSidebarOpen ? "translate-x-0 animate-slide-in-left" : "-translate-x-full"
        }`}
        style={{ boxShadow: "4px 0 40px rgba(0,0,0,0.12)", width: 260 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/60">
          <div className="flex items-center gap-2">
            <span className="text-xl">⭐</span>
            <span className="font-bold text-sm" style={{ color: theme.accentHex }}>Left Panel</span>
          </div>
          <button
            onClick={toggleLeftSidebar}
            className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 text-sm transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Quick Tools */}
        <div className="panel-scroll flex-1 p-3">
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 px-1">
            Quick Tools
          </div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {QUICK_TOOLS.map((tool) => (
              <button
                key={tool.label}
                className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/70 hover:bg-white/95 border border-white/80 transition-all duration-200 hover:shadow-glass text-center"
              >
                <span className="text-xl">{tool.icon}</span>
                <span className="text-[9px] font-medium text-gray-600 leading-tight">{tool.label}</span>
              </button>
            ))}
          </div>

          {/* AI Tools */}
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 px-1">
            AI Tools
          </div>
          <div className="space-y-1.5">
            {AI_APPS.slice(0, 6).map((app) => (
              <a
                key={app.id}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/70 hover:bg-white/95 border border-white/80 transition-all duration-200 hover:shadow-glass group"
              >
                <span className="text-lg">{app.icon}</span>
                <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900">{app.name}</span>
                <span className="ml-auto text-[10px] text-gray-400">↗</span>
              </a>
            ))}
          </div>

          {/* Themes Quick Switch */}
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-4 mb-2 px-1">
            Themes
          </div>
          <div className="grid grid-cols-3 gap-2">
            {THEMES.map((th) => (
              <button
                key={th.id}
                onClick={() => setActiveTheme(th.id)}
                className={`h-12 rounded-xl border-2 transition-all duration-200 text-[9px] font-semibold text-gray-700 flex items-end justify-center pb-1 ${
                  activeTheme === th.id ? "border-emerald-400 shadow-glow" : "border-white/60"
                }`}
                style={{ background: th.gradient }}
              >
                {activeTheme === th.id && "✓ "}
                {th.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-white/60">
          <div className="text-[10px] text-gray-400 text-center">ES OneWorld · v1.0</div>
        </div>
      </div>
    </>
  );
}
