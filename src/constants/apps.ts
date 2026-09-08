import { AppItem } from "@/types";

export const SOCIAL_MEDIA_APPS: AppItem[] = [
  { id: "whatsapp", name: "WhatsApp", nameUr: "واٹس ایپ", icon: "💬", url: "https://web.whatsapp.com", category: "social", color: "#25D366" },
  { id: "youtube", name: "YouTube", nameUr: "یوٹیوب", icon: "▶️", url: "https://youtube.com", category: "social", color: "#FF0000" },
  { id: "facebook", name: "Facebook", nameUr: "فیس بک", icon: "👥", url: "https://facebook.com", category: "social", color: "#1877F2" },
  { id: "twitter", name: "Twitter X", nameUr: "ٹویٹر", icon: "𝕏", url: "https://x.com", category: "social", color: "#000000" },
  { id: "tiktok", name: "TikTok", nameUr: "ٹک ٹاک", icon: "🎵", url: "https://tiktok.com", category: "social", color: "#010101" },
  { id: "instagram", name: "Instagram", nameUr: "انسٹاگرام", icon: "📸", url: "https://instagram.com", category: "social", color: "#E4405F" },
  { id: "telegram", name: "Telegram", nameUr: "ٹیلیگرام", icon: "✈️", url: "https://telegram.org", category: "social", color: "#2AABEE" },
  { id: "snapchat", name: "Snapchat", icon: "👻", url: "https://snapchat.com", category: "social", color: "#FFFC00" },
];

export const AI_APPS: AppItem[] = [
  { id: "chatgpt", name: "ChatGPT", icon: "🤖", url: "https://chat.openai.com", category: "ai", color: "#10A37F" },
  { id: "gemini", name: "Gemini", icon: "✨", url: "https://gemini.google.com", category: "ai", color: "#4285F4" },
  { id: "claude", name: "Claude AI", icon: "🧠", url: "https://claude.ai", category: "ai", color: "#CC785C" },
  { id: "perplexity", name: "Perplexity", icon: "🔍", url: "https://perplexity.ai", category: "ai", color: "#1FB8CD" },
  { id: "qwen", name: "Q-wen", icon: "💡", url: "https://qwen.ai", category: "ai", color: "#6B4FBB" },
  { id: "grok", name: "Grok", icon: "⚡", url: "https://grok.x.ai", category: "ai", color: "#1D9BF0" },
  { id: "midjourney", name: "Midjourney", icon: "🎨", url: "https://midjourney.com", category: "ai", color: "#0F0F0F" },
  { id: "genspark", name: "GenSpark", icon: "🌟", url: "https://genspark.ai", category: "ai", color: "#FF6B35" },
];

export const HOSTING_APPS: AppItem[] = [
  { id: "netlify", name: "Netlify", icon: "🌐", url: "https://netlify.com", category: "hosting", color: "#00C7B7" },
  { id: "vercel", name: "Vercel", icon: "▲", url: "https://vercel.com", category: "hosting", color: "#000000" },
  { id: "github", name: "GitHub", icon: "🐙", url: "https://github.com", category: "hosting", color: "#181717" },
  { id: "firebase", name: "Firebase", icon: "🔥", url: "https://firebase.google.com", category: "hosting", color: "#FFCA28" },
  { id: "supabase", name: "Supabase", icon: "⚡", url: "https://supabase.com", category: "hosting", color: "#3ECF8E" },
  { id: "cloudflare", name: "Cloudflare", icon: "☁️", url: "https://cloudflare.com", category: "hosting", color: "#F6821F" },
  { id: "namecheap", name: "Namecheap", icon: "🏷️", url: "https://namecheap.com", category: "hosting", color: "#DE3723" },
  { id: "onspace", name: "OnSpace", icon: "🚀", url: "https://onspace.ai", category: "hosting", color: "#6C5CE7" },
];

export const WEBSITE_APPS: AppItem[] = [
  { id: "uniorbi", name: "UniOrbi", icon: "🌍", url: "https://uniorbi.com", category: "website", color: "#00C896" },
  { id: "drirfan", name: "Dr Irfan", icon: "👨‍⚕️", url: "https://drirfan.online", category: "website", color: "#E8003D" },
  { id: "wordpress", name: "WordPress", icon: "📝", url: "https://wordpress.com", category: "website", color: "#21759B" },
  { id: "google", name: "Google", icon: "🔵", url: "https://google.com", category: "website", color: "#4285F4" },
  { id: "gmail", name: "Gmail", icon: "📧", url: "https://gmail.com", category: "website", color: "#EA4335" },
  { id: "zoho", name: "Zoho", icon: "📊", url: "https://zoho.com", category: "website", color: "#E44D26" },
];

export const UNIORBI_BRANCHES: AppItem[] = [
  { id: "unifeel", name: "UniFeel", icon: "❤️", url: "https://unifeel.uniorbi.com", category: "uniorbi", color: "#FF6B8A" },
  { id: "uniedge", name: "UniEdge", icon: "⚡", url: "https://uniedge.uniorbi.com", category: "uniorbi", color: "#00C896" },
  { id: "uniweb", name: "UniWeb", icon: "🌐", url: "https://uniweb.uniorbi.com", category: "uniorbi", color: "#0088FF" },
  { id: "unihome", name: "UniHome", icon: "🏠", url: "https://unihome.uniorbi.com", category: "uniorbi", color: "#FF8C00" },
  { id: "unihost", name: "UniHost", icon: "🖥️", url: "https://unihost.uniorbi.com", category: "uniorbi", color: "#8B00FF" },
  { id: "unimail", name: "UniMail", icon: "📬", url: "https://unimail.uniorbi.com", category: "uniorbi", color: "#E8003D" },
  { id: "uninews", name: "UniNews", icon: "📰", url: "https://uninews.uniorbi.com", category: "uniorbi", color: "#CC0000" },
  { id: "uniflow", name: "UniFlow", icon: "🔄", url: "https://uniflow.uniorbi.com", category: "uniorbi", color: "#00A0CC" },
];

export const NEWS_TICKER_ITEMS = [
  "🌟 ES OneWorld — Neither a Global Village nor a Global Community, It's a Global Family Platform",
  "📡 Admin@drirfan.online | Contact@drirfan.online | Support@drirfan.online",
  "🕌 بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ — In the Name of Allah, the Most Gracious, the Most Merciful",
  "🌍 UniOrbi — Universal Orbit Platform @uniorbi.com",
  "✨ Smart World Order — Truth, Justice & Knowledge for the Global Family",
];

export const CONTACTS_INFO = [
  { label: "Admin", email: "Admin@drirfan.online" },
  { label: "Contact", email: "Contact@drirfan.online" },
  { label: "Info", email: "Info@drirfan.online" },
  { label: "Dr Irfan", email: "drirfan5577@drirfan.online" },
  { label: "Support", email: "Support@drirfan.online" },
];
