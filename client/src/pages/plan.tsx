import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import PlanView from "@/components/plan-view";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { User } from "@shared/schema";

export default function Plan() {
  const { id } = useParams();

  const { data: user, isLoading, error } = useQuery<User>({
    queryKey: ["/api/users", id],
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
          <AlertDescription>Failed to load plan</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>User not found</AlertDescription>
        </Alert>
      </div>
    );
  }

  return <PlanView user={user} />;
}