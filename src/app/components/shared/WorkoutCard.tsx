'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock, Flame, Star } from 'lucide-react';
import { IWorkout } from '@/types/workouts.type';

interface WorkoutCardProps {
  workout: IWorkout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  // Use muscleGroups directly from IWorkout
  const tags = workout.muscleGroups || ['WORKOUT'];

  const workoutId = workout.id || 1;
  const workoutImage = workout.image || '/hero-workout.png';
  const workoutCalories = workout.caloriesBurned || 180;

  return (
    <Link
      href={`/workoutDetails/${workoutId}`}
      className="group bg-[#15171c] border border-white/10 rounded-2xl overflow-hidden hover:border-[#ccff00]/50 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Card Image */}
      <div className="relative w-full h-48 sm:h-52 bg-[#101216] overflow-hidden">
        <Image
          src={workoutImage}
          alt={workout.name || 'Workout'}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Muscle Groups Tag Pills */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-[#ccff00] text-black font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Workout Name */}
          <h3 className="text-white font-black text-lg uppercase tracking-tight mb-1 group-hover:text-[#ccff00] transition-colors">
            {workout.name}
          </h3>

          {/* Equipment Line */}
          <p className="text-gray-400 text-xs mb-6">
            {workout.equipment || 'Standard Equipment'}
          </p>
        </div>

        {/* Stats Row matching Figma */}
        <div className="flex items-center gap-5 pt-4 border-t border-white/10 text-gray-400 text-xs">
          {/* Duration */}
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{workout.duration ? `${workout.duration} min` : '25 min'}</span>
          </div>

          {/* Solid Flame Calories Icon */}
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 fill-current" />
            <span>{workoutCalories} kcal</span>
          </div>

          {/* Outlined Star Rating */}
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4" />
            <span>{workout.rating || '4.8'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}