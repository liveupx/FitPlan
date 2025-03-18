import { users, type User, type InsertUser, type DietPlan, type ExercisePlan } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserPlans(
    id: number,
    dietPlan: DietPlan,
    exercisePlan: ExercisePlan
  ): Promise<User>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    console.log("Getting user from storage:", id);
    const user = this.users.get(id);
    console.log("Found user:", user);
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    console.log("Creating user:", insertUser);
    const id = this.currentId++;
    const user: User = {
      ...insertUser,
      id,
      dietPlan: {},
      exercisePlan: {}
    };
    this.users.set(id, user);
    console.log("Created user:", user);
    return user;
  }

  async updateUserPlans(
    id: number,
    dietPlan: DietPlan,
    exercisePlan: ExercisePlan
  ): Promise<User> {
    console.log("Updating plans for user:", id);
    const user = await this.getUser(id);
    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = {
      ...user,
      dietPlan,
      exercisePlan
    };
    this.users.set(id, updatedUser);
    console.log("Updated user with plans:", updatedUser);
    return updatedUser;
  }
}

export const storage = new MemStorage();