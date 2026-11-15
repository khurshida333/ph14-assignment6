export default function Loading() {
  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-white/10 border-t-[#ccff00] rounded-full animate-spin mb-4" />
      <p className="text-gray-400 font-bold text-xs uppercase tracking-widest animate-pulse">
        Loading FitLog…
      </p>
    </div>
  );
}