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
import { toast } from "sonner";
import { useAdminProfileUpdateMutation } from "@/redux/features/user/user.api";


function AdminProfileManagement() {
      const { data: myData } = useGetMeQuery(undefined);
      const [updateProfile, { isLoading,data }] = useAdminProfileUpdateMutation();
      console.log(data)
    
      const form = useForm({
        defaultValues: {
          name: "",
          phone: "",
          password: "",
        },
      });
    
      // Prefill form with current user data
      useEffect(() => {
        if (myData?.data) {
          form.reset({
            name: myData.data.name || "",
            phone: myData.data.phone || "",
            password: "",
          });
        }
      }, [myData, form]);
    
    const onSubmit = async (values: any) => {
      try {
        const payload = {
          name: values.name,
          phone: values.phone,
          ...(values.password ? { password: values.password } : {}),
        };
    
        const res = await updateProfile(payload).unwrap(); // ✅ No ID needed
        console.log(res, "res");
        toast.success("Profile updated successfully!");
      } catch (error: any) {
        toast.error(error?.message || "Failed to update profile");
      }
    };
  return (
     <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-md shadow-lg border border-gray-200 dark:border-gray-700 rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Profile Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
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

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+8801234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Change Password Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Leave blank to keep current" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

             

              <Button
                variant="outline"
                type="submit"
                disabled={isLoading}
                className="w-full py-3"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-gray-500">
            Update your profile information and password here.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default AdminProfileManagement