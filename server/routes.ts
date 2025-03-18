import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";
import { generatePlans } from "../client/src/lib/plan-generator";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/users", async (req, res) => {
    try {
      console.log("Creating user with data:", req.body);
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);

      try {
        // Generate personalized plans
        console.log("Generating plans for user:", user.id);
        const { dietPlan, exercisePlan } = await generatePlans(user);
        console.log("Generated plans:", { dietPlan, exercisePlan });

        // Update user with generated plans
        const updatedUser = await storage.updateUserPlans(user.id, dietPlan, exercisePlan);
        console.log("Updated user with plans:", updatedUser);

        res.json(updatedUser);
      } catch (planError) {
        console.error("Error generating or updating plans:", planError);
        // Return the user even if plan generation fails
        res.json(user);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(400).json({ error: "Invalid user data" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      console.log("Fetching user:", req.params.id);
      const user = await storage.getUser(Number(req.params.id));
      if (!user) {
        console.log("User not found:", req.params.id);
        res.status(404).json({ error: "User not found" });
        return;
      }
      console.log("Found user:", user);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Failed to fetch user data" });
    }
  });

  app.put("/api/users/:id/plans", async (req, res) => {
    try {
      const { dietPlan, exercisePlan } = req.body;
      const user = await storage.updateUserPlans(
        Number(req.params.id),
        dietPlan,
        exercisePlan
      );
      res.json(user);
    } catch (error) {
      console.error("Error updating plans:", error);
      res.status(400).json({ error: "Invalid plan data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}