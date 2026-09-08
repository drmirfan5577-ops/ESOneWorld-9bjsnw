import { useState } from "react";
import { useAppStore } from "@/stores/appStore";
import { THEMES } from "@/constants/themes";
import { UNIORBI_BRANCHES, AI_APPS, HOSTING_APPS } from "@/constants/apps";

type SubTab = "uniorbi" | "branches" | "integrations";

export default function ESmartPage() {
  const { activeTheme } = useAppStore();
  const theme = THEMES.find(t => t.id === activeTheme) || THEMES[0];
  const [subTab, setSubTab] = useState<SubTab>("uniorbi");

  const SUB_TABS = [
    { id: "uniorbi" as SubTab, icon: "🌍", label: "UniOrbi" },
    { id: "branches" as SubTab, icon: "⚡", label: "Branches" },
    { id: "integrations" as SubTab, icon: "🔗", label: "Integrate" },
  ];

  return (
    <div className="page-container">
      {/* Sub Tabs */}
      <div className="flex gap-1 px-3 py-2 border-b border-white/60 flex-shrink-0">
        {SUB_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSubTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 border-2 ${
              subTab === tab.id
                ? "text-white border-transparent"
                : "bg-white/70 border-white/70 text-gray-600"
            }`}
            style={subTab === tab.id ? {
              background: `linear-gradient(135deg, ${theme.accentHex}, ${theme.accentHex}bb)`,
            } : {}}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 panel-scroll">
        {/* UniOrbi Main */}
        {subTab === "uniorbi" && (
          <div className="px-3 py-3">
            {/* Hero Card */}
            <div
              className="rounded-3xl p-5 mb-4 text-center relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(0,200,150,0.15) 0%, rgba(255,255,255,0.95) 50%, rgba(0,200,150,0.1) 100%)",
                border: "2px solid rgba(0,200,150,0.3)",
                boxShadow: "0 12px 40px rgba(0,200,150,0.15)"
              }}
            >
              <div className="absolute inset-0 shimmer-overlay opacity-30" />
              <div className="relative">
                <div className="text-4xl mb-2 animate-float">🌍</div>
                <h2 className="text-xl font-black" style={{ color: theme.accentHex }}>UniOrbi</h2>
                <p className="text-xs font-semibold text-gray-500 tracking-widest uppercase">Universal · Orbit</p>
                <p className="text-sm text-gray-600 mt-2">The Main Platform @uniorbi.com</p>
                <div className="flex gap-2 mt-3 justify-center">
                  <a
                    href="https://uniorbi.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-2xl text-white text-sm font-bold hover:opacity-90 transition-opacity"
                    style={{ background: `linear-gradient(135deg, ${theme.accentHex}, ${theme.accentHex}cc)` }}
                  >
                    🚀 Launch UniOrbi
                  </a>
                  <a
                    href="https://drirfan.online"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-2xl text-sm font-bold bg-white/80 border-2 hover:bg-white transition-all"
                    style={{ borderColor: `${theme.accentHex}66`, color: theme.accentHex }}
                  >
                    🌐 Dr Irfan
                  </a>
                </div>
              </div>
            </div>

            {/* Email Addresses */}
            <div className="glass-card p-4 mb-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">📧 Official Emails</h3>
              <div className="space-y-2">
                {[
                  { label: "Admin", email: "Admin@drirfan.online" },
                  { label: "Contact", email: "Contact@drirfan.online" },
                  { label: "Info", email: "Info@drirfan.online" },
                  { label: "Dr Irfan", email: "drirfan5577@drirfan.online" },
                  { label: "Support", email: "Support@drirfan.online" },
                ].map((c) => (
                  <a
                    key={c.email}
                    href={`mailto:${c.email}`}
                    className="flex items-center gap-3 p-2 rounded-xl bg-white/80 hover:bg-white/95 transition-colors border border-white/70"
                  >
                    <span className="text-base">📧</span>
                    <div>
                      <div className="text-xs font-semibold text-gray-700">{c.label}</div>
                      <div className="text-[10px] text-emerald-700">{c.email}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Branches", value: "8+", icon: "⚡" },
                { label: "Users", value: "10K+", icon: "👥" },
                { label: "Domains", value: "3", icon: "🌐" },
              ].map((stat) => (
                <div key={stat.label} className="glass-card p-3 text-center">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-base font-black" style={{ color: theme.accentHex }}>{stat.value}</div>
                  <div className="text-[10px] text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Branches */}
        {subTab === "branches" && (
          <div className="px-3 py-3">
            <div className="glass-card-emerald p-3 text-center mb-4">
              <h3 className="text-sm font-bold text-gray-700">UniOrbi Branches</h3>
              <p className="text-xs text-gray-500">@uniorbi.com sub-platforms</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {UNIORBI_BRANCHES.map((branch) => (
                <a
                  key={branch.id}
                  href={branch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-4 flex flex-col items-center gap-2 text-center hover:shadow-glass-lg transition-all duration-200 active:scale-95"
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ background: `${branch.color}22`, border: `2px solid ${branch.color}44` }}
                  >
                    {branch.icon}
                  </div>
                  <div>
                    <div className="text-sm font-bold" style={{ color: branch.color }}>{branch.name}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">@uniorbi.com</div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">↗ Open</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Integrations */}
        {subTab === "integrations" && (
          <div className="px-3 py-3">
            <div className="glass-card-crimson p-3 text-center mb-4">
              <h3 className="text-sm font-bold text-gray-700">🔗 Integrations</h3>
              <p className="text-xs text-gray-500">One-click connect with services</p>
            </div>

            <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 px-1">AI Platforms</div>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {AI_APPS.map((app) => (
                <a key={app.id} href={app.url} target="_blank" rel="noopener noreferrer" className="app-icon">
                  <div className="app-icon-inner" style={{ background: `linear-gradient(135deg, white, ${app.color}18)` }}>
                    <span className="text-xl">{app.icon}</span>
                  </div>
                  <span className="text-[9px] text-gray-600 text-center truncate w-full">{app.name}</span>
                </a>
              ))}
            </div>

            <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 px-1">Hosting & Dev</div>
            <div className="grid grid-cols-4 gap-2">
              {HOSTING_APPS.map((app) => (
                <a key={app.id} href={app.url} target="_blank" rel="noopener noreferrer" className="app-icon">
                  <div className="app-icon-inner" style={{ background: `linear-gradient(135deg, white, ${app.color}18)` }}>
                    <span className="text-xl">{app.icon}</span>
                  </div>
                  <span className="text-[9px] text-gray-600 text-center truncate w-full">{app.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
