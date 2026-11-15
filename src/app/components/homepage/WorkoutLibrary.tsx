import { IWorkout } from '@/types/workouts.type';
import WorkoutCard from '../shared/WorkoutCard';

async function getWorkouts() {
  try {
    const res = await fetch('https://api.abcz.workers.dev/api/fitlog', {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Failed to fetch workouts');
    }
    const data = await res.json();
    return Array.isArray(data) ? data : data.workouts || data.data || [];
  } catch (error) {
    console.error('Error fetching workouts:', error);
    return [];
  }
}

export default async function WorkoutLibrary() {
  const workouts = await getWorkouts();

  return (
    <section id="library" className="w-full py-16 scroll-mt-24">
      {/* Section Header */}
      <div className="mb-10">
        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-2">
          THE LIBRARY
        </h2>
        <p className="text-gray-400 text-sm sm:text-base">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* Responsive 3-Column Grid */}
      {workouts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout: IWorkout) => (
            <WorkoutCard key={workout.id || workout.name} workout={workout} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#15171c] border border-white/10 rounded-2xl">
          <p className="text-gray-400 text-sm">
            Loading workouts or checking API connection...
          </p>
        </div>
      )}
    </section>
  );
}