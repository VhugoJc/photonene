"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Starfield3D = dynamic(() => import("@/components/Starfield3D"), { ssr: false });

export default function HomeClient() {
  return (
    <div className="relative flex flex-col min-h-screen text-white font-[family-name:var(--font-geist-sans)]">
      {/* Minimal 3D background, subtle */}
      <div className="absolute inset-0 -z-10 opacity-40 pointer-events-none">
        <Starfield3D />
        {/* Futuristic animated grid background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-[pulse_8s_ease-in-out_infinite]">
            <g stroke="#39ff14" strokeWidth="0.7" opacity="0.18">
              {/* Vertical lines */}
              {Array.from({ length: 25 }).map((_, i) => (
                <line key={i} x1={i * 80} y1="0" x2={i * 80} y2="1080" />
              ))}
              {/* Horizontal lines */}
              {Array.from({ length: 14 }).map((_, i) => (
                <line key={100 + i} x1="0" y1={i * 80} x2="1920" y2={i * 80} />
              ))}
            </g>
            {/* Animated glowing ellipse */}
            <ellipse cx="960" cy="540" rx="400" ry="180" fill="none" stroke="#39ff14" strokeWidth="3" opacity="0.25">
              <animate attributeName="rx" values="400;500;400" dur="8s" repeatCount="indefinite" />
              <animate attributeName="ry" values="180;250;180" dur="8s" repeatCount="indefinite" />
            </ellipse>
          </svg>
        </div>
      </div>
      <header className="flex items-center justify-between px-6 py-6">
        <span className="text-2xl font-bold tracking-tight text-white">Photo Nene</span>
        <a href="/albums" className="text-[#39ff14] border border-[#39ff14] rounded-full px-4 py-1 text-sm hover:bg-[#39ff14] hover:text-black transition-colors">
          Albums
        </a>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight text-white"
        >
          Nature. Tech. Growth — Captured by El Nene.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-[#baffc9] text-lg max-w-xl mb-8"
        >
          Photo Nene blends nature, technology, and self-growth through a futuristic lens. Visual stories captured with purpose, energy, and evolution in every frame.
        </motion.p>
        <motion.a
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          href="/albums"
          className="inline-block border border-[#39ff14] rounded-full px-6 py-2 text-[#39ff14] hover:bg-[#39ff14] hover:text-black font-medium transition-colors"
        >
          View Albums
        </motion.a>
      </main>
      <footer className="flex flex-col items-center gap-2 py-4 text-xs text-[#baffc9] border-t border-[#222] mt-auto">
        <div className="flex gap-4 mb-1">
          <a href="https://instagram.com/your_instagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#39ff14] transition-colors">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="inline-block align-middle"><rect x="2" y="2" width="20" height="20" rx="6"/><circle cx="12" cy="12" r="5"/><circle cx="18" cy="6" r="1.5"/></svg>
          </a>
          <a href="https://tiktok.com/@your_tiktok" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:text-[#39ff14] transition-colors">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="inline-block align-middle"><path d="M9 17a4 4 0 1 1 0-8v8zm0 0a4 4 0 0 0 4-4V3h3a5 5 0 0 0 5 5"/></svg>
          </a>
          <a href="https://linkedin.com/in/your_linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[#39ff14] transition-colors">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="inline-block align-middle"><rect x="2" y="2" width="20" height="20" rx="4"/><path d="M7 10v7M7 7v.01M12 17v-4a2 2 0 1 1 4 0v4"/></svg>
          </a>
        </div>
        <span>© {new Date().getFullYear()} Photo Nene</span>
      </footer>
    </div>
  );
}
