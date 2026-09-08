import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import AppShell from "@/components/layout/AppShell";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30000 } },
});

function NotFound() {
  return (
    <div className="h-dvh flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-white to-emerald-50">
      <div className="text-6xl animate-float">🌍</div>
      <h1 className="text-2xl font-black text-gray-800">Page Not Found</h1>
      <a href="/" className="px-6 py-3 rounded-2xl text-white font-bold bg-emerald-500 hover:opacity-90 transition-opacity">
        ← Back to ES OneWorld
      </a>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppShell />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.8)",
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          },
        }}
      />
    </QueryClientProvider>
  );
}
