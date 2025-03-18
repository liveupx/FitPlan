import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { insertUserSchema, type InsertUser, professions, diseasesList, handicapsList, fitnessGoals, exerciseTimeRanges, dietPreferences } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function UserForm() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<InsertUser>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      age: 0,
      weight: 0,
      weightUnit: "kg",
      height: 0,
      gender: "male",
      diseases: [],
      handicap: "None",
      profession: "Other",
      fitnessGoal: "General Fitness",
      exerciseTime: "30-60 minutes",
      dietPreference: "Normal"
    },
  });


  const createUser = useMutation({
    mutationFn: async (data: InsertUser) => {
      console.log("Submitting user data:", data);
      const res = await apiRequest("POST", "/api/users", data);
      return res.json();
    },
    onSuccess: (data) => {
      console.log("Successfully created user:", data);
      toast({
        title: "Success!",
        description: "Your plan is being generated",
      });
      setLocation(`/plan/${data.id}`);
    },
    onError: (error) => {
      console.error("Error creating user:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create plan. Please try again.",
      });
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => createUser.mutate(data))} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age (13-100)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="13"
                    max="100"
                    {...field} 
                    onChange={(e) => field.onChange(parseInt(e.target.value, 10))} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value, 10))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weightUnit"
              render={({ field }) => (
                <FormItem className="w-24">
                  <FormLabel>Unit</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="lbs">lbs</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height (cm)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="100"
                    max="250"
                    {...field} 
                    onChange={(e) => field.onChange(parseInt(e.target.value, 10))} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="profession"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profession</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select profession" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {professions.map((profession) => (
                      <SelectItem key={profession} value={profession}>
                        {profession}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fitnessGoal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fitness Goal</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your goal" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {fitnessGoals.map((goal) => (
                      <SelectItem key={goal} value={goal}>
                        {goal}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="exerciseTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Available Exercise Time</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time per day" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {exerciseTimeRanges.map((timeRange) => (
                      <SelectItem key={timeRange} value={timeRange}>
                        {timeRange}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dietPreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diet Preference</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select diet preference" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {dietPreferences.map((pref) => (
                      <SelectItem key={pref} value={pref}>
                        {pref}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="handicap"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Physical Limitations</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select physical limitations" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {handicapsList.map((handicap) => (
                      <SelectItem key={handicap} value={handicap}>
                        {handicap}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="diseases"
            render={({field}) => (
              <FormItem>
                <FormLabel>Medical Conditions</FormLabel>
                <div className="grid grid-cols-2 gap-2">
                  {diseasesList.map((disease) => (
                    <FormField
                      key={disease}
                      control={form.control}
                      name="diseases"
                      render={({ field }) => (
                        <FormItem
                          key={disease}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(disease)}
                              onCheckedChange={(checked) => {
                                const updatedValue = checked
                                  ? [...(field.value || []), disease]
                                  : field.value?.filter((value) => value !== disease) || [];
                                field.onChange(updatedValue);
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {disease}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={createUser.isPending}>
          {createUser.isPending ? "Generating Plan..." : "Create Plan"}
        </Button>
      </form>
    </Form>
  );
}