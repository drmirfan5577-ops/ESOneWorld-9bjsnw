import { useAppStore } from "@/stores/appStore";
import { THEMES } from "@/constants/themes";
import type { TabId } from "@/types";

const NAV_ITEMS: { id: TabId; icon: string; label: string; labelUr: string; labelAr: string }[] = [
  { id: "home",       icon: "🏠", label: "Home",      labelUr: "ہوم",        labelAr: "الرئيسية" },
  { id: "guests",     icon: "💬", label: "Guests",    labelUr: "گیسٹس",      labelAr: "ضيوف" },
  { id: "global",     icon: "🌍", label: "Global",    labelUr: "گلوبل",      labelAr: "عالمي" },
  { id: "esmart",     icon: "⚡", label: "E-Smart",   labelUr: "ای‌اسمارٹ",  labelAr: "ذكي" },
  { id: "paradise",   icon: "🕌", label: "Paradise",  labelUr: "جنت",        labelAr: "جنة" },
  { id: "esonewworld",icon: "⭐", label: "ESOneWorld",labelUr: "ون ورلڈ",    labelAr: "ون ورلد" },
];

export default function BottomNav() {
  const { activeTab, setActiveTab, activeTheme, language } = useAppStore();
  const theme = THEMES.find(t => t.id === activeTheme) || THEMES[0];

  const getLabel = (item: typeof NAV_ITEMS[0]) => {
    if (language === "ur") return item.labelUr;
    if (language === "ar") return item.labelAr;
    return item.label;
  };

  return (
    <div
      className="flex-shrink-0 z-30"
      style={{
        background: "rgba(255,255,255,0.94)",
        backdropFilter: "blur(24px)",
        borderTop: "1px solid rgba(255,255,255,0.85)",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.07)"
      }}
    >
      <div className="flex items-stretch" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
        {NAV_ITEMS.map((item, idx) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="bottom-nav-item relative group"
              style={{ minHeight: 56 }}
            >
              {/* Active indicator */}
              {isActive && (
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                  style={{ background: theme.accentHex, boxShadow: `0 0 8px ${theme.accentHex}` }}
                />
              )}

              {/* Icon */}
              <div
                className={`text-xl transition-all duration-200 ${isActive ? "scale-125" : "scale-100 group-hover:scale-110"}`}
                style={{
                  filter: isActive
                    ? `drop-shadow(0 0 6px ${theme.accentHex})`
                    : "none",
                }}
              >
                {item.icon}
              </div>

              {/* Label */}
              <span
                className={`text-[9px] font-semibold leading-none transition-colors duration-200 truncate w-full text-center px-0.5 ${
                  language === "ar" ? "font-arabic text-[8px]" : ""
                }`}
                style={{
                  color: isActive ? theme.accentHex : "#888",
                  textShadow: isActive ? `0 0 8px ${theme.accentHex}88` : "none",
                }}
              >
                {getLabel(item)}
              </span>

              {/* Glow background for active */}
              {isActive && (
                <div
                  className="absolute inset-0 rounded-xl -z-10 opacity-10"
                  style={{ background: theme.accentHex }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
