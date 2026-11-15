import WorkoutDetailsCard from '@/app/components/shared/WorkoutDetailsCard';
import { IWorkout } from '@/types/workouts.type';
import Link from 'next/link';

async function getWorkoutById(id: string): Promise<IWorkout | null> {
  try {
    const res = await fetch('https://api.abcz.workers.dev/api/fitlog', {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    const workouts: IWorkout[] = Array.isArray(data) ? data : data.workouts || data.data || [];
    return workouts.find((w) => String(w.id) === String(id)) || null;
  } catch (error) {
    console.error('Error fetching workout details:', error);
    return null;
  }
}

export default async function WorkoutDetailsPage({
  params,
}: {
  params: { workoutId: string };
}) {
  const { workoutId } = await params;
  const workout = await getWorkoutById(workoutId);

  if (!workout) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-black text-white uppercase mb-4">Workout Not Found</h2>
        <p className="text-gray-400 text-sm mb-8">The requested lift does not exist in our library.</p>
        <Link
          href="/"
          className="bg-[#ccff00] text-black font-bold text-xs uppercase px-6 py-3 rounded-lg"
        >
          Back to Library
        </Link>
      </div>
    );
  }

  return <WorkoutDetailsCard workout={workout} />;
}