
import type { DietPlan } from "@shared/schema";

export const mealsByPreference = {
  "Normal": {
    Breakfast: [
      { name: "Oatmeal with Fruits", portion: "1 bowl", calories: 350, macros: { protein: 12, carbs: 45, fats: 9 } },
      { name: "Eggs and Toast", portion: "2 eggs, 2 slices", calories: 400, macros: { protein: 20, carbs: 35, fats: 15 } }
    ],
    Lunch: [
      { name: "Grilled Chicken Salad", portion: "1 large bowl", calories: 450, macros: { protein: 35, carbs: 25, fats: 20 } },
      { name: "Turkey Sandwich", portion: "1 sandwich", calories: 400, macros: { protein: 25, carbs: 45, fats: 12 } }
    ],
    Dinner: [
      { name: "Salmon with Rice", portion: "200g salmon, 1 cup rice", calories: 550, macros: { protein: 40, carbs: 45, fats: 22 } },
      { name: "Lean Beef Stir Fry", portion: "300g", calories: 500, macros: { protein: 35, carbs: 40, fats: 20 } }
    ]
  },
  "Vegetarian": {
    Breakfast: [
      { name: "Greek Yogurt Parfait", portion: "300g", calories: 300, macros: { protein: 15, carbs: 40, fats: 8 } },
      { name: "Smoothie Bowl", portion: "1 bowl", calories: 350, macros: { protein: 12, carbs: 50, fats: 7 } }
    ],
    Lunch: [
      { name: "Quinoa Buddha Bowl", portion: "1 large bowl", calories: 450, macros: { protein: 20, carbs: 55, fats: 15 } },
      { name: "Lentil Soup", portion: "300ml", calories: 380, macros: { protein: 18, carbs: 45, fats: 10 } }
    ],
    Dinner: [
      { name: "Tofu Stir Fry", portion: "300g", calories: 400, macros: { protein: 25, carbs: 40, fats: 18 } },
      { name: "Black Bean Burrito", portion: "1 large", calories: 500, macros: { protein: 20, carbs: 65, fats: 15 } }
    ]
  },
  "Vegan": {
    Breakfast: [
      { name: "Chia Seed Pudding", portion: "250g", calories: 300, macros: { protein: 12, carbs: 40, fats: 15 } },
      { name: "Tofu Scramble", portion: "200g", calories: 280, macros: { protein: 15, carbs: 20, fats: 18 } }
    ],
    Lunch: [
      { name: "Chickpea Curry", portion: "300g", calories: 400, macros: { protein: 15, carbs: 50, fats: 12 } },
      { name: "Tempeh Bowl", portion: "350g", calories: 450, macros: { protein: 25, carbs: 45, fats: 20 } }
    ],
    Dinner: [
      { name: "Lentil Pasta", portion: "250g", calories: 420, macros: { protein: 20, carbs: 60, fats: 8 } },
      { name: "Mushroom Risotto", portion: "300g", calories: 380, macros: { protein: 12, carbs: 55, fats: 10 } }
    ]
  }
};

export const caloriesByGoal = {
  "Weight Loss": { multiplier: 0.8 },
  "Weight Gain": { multiplier: 1.2 },
  "Muscle Building": { multiplier: 1.1 },
  "General Fitness": { multiplier: 1.0 }
};
