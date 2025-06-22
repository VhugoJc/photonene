import { motion } from "framer-motion";

export default function FuturisticSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-24 h-24 flex items-center justify-center"
      >
        {/* UFO Dome */}
        <svg width="96" height="96" viewBox="0 0 96 96" className="absolute inset-0">
          <ellipse cx="48" cy="56" rx="32" ry="12" fill="#222" opacity="0.7" />
          <ellipse cx="48" cy="40" rx="24" ry="10" fill="#39ff14" filter="url(#glow)" />
          <ellipse cx="48" cy="36" rx="14" ry="6" fill="#baffc9" opacity="0.8" />
          <g>
            <ellipse cx="48" cy="52" rx="20" ry="6" fill="#39ff14" opacity="0.5">
              <animate attributeName="rx" values="20;24;20" dur="1.2s" repeatCount="indefinite" />
            </ellipse>
          </g>
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
        {/* UFO Lights */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-[#39ff14] animate-pulse"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        {/* UFO Beam */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2"
          initial={{ opacity: 0.5, scaleY: 0.7 }}
          animate={{ opacity: [0.5, 0.8, 0.5], scaleY: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        >
          <svg width="24" height="48" viewBox="0 0 24 48">
            <polygon points="12,0 24,48 0,48" fill="#39ff14" opacity="0.12" />
          </svg>
        </motion.div>
      </motion.div>
      {/* Animated brand text, one word at a time */}
      <div className="mt-8 text-2xl font-bold tracking-tight text-[#39ff14] drop-shadow-lg text-center select-none flex gap-2">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Nature
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Tech
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          Growth
        </motion.span>
      </div>
    </div>
  );
}
