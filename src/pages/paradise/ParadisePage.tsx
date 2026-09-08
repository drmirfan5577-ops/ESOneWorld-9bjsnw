import { useState } from "react";
import { useAppStore } from "@/stores/appStore";
import { THEMES } from "@/constants/themes";

type SubTab = "quran" | "hadees" | "series" | "prayers";

const QURAN_SURAHS = [
  { n: 1, name: "Al-Fatiha", arabic: "الفاتحة", urdu: "الفاتحہ", verses: 7, type: "Meccan" },
  { n: 2, name: "Al-Baqarah", arabic: "البقرة", urdu: "البقرہ", verses: 286, type: "Medinan" },
  { n: 3, name: "Al-Imran", arabic: "آل عمران", urdu: "آل عمران", verses: 200, type: "Medinan" },
  { n: 4, name: "An-Nisa", arabic: "النساء", urdu: "النساء", verses: 176, type: "Medinan" },
  { n: 5, name: "Al-Maidah", arabic: "المائدة", urdu: "المائدہ", verses: 120, type: "Medinan" },
  { n: 36, name: "Ya-Sin", arabic: "يس", urdu: "یٰسین", verses: 83, type: "Meccan" },
  { n: 55, name: "Ar-Rahman", arabic: "الرحمن", urdu: "الرحمٰن", verses: 78, type: "Medinan" },
  { n: 67, name: "Al-Mulk", arabic: "الملك", urdu: "الملک", verses: 30, type: "Meccan" },
  { n: 112, name: "Al-Ikhlas", arabic: "الإخلاص", urdu: "الاخلاص", verses: 4, type: "Meccan" },
  { n: 113, name: "Al-Falaq", arabic: "الفلق", urdu: "الفلق", verses: 5, type: "Meccan" },
  { n: 114, name: "An-Nas", arabic: "الناس", urdu: "الناس", verses: 6, type: "Meccan" },
];

const HADITHS = [
  { text: "The best among you are those who have the best manners and character.", arabic: "خَيْرُكُمْ أَحْسَنُكُمْ خُلُقًا", source: "Bukhari", num: 3559 },
  { text: "Actions are judged by intentions, so each person will have what they intended.", arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ", source: "Bukhari & Muslim", num: 1 },
  { text: "None of you truly believes until he loves for his brother what he loves for himself.", arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ", source: "Bukhari & Muslim", num: 13 },
  { text: "Seek knowledge, even unto China.", arabic: "اطْلُبُوا الْعِلْمَ وَلَوْ بِالصِّينِ", source: "Al-Baihaqi", num: 1628 },
  { text: "The world is a prison for the believer and a paradise for the disbeliever.", arabic: "الدُّنْيَا سِجْنُ الْمُؤْمِنِ وَجَنَّةُ الْكَافِرِ", source: "Muslim", num: 2956 },
];

const FATIHA_TEXT = [
  { arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", urdu: "اللہ کے نام سے جو بڑا مہربان، نہایت رحم والا ہے", en: "In the name of Allah, the Most Gracious, the Most Merciful" },
  { arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", urdu: "تمام تعریفیں اللہ کے لیے ہیں جو تمام جہانوں کا پالنہار ہے", en: "All praise is due to Allah, Lord of all the worlds" },
  { arabic: "الرَّحْمَٰنِ الرَّحِيمِ", urdu: "جو بڑا مہربان، نہایت رحم والا ہے", en: "The Most Gracious, the Most Merciful" },
  { arabic: "مَالِكِ يَوْمِ الدِّينِ", urdu: "جو روزِ جزا کا مالک ہے", en: "Sovereign of the Day of Recompense" },
  { arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", urdu: "ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد مانگتے ہیں", en: "It is You we worship and You we ask for help" },
  { arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", urdu: "ہمیں سیدھی راہ دکھا", en: "Guide us to the straight path" },
  { arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", urdu: "ان لوگوں کی راہ جن پر تو نے انعام فرمایا، ان کی نہیں جن پر غضب ہوا اور نہ گمراہوں کی", en: "The path of those upon whom You have bestowed favor, not those who have incurred Your anger, nor those who are astray" },
];

const PRAYER_TIMES = [
  { name: "Fajr", time: "4:32 AM", arabic: "فجر", icon: "🌅", color: "#8B6AFF" },
  { name: "Dhuhr", time: "12:15 PM", arabic: "ظہر", icon: "☀️", color: "#FFB800" },
  { name: "Asr", time: "3:48 PM", arabic: "عصر", icon: "🌤️", color: "#FF8C00" },
  { name: "Maghrib", time: "6:42 PM", arabic: "مغرب", icon: "🌇", color: "#E8003D" },
  { name: "Isha", time: "8:12 PM", arabic: "عشاء", icon: "🌙", color: "#00C896" },
];

export default function ParadisePage() {
  const { activeTheme, language } = useAppStore();
  const theme = THEMES.find(t => t.id === activeTheme) || THEMES[0];
  const [subTab, setSubTab] = useState<SubTab>("quran");
  const [selectedSurah, setSelectedSurah] = useState<typeof QURAN_SURAHS[0] | null>(null);

  const SUB_TABS = [
    { id: "quran" as SubTab, icon: "📖", label: "Quran" },
    { id: "hadees" as SubTab, icon: "📜", label: "Hadees" },
    { id: "series" as SubTab, icon: "📺", label: "Series" },
    { id: "prayers" as SubTab, icon: "🕌", label: "Prayers" },
  ];

  return (
    <div className="page-container">
      {/* Sub Tabs */}
      <div className="flex gap-1 px-3 py-2 border-b border-white/60 flex-shrink-0">
        {SUB_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setSubTab(tab.id); setSelectedSurah(null); }}
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
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 panel-scroll">
        {/* Quran */}
        {subTab === "quran" && !selectedSurah && (
          <div className="px-3 py-3">
            {/* Header */}
            <div className="glass-card-emerald p-4 text-center mb-4">
              <div className="text-3xl mb-1 animate-breathe">📖</div>
              <div className="font-arabic text-xl font-bold" style={{ color: "#007A5A" }}>
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>
              <div className="text-xs text-gray-600 mt-1">Holy Quran — 114 Surahs · 6,236 Verses</div>
            </div>
            <div className="space-y-2">
              {QURAN_SURAHS.map((s) => (
                <button
                  key={s.n}
                  onClick={() => setSelectedSurah(s)}
                  className="w-full glass-card p-3 flex items-center gap-3 text-left hover:shadow-glass-lg transition-all duration-200"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${theme.accentHex}, ${theme.accentHex}aa)` }}
                  >
                    {s.n}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-800">{s.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500">{s.type}</span>
                    </div>
                    <div className="text-xs text-gray-500">{s.verses} verses</div>
                  </div>
                  <div className="font-arabic text-base font-bold text-gray-700">{s.arabic}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Surah Detail */}
        {subTab === "quran" && selectedSurah && (
          <div className="px-3 py-3">
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => setSelectedSurah(null)} className="text-lg text-gray-500 hover:text-gray-700">←</button>
              <div>
                <h3 className="text-base font-bold text-gray-800">{selectedSurah.name}</h3>
                <div className="text-xs text-gray-500">{selectedSurah.arabic} · {selectedSurah.verses} verses · {selectedSurah.type}</div>
              </div>
              <div className="ml-auto flex gap-2">
                <button className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-base hover:bg-emerald-100 transition-colors">▶️</button>
                <button className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-base hover:bg-blue-100 transition-colors">⬇️</button>
              </div>
            </div>
            {selectedSurah.n === 1 ? (
              <div className="space-y-3">
                {FATIHA_TEXT.map((verse, i) => (
                  <div key={i} className="glass-card p-4">
                    <div className="font-arabic text-lg text-right font-bold text-gray-800 mb-2" style={{ lineHeight: 2.2 }}>{verse.arabic}</div>
                    <div className="text-xs text-gray-600 text-right font-arabic mb-1" style={{ direction: "rtl" }}>{verse.urdu}</div>
                    <div className="text-xs text-gray-500 italic">{verse.en}</div>
                    <div className="text-[10px] text-right mt-1" style={{ color: theme.accentHex }}>({i + 1})</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-card-emerald p-6 text-center">
                <div className="text-4xl mb-3">📖</div>
                <div className="font-arabic text-2xl font-bold text-gray-800 mb-2">{selectedSurah.arabic}</div>
                <p className="text-sm text-gray-600">Full audio & text will be available with backend integration.</p>
                <button
                  className="mt-4 px-6 py-2 rounded-2xl text-white text-sm font-bold"
                  style={{ background: theme.accentHex }}
                  onClick={() => alert("Full Quran Audio+Text — Coming with Backend! إن شاء الله")}
                >
                  ▶ Play Audio
                </button>
              </div>
            )}
          </div>
        )}

        {/* Hadees */}
        {subTab === "hadees" && (
          <div className="px-3 py-3 space-y-3">
            <div className="glass-card-emerald p-3 text-center mb-2">
              <div className="text-2xl mb-1">📜</div>
              <h3 className="text-sm font-bold text-gray-700">Hadees Collection</h3>
              <p className="text-xs text-gray-500">Authentic Prophetic Traditions (PBUH)</p>
            </div>
            {HADITHS.map((h, i) => (
              <div key={i} className="glass-card p-4">
                <div className="font-arabic text-base text-right font-bold mb-2 text-gray-800" style={{ lineHeight: 2, direction: "rtl" }}>
                  {h.arabic}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-2">"{h.text}"</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold px-2 py-1 rounded-full" style={{ background: `${theme.accentHex}22`, color: theme.accentHex }}>
                    {h.source}
                  </span>
                  <span className="text-[10px] text-gray-400">#{h.num}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Islamic Series */}
        {subTab === "series" && (
          <div className="px-3 py-3 space-y-3">
            {[
              { title: "Seerat-un-Nabi ﷺ", ep: "52 Episodes", icon: "🌟", color: "#FFB800" },
              { title: "Stories of the Prophets", ep: "40 Episodes", icon: "📖", color: "#00C896" },
              { title: "Islamic History Series", ep: "36 Episodes", icon: "🏰", color: "#8B00FF" },
              { title: "Tafseer al-Quran", ep: "114 Episodes", icon: "📚", color: "#0088FF" },
              { title: "Companions of the Prophet", ep: "25 Episodes", icon: "⭐", color: "#E8003D" },
            ].map((s, i) => (
              <div key={i} className="glass-card p-4 flex items-center gap-3">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ background: `${s.color}22` }}
                >
                  {s.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-800">{s.title}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{s.ep}</p>
                </div>
                <button
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-white"
                  style={{ background: s.color }}
                  onClick={() => alert(`${s.title} — Coming with Backend! إن شاء الله`)}
                >
                  Watch
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Prayer Times */}
        {subTab === "prayers" && (
          <div className="px-3 py-3">
            <div className="glass-card-emerald p-4 text-center mb-4">
              <div className="text-3xl mb-1">🕌</div>
              <h3 className="text-base font-bold text-gray-800">Prayer Times</h3>
              <p className="text-xs text-gray-500">Based on your location</p>
            </div>
            <div className="space-y-2">
              {PRAYER_TIMES.map((p) => (
                <div
                  key={p.name}
                  className="glass-card p-4 flex items-center gap-4"
                  style={{ borderLeft: `3px solid ${p.color}` }}
                >
                  <span className="text-2xl">{p.icon}</span>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-gray-800">{p.name}</div>
                    <div className="font-arabic text-xs text-gray-500">{p.arabic}</div>
                  </div>
                  <div className="text-base font-bold" style={{ color: p.color }}>{p.time}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 glass-card p-4">
              <div className="font-arabic text-lg text-center font-bold text-gray-700" style={{ lineHeight: 2, color: "#007A5A" }}>
                اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ
              </div>
              <p className="text-xs text-center text-gray-500 mt-1">Allahumma salli ala Muhammad wa ala aali Muhammad</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
