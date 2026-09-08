import { useState } from "react";
import { useAppStore } from "@/stores/appStore";
import { THEMES } from "@/constants/themes";
import { LANGUAGES } from "@/constants/languages";
import type { ChatMessage, Contact } from "@/types";

const MOCK_CONTACTS: Contact[] = [
  { id: "1", name: "Dr Irfan Q. Thaheem", avatar: "👨‍⚕️", lastMessage: "السلام علیکم ورحمۃ اللہ", time: "9:41 AM", unread: 3, online: true },
  { id: "2", name: "UniOrbi Team", avatar: "🌍", lastMessage: "New update deployed ✅", time: "8:30 AM", unread: 1, online: true },
  { id: "3", name: "ES OneWorld Family", avatar: "⭐", lastMessage: "Welcome to the Global Family!", time: "Yesterday", unread: 0, online: false },
  { id: "4", name: "Islamic Hub", avatar: "🕌", lastMessage: "Quran Surah Al-Fatiha added", time: "Yesterday", unread: 5, online: false },
  { id: "5", name: "Smart World News", avatar: "📰", lastMessage: "Breaking: New developments...", time: "Mon", unread: 0, online: true },
  { id: "6", name: "Admin Support", avatar: "🔐", lastMessage: "Your request has been processed", time: "Sun", unread: 0, online: false },
];

const MOCK_MESSAGES: ChatMessage[] = [
  { id: "1", text: "السلام علیکم ورحمۃ اللہ وبرکاتہ 🌟", sender: "other", time: "9:38 AM", status: "read" },
  { id: "2", text: "وعلیکم السلام ورحمۃ اللہ 💚", sender: "me", time: "9:39 AM", status: "read" },
  { id: "3", text: "Welcome to ES OneWorld — the Global Family Platform!", sender: "other", time: "9:40 AM", status: "read" },
  { id: "4", text: "جزاک اللہ خیر! This platform is amazing. May Allah bless this project 🤲", sender: "me", time: "9:40 AM", status: "delivered" },
  { id: "5", text: "إن شاء الله — Amin! 🙏 The Paradise section has the complete Holy Quran with audio.", sender: "other", time: "9:41 AM", status: "read" },
];

type SubTab = "chats" | "calls" | "live" | "media";

export default function GuestRoom() {
  const { activeTheme, language } = useAppStore();
  const theme = THEMES.find(t => t.id === activeTheme) || THEMES[0];
  const t = LANGUAGES[language];
  const [subTab, setSubTab] = useState<SubTab>("chats");
  const [activeChat, setActiveChat] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);
  const [draft, setDraft] = useState("");

  const sendMessage = () => {
    if (!draft.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      text: draft.trim(),
      sender: "me",
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    };
    setMessages((prev) => [...prev, newMsg]);
    setDraft("");
    setTimeout(() => {
      const reply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "إن شاء الله — Thank you for your message! 🌟",
        sender: "other",
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        status: "read",
      };
      setMessages((prev) => [...prev, reply]);
    }, 1200);
  };

  const SUB_TABS: { id: SubTab; icon: string; label: string }[] = [
    { id: "chats", icon: "💬", label: t.chats },
    { id: "calls", icon: "📞", label: t.calls },
    { id: "live", icon: "📡", label: "Live" },
    { id: "media", icon: "🖼️", label: "Media" },
  ];

  return (
    <div className="page-container">
      {/* Sub Tabs */}
      <div className="flex gap-1 px-3 py-2 border-b border-white/60 flex-shrink-0">
        {SUB_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setSubTab(tab.id); setActiveChat(null); }}
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
      {subTab === "chats" && !activeChat && (
        <div className="flex-1 panel-scroll px-3 py-2">
          <div className="space-y-1.5">
            {MOCK_CONTACTS.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setActiveChat(contact)}
                className="w-full flex items-center gap-3 p-3 rounded-2xl bg-white/80 hover:bg-white/95 border border-white/80 transition-all duration-200 hover:shadow-glass text-left"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-100 to-blue-100 flex items-center justify-center text-xl shadow-glass">
                    {contact.avatar}
                  </div>
                  {contact.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-semibold text-gray-800 truncate">{contact.name}</span>
                    <span className="text-[10px] text-gray-400 flex-shrink-0 ml-2">{contact.time}</span>
                  </div>
                  <div className="flex justify-between items-center mt-0.5">
                    <span className="text-xs text-gray-500 truncate">{contact.lastMessage}</span>
                    {contact.unread > 0 && (
                      <span
                        className="w-5 h-5 rounded-full text-[10px] text-white font-bold flex items-center justify-center flex-shrink-0 ml-2"
                        style={{ background: theme.accentHex }}
                      >
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Window */}
      {subTab === "chats" && activeChat && (
        <div className="flex-1 flex flex-col min-h-0">
          <div
            className="flex items-center gap-3 px-3 py-2.5 border-b flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.9)", borderColor: "rgba(255,255,255,0.8)" }}
          >
            <button onClick={() => setActiveChat(null)} className="text-lg text-gray-500 hover:text-gray-700 transition-colors">←</button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-100 to-blue-100 flex items-center justify-center text-lg">
              {activeChat.avatar}
            </div>
            <div>
              <div className="text-sm font-bold text-gray-800">{activeChat.name}</div>
              <div className="text-[10px]" style={{ color: theme.accentHex }}>
                {activeChat.online ? "● Online" : "○ Offline"}
              </div>
            </div>
            <div className="ml-auto flex gap-2">
              <button className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-base hover:bg-emerald-100 transition-colors">📞</button>
              <button className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-base hover:bg-blue-100 transition-colors">📹</button>
            </div>
          </div>

          <div className="flex-1 panel-scroll px-3 py-3 flex flex-col gap-2">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                <div className={msg.sender === "me" ? "chat-bubble-out" : "chat-bubble-in"}>
                  <p className="text-sm text-gray-800">{msg.text}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-[9px] text-gray-400">{msg.time}</span>
                    {msg.sender === "me" && (
                      <span className="text-[9px]" style={{ color: msg.status === "read" ? theme.accentHex : "#aaa" }}>
                        {msg.status === "read" ? "✓✓" : msg.status === "delivered" ? "✓✓" : "✓"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 px-3 py-2.5 border-t flex-shrink-0" style={{ background: "rgba(255,255,255,0.92)", borderColor: "rgba(255,255,255,0.8)" }}>
            <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-base transition-colors flex-shrink-0">📎</button>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder={t.typeMessage}
              className="flex-1 px-3 py-2 rounded-2xl text-sm border-2 outline-none bg-white/90"
              style={{ borderColor: "rgba(200,200,220,0.5)" }}
            />
            <button
              onClick={sendMessage}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm transition-all duration-200 hover:opacity-90 active:scale-95 flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${theme.accentHex}, ${theme.accentHex}cc)` }}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Calls Tab */}
      {subTab === "calls" && (
        <div className="flex-1 panel-scroll px-3 py-4">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2 animate-float">📞</div>
            <h3 className="text-lg font-bold text-gray-700">Audio & Video Calls</h3>
            <p className="text-sm text-gray-500 mt-1">HD quality voice & video calling</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: "📞", label: "Voice Call", color: "#00C896" },
              { icon: "📹", label: "Video Call", color: "#0088FF" },
              { icon: "👥", label: "Group Call", color: "#8B00FF" },
              { icon: "📡", label: "Live Stream", color: "#E8003D" },
            ].map((item) => (
              <button
                key={item.label}
                className="glass-card p-4 flex flex-col items-center gap-2 text-center hover:shadow-glass-lg transition-all duration-200 active:scale-95"
                onClick={() => alert(`${item.label} — Coming with Backend Integration! إن شاء الله`)}
              >
                <span className="text-3xl">{item.icon}</span>
                <span className="text-sm font-semibold" style={{ color: item.color }}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Live Tab */}
      {subTab === "live" && (
        <div className="flex-1 panel-scroll px-3 py-4">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2 animate-pulse">📡</div>
            <h3 className="text-lg font-bold text-gray-700">Live Streaming</h3>
          </div>
          <div className="glass-card-emerald p-4 mb-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-red-600">LIVE</span>
              <span className="ml-auto text-xs text-gray-500">128 viewers</span>
            </div>
            <div className="h-32 rounded-xl bg-gradient-to-br from-emerald-100 to-blue-100 flex items-center justify-center">
              <span className="text-4xl">🌍</span>
            </div>
            <p className="text-sm font-semibold text-gray-700 mt-2">ES OneWorld — Global Family Stream</p>
          </div>
          <button
            className="w-full py-3 rounded-2xl text-white font-bold transition-all duration-200 hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #E8003D, #FF4466)" }}
            onClick={() => alert("Live Streaming — Coming with Backend! إن شاء الله")}
          >
            🔴 Start Live Stream
          </button>
        </div>
      )}

      {/* Media Tab */}
      {subTab === "media" && (
        <div className="flex-1 panel-scroll px-3 py-3">
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                style={{
                  background: `linear-gradient(135deg, hsl(${i * 30}, 70%, 90%), hsl(${i * 30 + 60}, 60%, 95%))`,
                }}
              >
                <div className="w-full h-full flex items-center justify-center text-3xl">
                  {["🌟", "🌙", "🌍", "🕌", "💫", "🌺", "📿", "🌸", "💎", "🌊", "🔮", "🌈"][i]}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
