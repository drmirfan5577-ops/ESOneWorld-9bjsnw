import { useState } from "react";
import { useAppStore } from "@/stores/appStore";
import { THEMES } from "@/constants/themes";
import { LANGUAGES } from "@/constants/languages";
import { CONTACTS_INFO } from "@/constants/apps";

type SubTab = "gallery" | "settings" | "vision" | "about" | "locker";

export default function ESOneWorldPage() {
  const { activeTheme, language, openAdminPanel } = useAppStore();
  const theme = THEMES.find(t => t.id === activeTheme) || THEMES[0];
  const t = LANGUAGES[language];
  const [subTab, setSubTab] = useState<SubTab>("gallery");

  const SUB_TABS = [
    { id: "gallery" as SubTab, icon: "🖼️", label: "Gallery" },
    { id: "vision" as SubTab, icon: "🌍", label: "Vision" },
    { id: "about" as SubTab, icon: "ℹ️", label: "About" },
    { id: "settings" as SubTab, icon: "⚙️", label: "Settings" },
    { id: "locker" as SubTab, icon: "🔐", label: "Admin" },
  ];

  const GALLERY_ITEMS = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    emoji: ["🌍", "🕌", "⭐", "💫", "🌺", "🌙", "📖", "🤲", "🌟", "💎", "🌊", "🔮", "🌈", "🎨", "🏔️", "🌸"][i],
    gradient: `linear-gradient(135deg, hsl(${i * 22}, 80%, 92%), hsl(${i * 22 + 40}, 70%, 96%))`,
  }));

  return (
    <div className="page-container">
      {/* Sub Tabs */}
      <div className="flex gap-1 px-2 py-2 border-b border-white/60 flex-shrink-0 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {SUB_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSubTab(tab.id)}
            className={`flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 border-2 whitespace-nowrap flex-shrink-0 ${
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
        {/* Gallery */}
        {subTab === "gallery" && (
          <div className="px-3 py-3">
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6">
              {GALLERY_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="aspect-square rounded-2xl cursor-pointer overflow-hidden hover:scale-105 transition-transform duration-200 hover:shadow-glass"
                  style={{ background: item.gradient }}
                >
                  <div className="w-full h-full flex items-center justify-center text-3xl">
                    {item.emoji}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button
                className="px-6 py-2.5 rounded-2xl text-sm font-bold text-white hover:opacity-90 transition-opacity"
                style={{ background: `linear-gradient(135deg, ${theme.accentHex}, ${theme.accentHex}cc)` }}
              >
                + Add Media
              </button>
            </div>
          </div>
        )}

        {/* Vision */}
        {subTab === "vision" && (
          <div className="px-3 py-3 space-y-4">
            <div
              className="rounded-3xl p-6 text-center relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(0,200,150,0.12), rgba(255,255,255,0.96), rgba(232,0,61,0.08))",
                border: "2px solid rgba(0,200,150,0.25)"
              }}
            >
              <div className="text-5xl mb-3 animate-breathe">🌍</div>
              <h2 className="text-xl font-black text-gray-800 leading-tight">
                "Neither a Global Village<br />
                nor a Global Community"
              </h2>
              <div className="mt-2 text-base font-bold" style={{ color: theme.accentHex }}>
                It's a Global Family Platform
              </div>
              <p className="text-xs text-gray-500 mt-2">— Dr M Irfan Qadir Thaheem</p>
            </div>

            {[
              { icon: "🕊️", title: "Peace & Justice", desc: "Truth, Justice and Knowledge for every member of the Global Family, regardless of borders, beliefs or backgrounds." },
              { icon: "🤝", title: "Unity in Diversity", desc: "Connecting hearts and minds across cultures, languages and nations under one digital roof — ES OneWorld." },
              { icon: "📚", title: "Knowledge & Faith", desc: "Integrating modern technology with Islamic wisdom and universal human values for a better tomorrow." },
              { icon: "⚡", title: "Digital Innovation", desc: "UniOrbi, UniBrowser, and ES OneWorld — building the future of digital platforms for the Global Family." },
            ].map((v) => (
              <div key={v.title} className="glass-card p-4 flex gap-3">
                <div className="text-3xl flex-shrink-0">{v.icon}</div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800">{v.title}</h4>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* About */}
        {subTab === "about" && (
          <div className="px-3 py-3 space-y-4">
            <div className="glass-card-emerald p-5 text-center">
              <div className="text-4xl mb-2">👨‍💻</div>
              <h3 className="text-base font-black text-gray-800">Dr M Irfan Qadir Thaheem</h3>
              <p className="text-xs text-gray-500 mt-1">Founder & Visionary · ES OneWorld</p>
              <div className="mt-3 space-y-1">
                {CONTACTS_INFO.map((c) => (
                  <a key={c.email} href={`mailto:${c.email}`} className="block text-xs text-emerald-700 hover:underline">
                    📧 {c.email}
                  </a>
                ))}
              </div>
            </div>

            <div className="glass-card p-4">
              <h4 className="text-sm font-bold text-gray-800 mb-2">🌐 Websites</h4>
              {["www.uniorbi.com", "www.drirfan.online"].map((site) => (
                <a key={site} href={`https://${site}`} target="_blank" rel="noopener noreferrer"
                  className="block text-sm text-blue-600 hover:underline mb-1">
                  🔗 {site}
                </a>
              ))}
            </div>

            <div className="glass-card p-4">
              <h4 className="text-sm font-bold text-gray-800 mb-2">📋 Disclaimer</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                ES OneWorld is a digital family platform created for educational, spiritual and community purposes.
                All Islamic content is sourced from authentic references. Admin: Admin@drirfan.online
              </p>
            </div>

            <div className="glass-card p-4">
              <h4 className="text-sm font-bold text-gray-800 mb-2">🔒 Privacy Policy</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Your privacy is our priority. We do not sell personal data. All communications are secured.
                For data requests, contact: Support@drirfan.online
              </p>
            </div>

            <div className="glass-card p-4">
              <h4 className="text-sm font-bold text-gray-800 mb-2">©️ Copyright</h4>
              <p className="text-xs text-gray-600">
                © 2026 ES OneWorld · Dr M Irfan Qadir Thaheem. All rights reserved.
                Powered by UniOrbi Platform.
              </p>
            </div>
          </div>
        )}

        {/* Settings */}
        {subTab === "settings" && (
          <div className="px-3 py-3 space-y-3">
            <div className="glass-card p-4">
              <h4 className="text-sm font-bold text-gray-700 mb-3">🎨 Themes</h4>
              <div className="grid grid-cols-4 gap-2">
                {THEMES.map((th) => (
                  <button
                    key={th.id}
                    className={`h-14 rounded-xl border-2 text-[9px] font-bold flex items-end justify-center pb-1 text-gray-700 transition-all`}
                    style={{ background: th.gradient, borderColor: activeTheme === th.id ? th.accentHex : "rgba(255,255,255,0.6)" }}
                    onClick={() => useAppStore.getState().setActiveTheme(th.id)}
                  >
                    {activeTheme === th.id && "✓ "}{th.name.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-card p-4">
              <h4 className="text-sm font-bold text-gray-700 mb-3">🌐 Language</h4>
              <div className="flex gap-2">
                {(["en", "ur", "ar"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => useAppStore.getState().setLanguage(lang)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold border-2 transition-all ${
                      language === lang
                        ? "text-white border-transparent"
                        : "bg-white/80 border-gray-200 text-gray-600"
                    }`}
                    style={language === lang ? { background: theme.accentHex } : {}}
                  >
                    {lang === "en" ? "🇬🇧 English" : lang === "ur" ? "🇵🇰 اردو" : "🇸🇦 العربية"}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-card p-4">
              <h4 className="text-sm font-bold text-gray-700 mb-1">🔔 Notifications</h4>
              <p className="text-xs text-gray-500">Push notifications — coming with backend</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-600">Enable Notifications</span>
                <div className="w-10 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                  <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow" />
                </div>
              </div>
            </div>

            <button
              onClick={openAdminPanel}
              className="w-full py-3 rounded-2xl text-white font-bold text-sm transition-all duration-200 hover:opacity-90"
              style={{ background: `linear-gradient(135deg, #E8003D, #FF4466)` }}
            >
              🔐 Admin Panel — Secure Access
            </button>
          </div>
        )}

        {/* Locker / Admin Entry */}
        {subTab === "locker" && (
          <div className="px-3 py-6 flex flex-col items-center">
            <div className="text-6xl mb-4 animate-float">🔐</div>
            <h3 className="text-lg font-black text-gray-800 mb-1">Admin Panel</h3>
            <p className="text-xs text-gray-500 mb-6">Password protected full control panel</p>
            <button
              onClick={openAdminPanel}
              className="w-full max-w-xs py-3.5 rounded-2xl text-white font-bold text-base transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ background: `linear-gradient(135deg, ${theme.accentHex}, ${theme.accentHex}cc)`, boxShadow: `0 8px 24px ${theme.accentHex}44` }}
            >
              🔑 Enter Admin Panel
            </button>
            <p className="text-[10px] text-gray-400 mt-4">Default password: @1122#</p>
          </div>
        )}
      </div>
    </div>
  );
}
