import type { User, DietPlan, ExercisePlan } from "@shared/schema";

function getExercisesByCondition(user: User) {
  const { handicap, diseases, fitnessGoal, exerciseTime } = user;

  try {
    console.log("Generating exercises for user with conditions:", { handicap, diseases, fitnessGoal, exerciseTime });

    const lowImpactExercises = [
      {
        name: "Swimming",
        duration: "30 minutes",
        intensity: "Low to Moderate",
        targetMuscleGroups: ["Full Body"],
        technique: "Focus on fluid movements and proper breathing"
      },
      {
        name: "Seated Exercises",
        duration: "20 minutes",
        intensity: "Low",
        sets: 3,
        reps: 10,
        targetMuscleGroups: ["Upper Body", "Core"],
        technique: "Maintain proper posture throughout",
        restPeriod: "60 seconds"
      },
      {
        name: "Stretching",
        duration: "15 minutes",
        intensity: "Low",
        targetMuscleGroups: ["Full Body"],
        technique: "Hold each stretch for 15-30 seconds"
      }
    ];

    const cardioExercises = [
      {
        name: "Walking",
        duration: "30 minutes",
        intensity: "Moderate",
        targetMuscleGroups: ["Lower Body", "Cardiovascular"],
        technique: "Maintain brisk pace"
      },
      {
        name: "Cycling",
        duration: "20 minutes",
        intensity: "Moderate to High",
        targetMuscleGroups: ["Lower Body", "Cardiovascular"],
        technique: "Keep consistent cadence"
      },
      {
        name: "Swimming",
        duration: "30 minutes",
        intensity: "Moderate",
        targetMuscleGroups: ["Full Body", "Cardiovascular"],
        technique: "Focus on stroke efficiency"
      }
    ];

    const strengthExercises = [
      {
        name: "Push-ups",
        duration: "15 minutes",
        intensity: "High",
        sets: 3,
        reps: 12,
        targetMuscleGroups: ["Chest", "Shoulders", "Triceps"],
        technique: "Keep core tight, maintain straight back",
        restPeriod: "90 seconds"
      },
      {
        name: "Squats",
        duration: "15 minutes",
        intensity: "High",
        sets: 3,
        reps: 15,
        targetMuscleGroups: ["Quadriceps", "Hamstrings", "Glutes"],
        technique: "Keep weight in heels, knees in line with toes",
        restPeriod: "90 seconds"
      },
      {
        name: "Dumbbell Rows",
        duration: "15 minutes",
        intensity: "High",
        sets: 3,
        reps: 12,
        targetMuscleGroups: ["Back", "Biceps"],
        technique: "Keep back straight, squeeze shoulder blades",
        restPeriod: "90 seconds"
      }
    ];

    const flexibilityExercises = [
      {
        name: "Yoga",
        duration: "20 minutes",
        intensity: "Low to Moderate",
        targetMuscleGroups: ["Full Body", "Core"],
        technique: "Focus on breathing and form"
      },
      {
        name: "Dynamic Stretching",
        duration: "15 minutes",
        intensity: "Low",
        targetMuscleGroups: ["Full Body"],
        technique: "Controlled movements through full range of motion"
      }
    ];

    // Handle physical limitations first
    if (handicap !== "None") {
      console.log("User has physical limitations:", handicap);
      switch (handicap) {
        case "Mobility Impairment":
          return [...lowImpactExercises];
        case "Visual Impairment":
          return [...lowImpactExercises.filter(e => e.name !== "Swimming")];
        default:
          return [...lowImpactExercises];
      }
    }

    // Check for medical conditions
    if (diseases?.some(d => ["Heart Disease", "Arthritis", "Back Pain"].includes(d))) {
      console.log("User has medical conditions that require low-impact exercises");
      return [...lowImpactExercises, ...flexibilityExercises];
    }

    // Create exercise plan based on goals
    let exercises = [];
    console.log("Generating exercises based on fitness goal:", fitnessGoal);
    switch (fitnessGoal) {
      case "Weight Loss":
        exercises = [...cardioExercises, ...strengthExercises.slice(0, 2)];
        break;
      case "Weight Gain":
      case "Muscle Building":
        exercises = [...strengthExercises, ...cardioExercises.slice(0, 1)];
        break;
      case "Endurance":
        exercises = [...cardioExercises, ...lowImpactExercises.slice(0, 1)];
        break;
      case "Flexibility":
        exercises = [...flexibilityExercises, ...lowImpactExercises];
        break;
      case "Strength Training":
        exercises = [...strengthExercises, ...cardioExercises.slice(0, 1)];
        break;
      default:
        exercises = [...cardioExercises, ...strengthExercises.slice(0, 2)];
    }

    // Adjust exercise duration based on available time
    const timeMultiplier = {
      "15-30 minutes": 0.5,
      "30-60 minutes": 1,
      "1-2 hours": 1.5,
      "More than 2 hours": 2
    }[exerciseTime] || 1;

    console.log("Adjusting exercise durations with multiplier:", timeMultiplier);
    return exercises.map(exercise => ({
      ...exercise,
      duration: exercise.duration.includes("minutes") 
        ? `${Math.round(parseInt(exercise.duration) * timeMultiplier)} minutes`
        : exercise.duration
    }));
  } catch (error) {
    console.error("Error in getExercisesByCondition:", error);
    throw error;
  }
}

function convertToKg(weight: number, unit: string): number {
  return unit === 'lbs' ? weight * 0.45359237 : weight;
}

export async function generatePlans(user: User): Promise<{
  dietPlan: DietPlan;
  exercisePlan: ExercisePlan;
}> {
  try {
    console.log("Starting plan generation for user:", user);

    // Convert weight to kg for calculations if needed
    const weightInKg = convertToKg(user.weight, user.weightUnit);

    // Calculate BMR using Harris-Benedict equation with weight in kg
    const bmr = calculateBMR({ ...user, weight: weightInKg });
    console.log("Calculated BMR:", bmr);

    // Get appropriate exercises based on user's conditions and goals
    const exercises = getExercisesByCondition(user);
    console.log("Generated exercises:", exercises);

    // Generate exercise plan
    const exercisePlan: ExercisePlan = {
      exercises,
      weeklySchedule: {
        Monday: exercises.slice(0, 2).map(e => e.name),
        Wednesday: exercises.slice(1, 3).map(e => e.name),
        Friday: exercises.slice(0, 2).map(e => e.name),
        Saturday: exercises.slice(1, 3).map(e => e.name)
      },
      recommendedProgression: {
        weeks: 8,
        progressionType: "Linear",
        nextLevel: exercises.map(e => `Advanced ${e.name}`)
      }
    };

    // Generate diet plan
    const meals = generateMeals(bmr, user.fitnessGoal, user.dietPreference);
    console.log("Generated meals:", meals);

    // Calculate total macros
    const totalMacros = {
      protein: 0,
      carbs: 0,
      fats: 0
    };

    meals.forEach(meal => {
      meal.foods.forEach(food => {
        totalMacros.protein += food.macros.protein;
        totalMacros.carbs += food.macros.carbs;
        totalMacros.fats += food.macros.fats;
      });
    });

    const dietPlan: DietPlan = {
      meals,
      totalCalories: meals.reduce((sum, meal) => 
        sum + meal.foods.reduce((mealSum, food) => mealSum + food.calories, 0), 0
      ),
      macroSplit: totalMacros
    };

    console.log("Generated complete plans:", { dietPlan, exercisePlan });
    return { dietPlan, exercisePlan };
  } catch (error) {
    console.error("Error in generatePlans:", error);
    throw error;
  }
}

function calculateBMR(user: User): number {
  const { weight, height, age, gender } = user;

  if (gender === "male") {
    return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }
}

function generateMeals(bmr: number, goal: string, dietPreference: string): DietPlan['meals'] {
  try {
    console.log("Generating meals with params:", { bmr, goal, dietPreference });

    // Get food database based on diet preference
    const foodDatabase = getFoodDatabase(dietPreference);

    return [
      {
        name: "Breakfast",
        time: "8:00 AM",
        foods: generateFoodsForMeal(bmr * 0.3, foodDatabase)
      },
      {
        name: "Lunch",
        time: "1:00 PM",
        foods: generateFoodsForMeal(bmr * 0.35, foodDatabase)
      },
      {
        name: "Dinner",
        time: "7:00 PM",
        foods: generateFoodsForMeal(bmr * 0.35, foodDatabase)
      }
    ];
  } catch (error) {
    console.error("Error in generateMeals:", error);
    throw error;
  }
}

function getFoodDatabase(dietPreference: string) {
  const commonFoods = [
    {
      name: "Oatmeal",
      portion: "1 cup",
      calories: 300,
      macros: { protein: 10, carbs: 54, fats: 5 }
    },
    {
      name: "Brown Rice",
      portion: "1 cup",
      calories: 216,
      macros: { protein: 5, carbs: 45, fats: 2 }
    },
    {
      name: "Mixed Vegetables",
      portion: "2 cups",
      calories: 100,
      macros: { protein: 4, carbs: 20, fats: 0 }
    }
  ];

  const veganFoods = [
    {
      name: "Tofu",
      portion: "150g",
      calories: 180,
      macros: { protein: 20, carbs: 2, fats: 11 }
    },
    {
      name: "Lentils",
      portion: "1 cup",
      calories: 230,
      macros: { protein: 18, carbs: 40, fats: 1 }
    }
  ];

  const vegetarianFoods = [
    ...veganFoods,
    {
      name: "Greek Yogurt",
      portion: "1 cup",
      calories: 130,
      macros: { protein: 12, carbs: 8, fats: 4 }
    },
    {
      name: "Cottage Cheese",
      portion: "1 cup",
      calories: 220,
      macros: { protein: 24, carbs: 8, fats: 10 }
    }
  ];

  const nonVegFoods = [
    {
      name: "Chicken Breast",
      portion: "6oz",
      calories: 280,
      macros: { protein: 35, carbs: 0, fats: 6 }
    },
    {
      name: "Salmon",
      portion: "6oz",
      calories: 354,
      macros: { protein: 34, carbs: 0, fats: 20 }
    },
    {
      name: "Egg Whites",
      portion: "1 cup",
      calories: 126,
      macros: { protein: 26, carbs: 2, fats: 0 }
    }
  ];

  switch (dietPreference) {
    case "Vegan":
      return [...commonFoods, ...veganFoods];
    case "Vegetarian":
      return [...commonFoods, ...vegetarianFoods];
    case "Non-Vegetarian":
      return [...commonFoods, ...vegetarianFoods, ...nonVegFoods];
    default:
      return [...commonFoods, ...vegetarianFoods, ...nonVegFoods];
  }
}

function generateFoodsForMeal(
  targetCalories: number,
  foodDatabase: Array<{
    name: string;
    portion: string;
    calories: number;
    macros: { protein: number; carbs: number; fats: number };
  }>
): DietPlan['meals'][0]['foods'] {
  try {
    console.log("Generating foods for meal with calories:", targetCalories);
    let remainingCalories = targetCalories;
    const foods = [];

    while (remainingCalories > 100 && foods.length < 3) {
      const food = foodDatabase[Math.floor(Math.random() * foodDatabase.length)];
      if (food.calories <= remainingCalories) {
        foods.push(food);
        remainingCalories -= food.calories;
      }
    }

    return foods;
  } catch (error) {
    console.error("Error in generateFoodsForMeal:", error);
    throw error;
  }
}