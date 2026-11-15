import { Oswald } from 'next/font/google';
import Image from 'next/image';
import bannerImg from '@/assets/banner.png';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['700'],
});

export default function Banner() {
  return (
    <section className="w-full bg-[#15171c] border border-white/10 rounded-2xl px-6 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Content - Expanded max-w for wider headline flow */}
        <div className="w-full lg:max-w-2xl text-left">
          {/* Eyebrow Text */}
          <p className="text-[#ccff00] text-xs font-bold tracking-widest uppercase mb-3">
            WORKOUT LIBRARY
          </p>

          {/* Main Heading */}
          <h1
            className={`${oswald.className} text-4xl sm:text-5xl lg:text-[56px] font-bold text-white uppercase leading-[1.05] tracking-tight mb-5`}
          >
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          {/* Primary CTA Anchor Link */}
          <a
            href="#library"
            className="btn bg-[#ccff00] hover:bg-[#b8e600] text-black border-none font-bold text-xs tracking-wider uppercase px-6 h-11 min-h-0 rounded-md inline-flex items-center gap-2 transition-colors"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
            BROWSE WORKOUTS
          </a>
        </div>

        {/* Right Hero Image with Floating Animation & Minimalist Glow */}
        <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md flex justify-center lg:justify-end">
          <div className="animate-float">
            <Image
              src={bannerImg}
              alt="Preacher curl anatomy illustration"
              priority
              className="w-full h-auto object-contain select-none [filter:drop-shadow(0_0_1px_rgba(204,255,0,0.6))_drop-shadow(0_0_8px_rgba(204,255,0,0.2))] transition-all duration-300 hover:[filter:drop-shadow(0_0_2px_rgba(204,255,0,0.8))_drop-shadow(0_0_12px_rgba(204,255,0,0.35))]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}