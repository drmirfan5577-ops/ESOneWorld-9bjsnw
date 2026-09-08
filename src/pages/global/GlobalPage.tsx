import { useState } from "react";
import { useAppStore } from "@/stores/appStore";
import { THEMES } from "@/constants/themes";

const GROUPS = [
  { id: "1", name: "ES OneWorld Family", members: 10420, icon: "⭐", category: "Community", active: true, desc: "The Global Family Platform — Together as One" },
  { id: "2", name: "Islamic Hub Global", members: 8750, icon: "🕌", category: "Religion", active: true, desc: "Quran, Hadees, Islamic Knowledge & Discussions" },
  { id: "3", name: "UniOrbi Network", members: 5300, icon: "🌍", category: "Technology", active: false, desc: "Universal Orbit Platform Users & Developers" },
  { id: "4", name: "Smart World News", members: 12000, icon: "📰", category: "News", active: true, desc: "Real-time global news & updates" },
  { id: "5", name: "Pakistan Digital Hub", members: 4200, icon: "🇵🇰", category: "Regional", active: false, desc: "Pakistan tech, culture & community" },
  { id: "6", name: "AI Innovation Lab", members: 3100, icon: "🤖", category: "Technology", active: true, desc: "AI tools, research & innovation discussions" },
];

const COMMUNITIES = [
  { id: "1", name: "Global Family Vision", members: "25K+", icon: "🌏", desc: "Dr Irfan's vision of a united Global Family" },
  { id: "2", name: "Islamic Scholars", members: "18K+", icon: "📚", desc: "Scholars, Students & Seekers of Knowledge" },
  { id: "3", name: "Tech Innovators", members: "9K+", icon: "⚡", desc: "Building the future of digital platforms" },
  { id: "4", name: "Urdu Literary Circle", members: "6K+", icon: "✍️", desc: "اردو ادب، شاعری اور تحریر" },
];

type SubTab = "groups" | "communities";

export default function GlobalPage() {
  const { activeTheme } = useAppStore();
  const theme = THEMES.find(t => t.id === activeTheme) || THEMES[0];
  const [subTab, setSubTab] = useState<SubTab>("groups");

  return (
    <div className="page-container">
      {/* Sub Tabs */}
      <div className="flex gap-2 px-3 py-2 border-b border-white/60 flex-shrink-0">
        {(["groups", "communities"] as SubTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setSubTab(tab)}
            className={`flex-1 py-2 rounded-xl text-sm font-bold border-2 capitalize transition-all duration-200 ${
              subTab === tab
                ? "text-white border-transparent"
                : "bg-white/80 border-white/70 text-gray-600"
            }`}
            style={subTab === tab ? {
              background: `linear-gradient(135deg, ${theme.accentHex}, ${theme.accentHex}bb)`,
            } : {}}
          >
            {tab === "groups" ? "👥 Groups" : "🌍 Communities"}
          </button>
        ))}
      </div>

      <div className="flex-1 panel-scroll px-3 py-3">
        {subTab === "groups" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-gray-700">All Groups ({GROUPS.length})</h3>
              <button
                className="text-xs font-semibold px-3 py-1.5 rounded-xl text-white transition-all duration-200 hover:opacity-90"
                style={{ background: theme.accentHex }}
                onClick={() => alert("Create Group — Coming soon! إن شاء الله")}
              >
                + Create
              </button>
            </div>
            {GROUPS.map((group) => (
              <div key={group.id} className="glass-card p-3.5 flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${theme.accentHex}22, ${theme.accentHex}44)` }}
                >
                  {group.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-gray-800 truncate">{group.name}</h4>
                    {group.active && (
                      <span className="flex-shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: `${theme.accentHex}22`, color: theme.accentHex }}>
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5 truncate">{group.desc}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] text-gray-400">👥 {group.members.toLocaleString()} members</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{group.category}</span>
                  </div>
                </div>
                <button
                  className="flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold text-white transition-all duration-200 hover:opacity-90"
                  style={{ background: `linear-gradient(135deg, ${theme.accentHex}, ${theme.accentHex}bb)` }}
                  onClick={() => alert(`Joining ${group.name}... إن شاء الله`)}
                >
                  Join
                </button>
              </div>
            ))}
          </div>
        )}

        {subTab === "communities" && (
          <div className="space-y-3">
            <div className="glass-card-emerald p-4 mb-4 text-center">
              <div className="text-3xl mb-2">🌏</div>
              <h3 className="text-base font-bold text-gray-800">ES OneWorld Communities</h3>
              <p className="text-xs text-gray-500 mt-1">
                "Neither a Global Village nor a Global Community — It's a Global Family Platform"
              </p>
              <p className="text-xs font-semibold mt-1" style={{ color: theme.accentHex }}>— Dr M Irfan Qadir Thaheem</p>
            </div>

            {COMMUNITIES.map((comm) => (
              <div key={comm.id} className="glass-card p-4">
                <div className="flex items-start gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${theme.accentHex}22, ${theme.accentHex}44)` }}
                  >
                    {comm.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-800">{comm.name}</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">{comm.desc}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] text-gray-400">👥 {comm.members} members</span>
                      <button
                        className="text-xs font-bold px-3 py-1 rounded-xl text-white"
                        style={{ background: theme.accentHex }}
                        onClick={() => alert(`Joining ${comm.name}! إن شاء الله`)}
                      >
                        Join
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
