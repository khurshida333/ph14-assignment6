import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0d0e12] border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <svg
            className="w-5 h-5 text-[#ccff00] -rotate-45 transition-transform group-hover:rotate-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6.5 6.5 11 11" />
            <path d="m21 21-1-1" />
            <path d="m3 3 1 1" />
            <path d="m18 22 4-4" />
            <path d="m2 6 4-4" />
            <path d="m3 10 7-7" />
            <path d="m14 21 7-7" />
          </svg>
          <span className="text-white font-black tracking-wider text-base uppercase">
            FITLOG
          </span>
        </Link>

        {/* Right: Copyright & Tagline */}
        <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}