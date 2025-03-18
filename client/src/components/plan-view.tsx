import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import { FileDown } from "lucide-react";
import jsPDF from "jspdf";
import type { User } from "@shared/schema";

interface PlanViewProps {
  user: User;
}

export default function PlanView({ user }: PlanViewProps) {
  const [activeTab, setActiveTab] = useState("diet");

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text("Your Personalized Health Plan", 20, 20);
    
    // Add user info
    doc.setFontSize(12);
    doc.text(`Age: ${user.age}`, 20, 40);
    doc.text(`Weight: ${user.weight}kg`, 20, 50);
    doc.text(`Height: ${user.height}cm`, 20, 60);
    
    // Add diet plan
    doc.setFontSize(16);
    doc.text("Diet Plan", 20, 80);
    let y = 90;
    user.dietPlan?.meals.forEach(meal => {
      doc.setFontSize(14);
      doc.text(`${meal.name} - ${meal.time}`, 20, y);
      y += 10;
      meal.foods.forEach(food => {
        doc.setFontSize(12);
        doc.text(`- ${food.name}: ${food.portion} (${food.calories} cal)`, 30, y);
        y += 10;
      });
      y += 5;
    });
    
    // Add exercise plan
    doc.addPage();
    doc.setFontSize(16);
    doc.text("Exercise Plan", 20, 20);
    y = 30;
    user.exercisePlan?.exercises.forEach(exercise => {
      doc.setFontSize(12);
      doc.text(`- ${exercise.name}: ${exercise.duration} (${exercise.intensity})`, 20, y);
      y += 10;
    });
    
    doc.save("health-plan.pdf");
  };

  const caloriesData = user.dietPlan?.meals.map(meal => ({
    name: meal.name,
    calories: meal.foods.reduce((sum, food) => sum + food.calories, 0)
  })) || [];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your Health Plan</h1>
          <Button onClick={generatePDF}>
            <FileDown className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Daily Calories Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={caloriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="calories" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Profile Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2">
                <div>
                  <dt className="font-medium">Age</dt>
                  <dd>{user.age} years</dd>
                </div>
                <div>
                  <dt className="font-medium">Weight</dt>
                  <dd>{user.weight} kg</dd>
                </div>
                <div>
                  <dt className="font-medium">Height</dt>
                  <dd>{user.height} cm</dd>
                </div>
                <div>
                  <dt className="font-medium">Gender</dt>
                  <dd className="capitalize">{user.gender}</dd>
                </div>
                <div>
                  <dt className="font-medium">Profession</dt>
                  <dd>{user.profession}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="diet">Diet Plan</TabsTrigger>
            <TabsTrigger value="exercise">Exercise Plan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="diet">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {user.dietPlan?.meals.map((meal, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="text-lg font-semibold">{meal.name} - {meal.time}</h3>
                      <ul className="space-y-1">
                        {meal.foods.map((food, foodIndex) => (
                          <li key={foodIndex} className="flex justify-between">
                            <span>{food.name} - {food.portion}</span>
                            <span className="text-muted-foreground">{food.calories} cal</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="exercise">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {user.exercisePlan?.exercises.map((exercise, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{exercise.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {exercise.duration} - {exercise.intensity}
                        </p>
                      </div>
                      {exercise.sets && exercise.reps && (
                        <div className="text-sm">
                          {exercise.sets} sets × {exercise.reps} reps
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
