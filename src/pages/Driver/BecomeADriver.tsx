/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useDriverRegisterMutation } from "@/redux/features/driver/driver.api";

const loginSchema = z.object({
  email: z.email(),
  plate: z.string().min(1, { error: "Car Plate is required" }),
  model: z.string().min(1, { error: "Car Model is required" }),
  color: z.string().min(1, { error: "Car Color is required" }),
  capacity: z.string().min(1, { error: "Car Capacity is required" }),
});
function BecomeADriver() {
  const [regiterDriver, { data }] = useDriverRegisterMutation();
  const navigate = useNavigate();
  console.log(data);
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      plate: "",
      model: "",
      color: "",
      capacity: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const userInfo = {
      vehicleInfo: {
        email: data.email,
        plate: data.plate,
        model: data.model,
        color: data.color,
        capacity: Number(data.capacity),
      },
    };

    try {
      await regiterDriver(userInfo).unwrap();

      toast.success("User Applied For Driver successfully");
      navigate("/", { replace: true });
      console.log(userInfo);
    } catch (error: any) {
      console.error("Login error:", error);
      console.log(error);
      toast.error(error.data?.message || "failed in creating driver account");
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
        <Card className="w-full max-w-md shadow-lg border border-gray-200 dark:border-gray-700 rounded-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Become A Driver
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john.doe@company.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="plate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Car Plate</FormLabel>
                      <FormControl>
                        <Input placeholder="" type="text" {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Car Model</FormLabel>
                      <FormControl>
                        <Input placeholder="" type="text" {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Car Color</FormLabel>
                      <FormControl>
                        <Input placeholder="" type="text" {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Car Capacity</FormLabel>
                      <FormControl>
                        <Input placeholder="" type="text" {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button variant="outline" type="submit" className="w-full py-3">
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default BecomeADriver;
