
import type { User, DietPlan, ExercisePlan } from "@shared/schema";
import { exercisesByGoal, schedulesByTime } from "./exercise-data";
import { mealsByPreference, caloriesByGoal } from "./diet-data";

export async function generatePlans(user: User): Promise<{
  dietPlan: DietPlan;
  exercisePlan: ExercisePlan;
}> {
  // Calculate base calories based on user data
  const bmr = user.gender === "male" 
    ? 88.362 + (13.397 * user.weight) + (4.799 * user.height) - (5.677 * user.age)
    : 447.593 + (9.247 * user.weight) + (3.098 * user.height) - (4.330 * user.age);

  // Adjust calories based on goal
  const goalMultiplier = caloriesByGoal[user.fitnessGoal]?.multiplier || 1;
  const targetCalories = Math.round(bmr * goalMultiplier);

  // Generate diet plan
  const availableMeals = mealsByPreference[user.dietPreference];
  const dietPlan: DietPlan = {
    meals: [
      {
        name: "Breakfast",
        time: "8:00 AM",
        foods: [availableMeals.Breakfast[0]]
      },
      {
        name: "Lunch",
        time: "1:00 PM",
        foods: [availableMeals.Lunch[0]]
      },
      {
        name: "Dinner",
        time: "7:00 PM",
        foods: [availableMeals.Dinner[0]]
      }
    ],
    totalCalories: targetCalories,
    macroSplit: { protein: 30, carbs: 40, fats: 30 }
  };

  // Generate exercise plan
  const exercises = exercisesByGoal[user.fitnessGoal] || exercisesByGoal["General Fitness"];
  const schedule = schedulesByTime[user.exerciseTime] || schedulesByTime["30-60 minutes"];

  const exercisePlan: ExercisePlan = {
    exercises: exercises,
    weeklySchedule: schedule,
    recommendedProgression: {
      weeks: 4,
      progressionType: user.fitnessGoal === "Weight Loss" ? "Intensity" : "Weight",
      nextLevel: ["Increase duration by 5 minutes", "Add one set to each exercise"]
    }
  };

  return { dietPlan, exercisePlan };
}
