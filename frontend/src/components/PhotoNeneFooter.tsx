"use client";
import Link from "next/link";

interface PhotoNeneFooterProps {
  backHref: string;
  backLabel: string;
}

export default function PhotoNeneFooter({ backHref, backLabel }: PhotoNeneFooterProps) {
  return (
    <footer className="flex flex-col items-center gap-1 py-4 text-xs text-[#baffc9] border-t border-[#222] mt-5">
      <div>
        <Link href={backHref} className="hover:underline text-white">
          {backLabel}
        </Link>
      </div>
      <div className="flex items-center gap-3 mt-1">
        <a
          href="https://instagram.com/your_instagram"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="hover:text-[#39ff14] transition-colors"
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="inline-block align-middle">
            <rect x="2" y="2" width="20" height="20" rx="6" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="18" cy="6" r="1.5" />
          </svg>
        </a>
        <a
          href="https://tiktok.com/@your_tiktok"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
          className="hover:text-[#39ff14] transition-colors"
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="inline-block align-middle">
            <path d="M9 17a4 4 0 1 1 0-8v8zm0 0a4 4 0 0 0 4-4V3h3a5 5 0 0 0 5 5" />
          </svg>
        </a>
        <a
          href="https://linkedin.com/in/your_linkedin"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="hover:text-[#39ff14] transition-colors"
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="inline-block align-middle">
            <rect x="2" y="2" width="20" height="20" rx="4" />
            <path d="M7 10v7M7 7v.01M12 17v-4a2 2 0 1 1 4 0v4" />
          </svg>
        </a>
        <span>© 2025 Photo Nene</span>
      </div>
    </footer>
  );
}
