import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import UserForm from "@/components/user-form";
import { DumbbellIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <DumbbellIcon className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold">FitPlan Pro</h1>
            </div>
            <p className="text-muted-foreground">
              Create your personalized diet and exercise plan
            </p>
          </CardHeader>
          <CardContent>
            <UserForm />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
