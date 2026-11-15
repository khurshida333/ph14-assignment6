'use client';

import React, { createContext, useContext, useState } from 'react';
import { IWorkout } from '@/types/workouts.type';

interface PlanContextType {
  todayPlan: IWorkout[];
  savedWorkouts: IWorkout[];
  completedIds: (string | number)[];
  addToTodayPlan: (workout: IWorkout) => void;
  saveForLater: (workout: IWorkout) => void;
  removeFromTodayPlan: (id: string | number) => void;
  removeFromSaved: (id: string | number) => void;
  toggleMarkAsDone: (id: string | number) => void;
  toastMessage: string | null;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [todayPlan, setTodayPlan] = useState<IWorkout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<IWorkout[]>([]);
  const [completedIds, setCompletedIds] = useState<(string | number)[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addToTodayPlan = (workout: IWorkout) => {
    if (todayPlan.length >= 5) {
      showToast('Plan is full (Max 5 lifts)');
      return;
    }
    if (!todayPlan.some((item) => item.id === workout.id)) {
      setTodayPlan([...todayPlan, workout]);
      showToast("Added to today's plan");
    } else {
      showToast("Already in today's plan");
    }
  };

  const saveForLater = (workout: IWorkout) => {
    if (!savedWorkouts.some((item) => item.id === workout.id)) {
      setSavedWorkouts([...savedWorkouts, workout]);
      showToast('Saved for later');
    } else {
      showToast('Already saved');
    }
  };

  const removeFromTodayPlan = (id: string | number) => {
    setTodayPlan(todayPlan.filter((item) => item.id !== id));
    // Also remove from completed if it was marked done
    setCompletedIds(completedIds.filter((item) => item !== id));
    showToast('Removed from today\'s plan');
  };

  const removeFromSaved = (id: string | number) => {
    setSavedWorkouts(savedWorkouts.filter((item) => item.id !== id));
    showToast('Removed from saved');
  };

  const toggleMarkAsDone = (id: string | number) => {
    if (completedIds.includes(id)) {
      setCompletedIds(completedIds.filter((item) => item !== id));
      showToast('Marked as pending');
    } else {
      setCompletedIds([...completedIds, id]);
      showToast('Workout marked as done');
    }
  };

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedWorkouts,
        completedIds,
        addToTodayPlan,
        saveForLater,
        removeFromTodayPlan,
        removeFromSaved,
        toggleMarkAsDone,
        toastMessage,
      }}
    >
      {children}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#ccff00] text-black px-5 py-3 rounded-xl font-bold text-sm shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 flex items-center gap-2.5">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          {toastMessage}
        </div>
      )}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) throw new Error('usePlan must be used within a PlanProvider');
  return context;
}