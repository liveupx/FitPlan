import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const professions = [
  "Student",
  "Office Worker",
  "Teacher",
  "Healthcare Worker",
  "Construction Worker",
  "IT Professional",
  "Sales",
  "Service Industry",
  "Retired",
  "Homemaker",
  "Other"
] as const;

export const diseasesList = [
  "None",
  "Diabetes",
  "Heart Disease",
  "Hypertension",
  "Arthritis",
  "Asthma",
  "Back Pain",
  "Other"
] as const;

export const handicapsList = [
  "None",
  "Mobility Impairment",
  "Visual Impairment",
  "Hearing Impairment",
  "Cognitive Impairment",
  "Other"
] as const;

export const fitnessGoals = [
  "Weight Loss",
  "Weight Gain",
  "Muscle Building",
  "Endurance",
  "General Fitness",
  "Flexibility",
  "Strength Training",
  "Body Recomposition"
] as const;

export const exerciseTimeRanges = [
  "15-30 minutes",
  "30-60 minutes",
  "1-2 hours",
  "More than 2 hours"
] as const;

export const dietPreferences = [
  "Normal",
  "Vegetarian",
  "Vegan",
  "Non-Vegetarian"
] as const;

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  age: integer("age").notNull(),
  weight: integer("weight").notNull(),
  weightUnit: text("weight_unit").notNull(),
  height: integer("height").notNull(),
  gender: text("gender").notNull(),
  diseases: text("diseases").array(),
  handicap: text("handicap").notNull(),
  profession: text("profession").notNull(),
  fitnessGoal: text("fitness_goal").notNull(),
  exerciseTime: text("exercise_time").notNull(),
  dietPreference: text("diet_preference").notNull(),
  dietPlan: jsonb("diet_plan"),
  exercisePlan: jsonb("exercise_plan")
});

export const insertUserSchema = createInsertSchema(users)
  .extend({
    age: z.number()
      .min(13, "Must be at least 13 years old")
      .max(100, "Age cannot exceed 100 years"),
    weight: z.number()
      .min(20, "Weight seems too low")
      .max(500, "Weight seems too high"),
    weightUnit: z.enum(["kg", "lbs"]),
    height: z.number()
      .min(100, "Height seems too low (min 100cm)")
      .max(250, "Height seems too high (max 250cm)"),
    gender: z.enum(["male", "female", "other"]),
    diseases: z.array(z.enum(diseasesList)).default([]),
    handicap: z.enum(handicapsList),
    profession: z.enum(professions),
    fitnessGoal: z.enum(fitnessGoals),
    exerciseTime: z.enum(exerciseTimeRanges),
    dietPreference: z.enum(dietPreferences)
  })
  .omit({ id: true, dietPlan: true, exercisePlan: true });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type DietPlan = {
  meals: {
    name: string;
    time: string;
    foods: Array<{
      name: string;
      portion: string;
      calories: number;
      macros: {
        protein: number;
        carbs: number;
        fats: number;
      };
    }>;
  }[];
  totalCalories: number;
  macroSplit: {
    protein: number;
    carbs: number;
    fats: number;
  };
};

export type ExercisePlan = {
  exercises: Array<{
    name: string;
    duration: string;
    intensity: string;
    targetMuscleGroups: string[];
    sets?: number;
    reps?: number;
    restPeriod?: string;
    technique?: string;
  }>;
  weeklySchedule: Record<string, string[]>;
  recommendedProgression: {
    weeks: number;
    progressionType: string;
    nextLevel: string[];
  };
};