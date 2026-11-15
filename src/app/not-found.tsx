import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-32 text-center flex flex-col items-center justify-center">
      <h1 className="text-6xl font-black text-[#ccff00] mb-4">404</h1>
      <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Page Not Found</h2>
      <p className="text-gray-400 text-sm max-w-md mb-8">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs tracking-wider uppercase px-8 py-4 rounded-xl transition-all shadow-lg active:scale-95"
      >
        Back to Workouts
      </Link>
    </div>
  );
}