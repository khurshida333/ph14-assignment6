'use client';

import Image from 'next/image';
import { Calendar, Bookmark } from 'lucide-react';
import { IWorkout } from '@/types/workouts.type';
import { usePlan } from '@/context/PlanContext';

interface WorkoutDetailsCardProps {
  workout: IWorkout;
}

export default function WorkoutDetailsCard({ workout }: WorkoutDetailsCardProps) {
  const { todayPlan, addToTodayPlan, saveForLater } = usePlan();

  const muscleGroups = workout.muscleGroups || ['Chest', 'Arms'];

  // Check if this specific workout is currently in today's plan
  const isInTodayPlan = todayPlan.some((item) => item.id === workout.id);
  
  // Check if the 5-lift cap is reached
  const isPlanFull = todayPlan.length >= 5;

  // Disable only if it's already in the plan OR if the plan is full (and this item isn't already added)
  const isDisabled = isInTodayPlan || (isPlanFull && !isInTodayPlan);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side — Visual / Media */}
        <div className="lg:col-span-6 relative w-full h-[550px] sm:h-[680px] bg-[#15171c] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={workout.image || '/hero-workout.png'}
            alt={workout.name}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Right Side — Content & Sections */}
        <div className="lg:col-span-6 flex flex-col">
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black uppercase text-white tracking-tight mb-3">
            {workout.name}
          </h1>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-5">
            {workout.description ||
              'A compound press that builds chest thickness, triceps, and pressing power from a stable bench.'}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {muscleGroups.map((group, idx) => (
              <span
                key={idx}
                className="bg-[#ccff00] text-black font-extrabold text-xs tracking-wider uppercase px-3.5 py-1 rounded-full"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Key Specs Table */}
          <div className="bg-[#15171c] border border-white/10 rounded-2xl overflow-hidden mb-8">
            <div className="divide-y divide-white/5 text-xs sm:text-sm">
              <div className="flex items-center justify-between px-6 py-4">
                <span className="text-gray-400 font-bold tracking-wider uppercase">Equipment</span>
                <span className="text-white font-semibold">{workout.equipment || 'Barbell, Bench'}</span>
              </div>
              <div className="flex items-center justify-between px-6 py-4">
                <span className="text-gray-400 font-bold tracking-wider uppercase">Difficulty</span>
                <span className="text-white font-semibold">{workout.difficulty || 'Intermediate'}</span>
              </div>
              <div className="flex items-center justify-between px-6 py-4">
                <span className="text-gray-400 font-bold tracking-wider uppercase">Sets</span>
                <span className="text-white font-semibold">{workout.sets || 4}</span>
              </div>
              <div className="flex items-center justify-between px-6 py-4">
                <span className="text-gray-400 font-bold tracking-wider uppercase">Reps</span>
                <span className="text-white font-semibold">{workout.reps || '6-8'}</span>
              </div>
              <div className="flex items-center justify-between px-6 py-4">
                <span className="text-gray-400 font-bold tracking-wider uppercase">Duration</span>
                <span className="text-white font-semibold">{workout.duration || 25} min</span>
              </div>
              <div className="flex items-center justify-between px-6 py-4">
                <span className="text-gray-400 font-bold tracking-wider uppercase">Calories</span>
                <span className="text-white font-semibold">{workout.caloriesBurned || 180} kcal</span>
              </div>
              <div className="flex items-center justify-between px-6 py-4">
                <span className="text-gray-400 font-bold tracking-wider uppercase">Rating</span>
                <span className="text-white font-semibold">{workout.rating || 4.8}</span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-8">
            <h3 className="text-white font-black text-sm tracking-widest uppercase mb-4">
              Instructions
            </h3>
            <ol className="space-y-3 text-gray-300 text-sm">
              {(
                workout.instructions || [
                  'Lie on the bench with eyes under the bar and feet planted.',
                  'Unrack with locked elbows and lower the bar to mid-chest.',
                  'Press up in a slight arc until elbows lock without bouncing.',
                  'Keep shoulder blades pinched and a natural arch in the back.',
                ]
              ).map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-gray-500 font-bold flex-shrink-0">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Call-To-Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-white/10">
            <button
              onClick={() => addToTodayPlan(workout)}
              disabled={isDisabled}
              className={`w-full sm:w-auto flex-1 font-extrabold text-xs tracking-wider uppercase px-6 py-4 rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-lg ${
                isDisabled
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-60'
                  : 'bg-[#ccff00] hover:bg-[#b8e600] text-black active:scale-95 cursor-pointer'
              }`}
            >
              <Calendar className="w-4 h-4" />
              {isInTodayPlan
                ? 'Already in today\'s plan'
                : isPlanFull
                ? 'Plan Full for today'
                : 'Add to today\'s plan'}
            </button>

            <button
              onClick={() => saveForLater(workout)}
              className="w-full sm:w-auto flex-1 bg-[#15171c] hover:bg-[#1c1f26] border border-white/20 text-white font-extrabold text-xs tracking-wider uppercase px-6 py-4 rounded-xl flex items-center justify-center gap-2.5 transition-all active:scale-95 cursor-pointer"
            >
              <Bookmark className="w-4 h-4" />
              Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}