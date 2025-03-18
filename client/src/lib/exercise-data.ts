
import type { ExercisePlan } from "@shared/schema";

export const exercisesByGoal = {
  "Weight Loss": [
    { name: "Running", duration: "30 minutes", intensity: "High", targetMuscleGroups: ["Legs", "Core"], technique: "Start with a light jog, gradually increase pace" },
    { name: "HIIT Training", duration: "20 minutes", intensity: "High", targetMuscleGroups: ["Full Body"], technique: "30 seconds high intensity, 30 seconds rest" },
    { name: "Jump Rope", duration: "15 minutes", intensity: "High", targetMuscleGroups: ["Legs", "Shoulders"], technique: "Keep a steady rhythm" },
    { name: "Burpees", duration: "10 minutes", intensity: "High", targetMuscleGroups: ["Full Body"], sets: 3, reps: 10 }
  ],
  "Muscle Building": [
    { name: "Bench Press", duration: "15 minutes", intensity: "High", targetMuscleGroups: ["Chest", "Triceps"], sets: 4, reps: 8, technique: "Keep back flat on bench" },
    { name: "Squats", duration: "20 minutes", intensity: "High", targetMuscleGroups: ["Legs"], sets: 4, reps: 10, technique: "Keep back straight" },
    { name: "Deadlifts", duration: "20 minutes", intensity: "High", targetMuscleGroups: ["Back", "Legs"], sets: 4, reps: 8, technique: "Hinge at hips" }
  ],
  "General Fitness": [
    { name: "Walking", duration: "30 minutes", intensity: "Moderate", targetMuscleGroups: ["Legs"], technique: "Maintain steady pace" },
    { name: "Swimming", duration: "30 minutes", intensity: "Moderate", targetMuscleGroups: ["Full Body"], technique: "Focus on breathing rhythm" },
    { name: "Yoga", duration: "45 minutes", intensity: "Low", targetMuscleGroups: ["Full Body"], technique: "Focus on breathing and form" }
  ],
  "Endurance": [
    { name: "Long Distance Running", duration: "60 minutes", intensity: "Moderate", targetMuscleGroups: ["Legs"], technique: "Maintain steady pace" },
    { name: "Cycling", duration: "60 minutes", intensity: "Moderate", targetMuscleGroups: ["Legs"], technique: "Keep consistent cadence" },
    { name: "Swimming Laps", duration: "45 minutes", intensity: "Moderate", targetMuscleGroups: ["Full Body"], technique: "Alternate strokes" }
  ]
};

export const schedulesByTime = {
  "15-30 minutes": {
    Monday: ["Core Workout"],
    Wednesday: ["Cardio"],
    Friday: ["Strength Training"]
  },
  "30-60 minutes": {
    Monday: ["Strength Training", "Cardio"],
    Wednesday: ["HIIT", "Core"],
    Friday: ["Full Body Workout"],
    Saturday: ["Active Recovery"]
  },
  "1-2 hours": {
    Monday: ["Strength Training", "Cardio", "Flexibility"],
    Tuesday: ["HIIT"],
    Wednesday: ["Strength Training", "Core"],
    Thursday: ["Cardio"],
    Friday: ["Full Body Workout"],
    Saturday: ["Active Recovery", "Flexibility"]
  }
};
