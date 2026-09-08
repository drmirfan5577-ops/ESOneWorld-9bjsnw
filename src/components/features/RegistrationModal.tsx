import { useState } from "react";
import { useAppStore } from "@/stores/appStore";
import { THEMES } from "@/constants/themes";

type Step = "phone" | "otp" | "profile" | "success";

export default function RegistrationModal() {
  const { registrationOpen, setRegistrationOpen, activeTheme } = useAppStore();
  const theme = THEMES.find(t => t.id === activeTheme) || THEMES[0];
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [generatedOtp] = useState("1122");

  if (!registrationOpen) return null;

  const sendOtp = () => {
    if (phone.length >= 10) {
      setStep("otp");
    }
  };

  const verifyOtp = () => {
    if (otp === generatedOtp || otp.length === 4) {
      setStep("profile");
    }
  };

  const completeProfile = () => {
    if (name.trim()) {
      setStep("success");
      setTimeout(() => {
        setRegistrationOpen(false);
        setStep("phone");
        setPhone("");
        setOtp("");
        setName("");
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setRegistrationOpen(false)} />
      <div
        className="relative w-full max-w-sm mx-4 rounded-3xl p-6 animate-fade-up"
        style={{
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(40px)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.2)",
        }}
      >
        <button
          onClick={() => setRegistrationOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
        >✕</button>

        <div className="text-center mb-6">
          <div className="text-4xl mb-2">⭐</div>
          <h3 className="text-lg font-black text-gray-800">Join ES OneWorld</h3>
          <p className="text-xs text-gray-500">Global Family Platform</p>
        </div>

        {/* Progress */}
        <div className="flex gap-1.5 mb-6">
          {(["phone", "otp", "profile"] as Step[]).map((s, i) => (
            <div
              key={s}
              className="flex-1 h-1.5 rounded-full transition-all duration-300"
              style={{
                background: ["phone", "otp", "profile", "success"].indexOf(step) >= i
                  ? theme.accentHex
                  : "#e5e7eb"
              }}
            />
          ))}
        </div>

        {step === "phone" && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">📱 Mobile Number</label>
              <div className="flex gap-2">
                <div className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 text-gray-600 flex-shrink-0">+92</div>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
                  className="flex-1 px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm outline-none"
                  placeholder="3XX XXXXXXX"
                  type="tel"
                  inputMode="numeric"
                  maxLength={11}
                />
              </div>
            </div>
            <button
              onClick={sendOtp}
              className="w-full py-3 rounded-2xl text-white font-bold text-sm hover:opacity-90 active:scale-95 transition-all"
              style={{ background: `linear-gradient(135deg, ${theme.accentHex}, ${theme.accentHex}cc)` }}
            >
              📨 Send OTP
            </button>
          </div>
        )}

        {step === "otp" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 text-center">OTP sent to <strong>+92{phone}</strong></p>
            <p className="text-xs text-center text-gray-400">(Demo OTP: <strong>1122</strong>)</p>
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">🔢 Enter OTP</label>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
                className="w-full px-3 py-3 rounded-2xl border-2 border-gray-200 text-xl text-center tracking-[0.5em] font-bold outline-none"
                placeholder="_ _ _ _"
                type="tel"
                inputMode="numeric"
                maxLength={4}
                style={{ letterSpacing: "0.5em" }}
              />
            </div>
            <button
              onClick={verifyOtp}
              className="w-full py-3 rounded-2xl text-white font-bold text-sm hover:opacity-90 transition-opacity"
              style={{ background: `linear-gradient(135deg, ${theme.accentHex}, ${theme.accentHex}cc)` }}
            >
              ✅ Verify OTP
            </button>
            <button onClick={() => setStep("phone")} className="w-full text-xs text-gray-500 hover:text-gray-700">
              ← Change Number
            </button>
          </div>
        )}

        {step === "profile" && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">👤 Your Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm outline-none"
                placeholder="Enter your full name"
              />
            </div>
            <button
              onClick={completeProfile}
              className="w-full py-3 rounded-2xl text-white font-bold text-sm hover:opacity-90 transition-opacity"
              style={{ background: `linear-gradient(135deg, ${theme.accentHex}, ${theme.accentHex}cc)` }}
            >
              🌍 Join Global Family
            </button>
          </div>
        )}

        {step === "success" && (
          <div className="text-center py-4">
            <div className="text-5xl mb-3 animate-bounce">🎉</div>
            <h4 className="text-base font-black text-gray-800">Welcome to the Family!</h4>
            <p className="text-xs text-gray-500 mt-1">السلام علیکم ورحمۃ اللہ</p>
            <div className="mt-3 text-xs font-semibold" style={{ color: theme.accentHex }}>
              Redirecting...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
