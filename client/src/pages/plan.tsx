
import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import PlanView from "@/components/plan-view";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { User } from "@shared/schema";

export default function Plan() {
  const { id } = useParams();

  const { data: user, isLoading, error } = useQuery<User>({
    queryKey: ["/api/users", id],
    queryFn: async () => {
      const response = await fetch(`/api/users/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to load user data: ${response.statusText}`);
      }
      return response.json();
    }
  });

  if (isLoading) {
    return (
      <div className="p-8">
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : "Failed to load plan"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Not Found</AlertTitle>
          <AlertDescription>User not found</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!user.dietPlan || !user.exercisePlan) {
    return (
      <div className="p-8">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Plan Generation in Progress</AlertTitle>
          <AlertDescription>
            Your personalized plan is being generated. Please refresh the page in a few moments.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <PlanView user={user} />;
}
