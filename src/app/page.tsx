import Banner from '@/app/components/homepage/Banner';
import WorkoutLibrary from '@/app/components/homepage/WorkoutLibrary';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      <Banner />
      <WorkoutLibrary />
    </div>
  );
}