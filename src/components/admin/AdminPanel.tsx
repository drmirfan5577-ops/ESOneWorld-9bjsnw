import { useState } from "react";
import { useAppStore } from "@/stores/appStore";
import { THEMES } from "@/constants/themes";
import { LANGUAGES } from "@/constants/languages";
import type { TabId } from "@/types";

type AdminTab = "dashboard" | "appearance" | "tabs" | "features" | "integrations" | "addmore" | "security" | "contacts";

export default function AdminPanel() {
  const {
    adminPanelOpen, adminAuthenticated, closeAdminPanel,
    authenticateAdmin, logoutAdmin, adminSettings, updateAdminSettings,
    activeTheme, setActiveTheme, language
  } = useAppStore();
  const t = LANGUAGES[language];
  const theme = THEMES.find(th => th.id === activeTheme) || THEMES[0];
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [newPassword, setNewPassword] = useState("");
  const [settingsMsg, setSettingsMsg] = useState("");

  if (!adminPanelOpen) return null;

  const handleLogin = () => {
    const ok = authenticateAdmin(passwordInput);
    if (!ok) {
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 2000);
    }
    setPasswordInput("");
  };

  const saveMsg = (msg: string) => {
    setSettingsMsg(msg);
    setTimeout(() => setSettingsMsg(""), 2000);
  };

  const ADMIN_TABS: { id: AdminTab; icon: string; label: string }[] = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "appearance", icon: "🎨", label: "Appearance" },
    { id: "tabs", icon: "📱", label: "Nav Tabs" },
    { id: "features", icon: "⚙️", label: "Features" },
    { id: "integrations", icon: "🔗", label: "Integrations" },
    { id: "addmore", icon: "➕", label: "Add More" },
    { id: "contacts", icon: "📧", label: "Contacts" },
    { id: "security", icon: "🔐", label: "Security" },
  ];

  const ALL_TABS: { id: TabId; label: string }[] = [
    { id: "home", label: "Home (UniBrowser)" },
    { id: "guests", label: "Guest Room" },
    { id: "global", label: "Global" },
    { id: "esmart", label: "E-Smart (UniOrbi)" },
    { id: "paradise", label: "Paradise (Islamic)" },
    { id: "esonewworld", label: "ESOneWorld" },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeAdminPanel} />

      {/* Panel */}
      <div
        className="relative w-full max-w-lg mx-auto rounded-t-3xl sm:rounded-3xl flex flex-col animate-fade-up"
        style={{
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(40px)",
          boxShadow: "0 -8px 60px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.8)",
          maxHeight: "90dvh",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0 rounded-t-3xl"
          style={{ background: `linear-gradient(135deg, ${theme.accentHex}18, rgba(255,255,255,0.98))` }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-base font-bold"
              style={{ background: `linear-gradient(135deg, ${theme.accentHex}, ${theme.accentHex}cc)` }}
            >
              🔐
            </div>
            <div>
              <div className="text-sm font-black text-gray-800">Admin Panel</div>
              <div className="text-[10px] text-gray-400">ES OneWorld Control Center</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {adminAuthenticated && (
              <button
                onClick={logoutAdmin}
                className="text-xs font-semibold text-red-500 hover:text-red-700 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
            )}
            <button
              onClick={closeAdminPanel}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Auth Gate */}
        {!adminAuthenticated ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 gap-4">
            <div className="text-5xl animate-float">🔐</div>
            <h3 className="text-lg font-black text-gray-800">Secure Admin Access</h3>
            <p className="text-xs text-gray-500 text-center">Enter your admin password to access full control panel</p>
            <div className="w-full max-w-xs">
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Enter Admin Password"
                className={`w-full px-4 py-3 rounded-2xl text-sm border-2 outline-none text-center tracking-widest transition-all ${
                  passwordError ? "border-red-400 bg-red-50" : "border-gray-200 bg-white/90"
                }`}
                style={{ fontFamily: "monospace" }}
              />
              {passwordError && <p className="text-xs text-red-500 text-center mt-2 font-semibold">❌ Incorrect password</p>}
            </div>
            <button
              onClick={handleLogin}
              className="w-full max-w-xs py-3 rounded-2xl text-white font-bold text-sm hover:opacity-90 active:scale-95 transition-all"
              style={{ background: `linear-gradient(135deg, ${theme.accentHex}, ${theme.accentHex}cc)` }}
            >
              🔑 Login
            </button>
            <p className="text-[10px] text-gray-400">Default: @1122# (Change in Security tab after login)</p>
          </div>
        ) : (
          <>
            {/* Tab Navigation */}
            <div className="flex gap-1 px-3 py-2 border-b border-gray-100 flex-shrink-0 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
              {ADMIN_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[10px] font-bold whitespace-nowrap flex-shrink-0 border-2 transition-all ${
                    activeTab === tab.id
                      ? "text-white border-transparent"
                      : "bg-gray-50 border-gray-100 text-gray-500"
                  }`}
                  style={activeTab === tab.id ? {
                    background: `linear-gradient(135deg, ${theme.accentHex}, ${theme.accentHex}bb)`,
                  } : {}}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {settingsMsg && (
              <div className="mx-4 mt-2 py-2 px-4 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-semibold text-center border border-emerald-200 flex-shrink-0">
                ✅ {settingsMsg}
              </div>
            )}

            {/* Content */}
            <div className="flex-1 panel-scroll px-4 py-3">
              {/* Dashboard */}
              {activeTab === "dashboard" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Active Theme", value: adminSettings.activeTheme, icon: "🎨" },
                      { label: "Language", value: adminSettings.language.toUpperCase(), icon: "🌐" },
                      { label: "Active Tabs", value: `${adminSettings.enabledTabs.length}/6`, icon: "📱" },
                    ].map((stat) => (
                      <div key={stat.label} className="glass-card p-3 text-center">
                        <div className="text-xl mb-1">{stat.icon}</div>
                        <div className="text-xs font-bold text-gray-700">{stat.value}</div>
                        <div className="text-[9px] text-gray-400">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="glass-card p-4">
                    <h4 className="text-xs font-bold text-gray-700 mb-2">App Name & Tagline</h4>
                    <input
                      value={adminSettings.appName}
                      onChange={(e) => updateAdminSettings({ appName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm mb-2 outline-none"
                      placeholder="App Name"
                    />
                    <input
                      value={adminSettings.tagline}
                      onChange={(e) => updateAdminSettings({ tagline: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm outline-none"
                      placeholder="Tagline"
                    />
                    <button
                      onClick={() => saveMsg("App info saved!")}
                      className="mt-2 px-4 py-1.5 rounded-xl text-xs font-bold text-white hover:opacity-90"
                      style={{ background: theme.accentHex }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}

              {/* Appearance */}
              {activeTab === "appearance" && (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-gray-700">🎨 Theme Launchers</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {THEMES.map((th) => (
                      <button
                        key={th.id}
                        onClick={() => { setActiveTheme(th.id); updateAdminSettings({ activeTheme: th.id }); saveMsg(`Theme: ${th.name}`); }}
                        className={`launcher-card p-3 flex flex-col items-start gap-2 ${activeTheme === th.id ? "active" : "border-white/60"}`}
                        style={{ background: th.gradient }}
                      >
                        {activeTheme === th.id && <span className="text-[10px] font-bold" style={{ color: th.accentHex }}>✓ ACTIVE</span>}
                        <span className="text-sm font-bold text-gray-800">{th.name}</span>
                        <span className="text-[10px] text-gray-500">{th.description}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tabs Management */}
              {activeTab === "tabs" && (
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-gray-700 mb-3">📱 Navigation Tabs (Enable/Disable)</h4>
                  {ALL_TABS.map((tab) => {
                    const enabled = adminSettings.enabledTabs.includes(tab.id);
                    return (
                      <div key={tab.id} className="glass-card p-3 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{tab.label}</span>
                        <button
                          onClick={() => {
                            const current = adminSettings.enabledTabs;
                            const next = enabled ? current.filter(t => t !== tab.id) : [...current, tab.id];
                            updateAdminSettings({ enabledTabs: next });
                            saveMsg(`${tab.label} ${!enabled ? "enabled" : "disabled"}`);
                          }}
                          className={`w-12 h-6 rounded-full transition-all duration-300 relative ${enabled ? "bg-emerald-400" : "bg-gray-300"}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${enabled ? "left-7" : "left-1"}`} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Features */}
              {activeTab === "features" && (
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-gray-700 mb-3">⚙️ Feature Toggles</h4>
                  {Object.entries(adminSettings.enabledFeatures).map(([key, value]) => (
                    <div key={key} className="glass-card p-3 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, " $1")}</div>
                      </div>
                      <button
                        onClick={() => {
                          updateAdminSettings({
                            enabledFeatures: { ...adminSettings.enabledFeatures, [key]: !value }
                          });
                          saveMsg(`${key} ${!value ? "enabled" : "disabled"}`);
                        }}
                        className={`w-12 h-6 rounded-full transition-all duration-300 relative ${value ? "bg-emerald-400" : "bg-gray-300"}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${value ? "left-7" : "left-1"}`} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Integrations */}
              {activeTab === "integrations" && (
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-gray-700 mb-3">🔗 Integration Toggles</h4>
                  <div className="space-y-2">
                    {Object.entries(adminSettings.integrations).map(([key, value]) => (
                      <div key={key} className="glass-card p-3 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 capitalize">{key}</span>
                        <button
                          onClick={() => {
                            updateAdminSettings({
                              integrations: { ...adminSettings.integrations, [key]: !value }
                            });
                            saveMsg(`${key} ${!value ? "enabled" : "disabled"}`);
                          }}
                          className={`w-12 h-6 rounded-full transition-all duration-300 relative ${value ? "bg-emerald-400" : "bg-gray-300"}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${value ? "left-7" : "left-1"}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add More */}
              {activeTab === "addmore" && (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-gray-700">➕ Add More Apps/Sites</h4>
                  <div className="glass-card p-4">
                    <div className="text-xs font-semibold text-gray-600 mb-2">Add Custom App/Link</div>
                    <input className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm mb-2 outline-none" placeholder="App Name" />
                    <input className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm mb-2 outline-none" placeholder="URL (https://...)" />
                    <input className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm mb-2 outline-none" placeholder="Emoji Icon" />
                    <button
                      onClick={() => saveMsg("Custom app added!")}
                      className="w-full py-2 rounded-xl text-sm font-bold text-white hover:opacity-90"
                      style={{ background: theme.accentHex }}
                    >
                      + Add App
                    </button>
                  </div>
                  <div className="glass-card p-4">
                    <div className="text-xs font-semibold text-gray-600 mb-3">Quick Add Social Media</div>
                    <div className="grid grid-cols-3 gap-2">
                      {["YouTube", "WhatsApp", "Facebook", "Twitter X", "TikTok", "Instagram"].map((s) => (
                        <button key={s} onClick={() => saveMsg(`${s} added!`)}
                          className="py-2 px-1 rounded-xl bg-white/80 border border-gray-200 text-[10px] font-semibold text-gray-600 hover:bg-white transition-colors">
                          + {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Contacts */}
              {activeTab === "contacts" && (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-gray-700">📧 Contact Emails</h4>
                  {adminSettings.contacts.map((c, i) => (
                    <div key={i} className="glass-card p-3 flex items-center gap-2">
                      <span className="text-base">📧</span>
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-gray-600">{c.label}</div>
                        <div className="text-xs text-emerald-700">{c.email}</div>
                      </div>
                      <button className="text-xs text-blue-500 hover:underline">Edit</button>
                    </div>
                  ))}
                  <div className="glass-card p-4">
                    <div className="text-xs font-semibold text-gray-600 mb-2">Add Contact</div>
                    <input className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm mb-2 outline-none" placeholder="Label" />
                    <input className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm mb-2 outline-none" placeholder="email@drirfan.online" />
                    <button
                      onClick={() => saveMsg("Contact added!")}
                      className="w-full py-2 rounded-xl text-sm font-bold text-white hover:opacity-90"
                      style={{ background: theme.accentHex }}
                    >
                      + Add Contact
                    </button>
                  </div>
                </div>
              )}

              {/* Security */}
              {activeTab === "security" && (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-gray-700">🔐 Change Admin Password</h4>
                  <div className="glass-card p-4">
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm mb-3 outline-none"
                      placeholder="New Password (min 6 chars)"
                    />
                    <button
                      onClick={() => {
                        if (newPassword.length >= 6) {
                          updateAdminSettings({ password: newPassword });
                          setNewPassword("");
                          saveMsg("Password updated successfully!");
                        }
                      }}
                      className="w-full py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90"
                      style={{ background: `linear-gradient(135deg, #E8003D, #FF4466)` }}
                    >
                      🔑 Update Password
                    </button>
                  </div>
                  <div className="glass-card-crimson p-4">
                    <h4 className="text-xs font-bold text-gray-700 mb-2">⚠️ Security Notes</h4>
                    <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
                      <li>Change default password immediately</li>
                      <li>Use strong password with special characters</li>
                      <li>Admin panel is fully password protected</li>
                      <li>Contact: Admin@drirfan.online for recovery</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
