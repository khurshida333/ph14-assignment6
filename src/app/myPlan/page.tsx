"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Flame,
  Star,
  Check,
  X,
  ChevronDown,
  Bookmark,
} from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { IWorkout } from "@/types/workouts.type";

type SortOption = "Duration" | "Calories" | "Rating";

export default function MyPlanPage() {
  const {
    todayPlan,
    savedWorkouts,
    completedIds,
    removeFromTodayPlan,
    removeFromSaved,
    toggleMarkAsDone,
  } = usePlan();

  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
  const [sortBy, setSortBy] = useState<SortOption>("Duration");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state on initial render
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Active list based on tab (preserves insertion/stacking order)
  const currentList = activeTab === "today" ? todayPlan : savedWorkouts;

  // Calculate Metrics Summary for Today's Plan
  const totalExercises = todayPlan.length;
  const totalMinutes = todayPlan.reduce(
    (acc, curr) => acc + (curr.duration || 0),
    0,
  );
  const totalCalories = todayPlan.reduce(
    (acc, curr) => acc + (curr.caloriesBurned || 0),
    0,
  );

  const [isSorted, setIsSorted] = useState(false);

  const sortedList = [...currentList].sort((a, b) => {
    if (!isSorted) return 0; // Keeps original stacking order until sorted
    if (sortBy === "Duration") return (b.duration || 0) - (a.duration || 0);
    if (sortBy === "Calories")
      return (b.caloriesBurned || 0) - (a.caloriesBurned || 0);
    if (sortBy === "Rating") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight mb-2">
          MY PLAN
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-[#15171c] border border-white/10 rounded-2xl p-6">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">
            Exercises
          </p>
          <p className="text-3xl sm:text-4xl font-black text-[#ccff00]">
            {totalExercises}
          </p>
        </div>
        <div className="bg-[#15171c] border border-white/10 rounded-2xl p-6">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">
            Minutes
          </p>
          <p className="text-3xl sm:text-4xl font-black text-white">
            {totalMinutes}
          </p>
        </div>
        <div className="bg-[#15171c] border border-white/10 rounded-2xl p-6">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">
            Calories
          </p>
          <p className="text-3xl sm:text-4xl font-black text-white">
            {totalCalories}
          </p>
        </div>
      </div>

      {/* Tabs & Sort Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        {/* Tabs */}
        <div className="flex items-center gap-2 bg-[#15171c] border border-white/10 p-1.5 rounded-xl">
          <button
            onClick={() => setActiveTab("today")}
            className={`px-6 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
              activeTab === "today"
                ? "bg-[#ccff00] text-black shadow-md"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-6 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
              activeTab === "saved"
                ? "bg-[#ccff00] text-black shadow-md"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span>Sort By</span>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-[#15171c] border border-white/10 hover:border-white/30 px-4 py-2.5 rounded-xl text-white font-bold flex items-center gap-3 transition-all min-w-[130px] justify-between"
            >
              <span>{sortBy}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-full min-w-[130px] bg-[#15171c] border border-white/10 rounded-xl shadow-xl z-30 overflow-hidden py-1">
              {(["Duration", "Calories", "Rating"] as SortOption[]).map(
                (option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortBy(option);
                      setIsSorted(true); // Activates sorting when user picks an option
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs font-bold uppercase transition-colors ${
                      sortBy === option
                        ? "bg-[#ccff00] text-black"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {option}
                  </button>
                ),
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      {isLoading ? (
        <div className="w-full py-24 text-center">
          <p className="text-gray-400 text-sm animate-pulse uppercase tracking-wider font-bold">
            Loading workouts…
          </p>
        </div>
      ) : sortedList.length === 0 ? (
        /* Empty State */
        <div className="w-full bg-[#15171c] border border-dashed border-white/15 rounded-3xl p-16 text-center flex flex-col items-center justify-center">
          <h3 className="text-white font-black text-2xl uppercase tracking-tight mb-2">
            NOTHING HERE YET
          </h3>
          <p className="text-gray-400 text-sm max-w-sm mb-8">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs tracking-wider uppercase px-8 py-4 rounded-xl transition-all shadow-lg active:scale-95"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        /* Workout List */
        <div className="space-y-4">
          {sortedList.map((workout: IWorkout) => {
            const isDone = completedIds.includes(workout.id);
            return (
              <div
                key={workout.id}
                className={`bg-[#15171c] border rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-all ${
                  isDone
                    ? "border-emerald-500/50 bg-emerald-950/10"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                {/* Left: Thumbnail & Details */}
                <div className="flex items-center gap-5 w-full sm:w-auto">
                  <div className="relative w-24 h-20 sm:w-28 sm:h-20 bg-[#101216] rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={workout.image || "/hero-workout.png"}
                      alt={workout.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-black text-base sm:text-lg uppercase tracking-tight mb-1">
                      {workout.name}
                    </h3>
                    <p className="text-gray-400 text-xs mb-3">
                      {workout.equipment || "Standard Equipment"}
                    </p>

                    {/* Stats Row */}
                    <div className="flex items-center gap-4 text-gray-400 text-xs">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{workout.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 fill-current" />
                        <span>{workout.caloriesBurned} kcal</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5" />
                        <span>{workout.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-white/10">
                  <Link
                    href={`/workoutDetails/${workout.id}`}
                    className="px-4 py-2.5 rounded-xl border border-white/15 text-gray-300 hover:text-white hover:bg-white/5 text-xs font-bold uppercase transition-all"
                  >
                    View Details
                  </Link>

                  {activeTab === "today" && (
                    <button
                      onClick={() => toggleMarkAsDone(workout.id)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase transition-all flex items-center gap-2 ${
                        isDone
                          ? "bg-emerald-500 text-black font-extrabold"
                          : "bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold"
                      }`}
                    >
                      <Check className="w-4 h-4" />
                      {isDone ? "Completed" : "Mark as Done"}
                    </button>
                  )}

                  <button
                    onClick={() => {
                      if (activeTab === "today") {
                        removeFromTodayPlan(workout.id);
                      } else {
                        removeFromSaved(workout.id);
                      }
                    }}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                    title="Remove"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
