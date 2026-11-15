'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePlan } from '@/context/PlanContext';

export default function Navbar() {
  const pathname = usePathname();
  const { todayPlan, savedWorkouts } = usePlan();

  return (
    <nav className="w-full bg-[#0d0e12] border-b border-white/10 sticky top-0 z-40 backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <svg
            className="w-6 h-6 text-[#ccff00] -rotate-45 transition-transform group-hover:rotate-0"
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
          <span className="text-white font-black tracking-wider text-lg uppercase">
            FITLOG
          </span>
        </Link>

        {/* Center Nav Links */}
        <div className="hidden sm:flex items-center gap-2 bg-[#15171c] border border-white/10 p-1 rounded-full">
          <Link
            href="/"
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase transition-all ${
              pathname === '/'
                ? 'bg-[#ccff00] text-black shadow-md'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/myPlan"
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase transition-all ${
              pathname === '/my-plan'
                ? 'bg-[#ccff00] text-black shadow-md'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Right Badges (Clickable Links to /my-plan) */}
        <div className="flex items-center gap-4 text-xs font-bold">
          <Link
            href="/myPlan"
            className="flex items-center gap-2 text-gray-300 hover:text-[#ccff00] transition-colors cursor-pointer group"
            title="View Today's Plan"
          >
            <span>Plan</span>
            <span className="w-6 h-6 rounded-full bg-[#ccff00] text-black flex items-center justify-center font-black group-hover:scale-105 transition-transform">
              {todayPlan.length}
            </span>
          </Link>

          <Link
            href="/myPlan"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors cursor-pointer group"
            title="View Saved Workouts"
          >
            <span>Saved</span>
            <span className="w-6 h-6 rounded-full bg-white/10 text-white border border-white/20 flex items-center justify-center font-black group-hover:border-white/50 transition-colors">
              {savedWorkouts.length}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}