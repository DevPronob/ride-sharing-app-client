/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import { useEffect } from "react";
import { useGetDriverByIdQuery, useUpdateDriverMutation } from "@/redux/features/driver/driver.api";
import { toast } from "sonner";

function DriverProfileManagement() {
  const { data: userData } = useGetMeQuery(undefined);
  const { data: driverData } = useGetDriverByIdQuery(userData?.data._id);
  const [updateDriver] =useUpdateDriverMutation()

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      plate: "",
      model: "",
      color: "",
      capacity: "",
    },
  });

  useEffect(() => {
    if (driverData?.data) {
      const { user, vehicleInfo } = driverData.data;
      form.reset({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        password: "",
        plate: vehicleInfo?.plate || "",
        model: vehicleInfo?.model || "",
        color: vehicleInfo?.color || "",
        capacity: vehicleInfo?.capacity?.toString() || "",
      });
    }
  }, [driverData, form]);

  const onSubmit = async (values: any) => {
    try {
      console.log(values, "Updated Values");
      await updateDriver(values)
      toast.success("Profile updated successfully!");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error:any) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-md shadow-lg border border-gray-200 dark:border-gray-700 rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Driver Profile Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email" {...field}  />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input  {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="plate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plate</FormLabel>
                    <FormControl>
                      <Input placeholder="Vehicle plate" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Input placeholder="Vehicle model" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Input placeholder="Vehicle color" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacity</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Capacity" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant="outline"
                type="submit"
                className="w-full py-3"
              >
                Save Changes
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-gray-500">
            Update your driver and vehicle details here.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default DriverProfileManagement;
