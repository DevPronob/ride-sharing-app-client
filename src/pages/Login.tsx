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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "./../../node_modules/@hookform/resolvers/zod/src/zod";
import { toast } from "sonner";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { useNavigate } from "react-router";
import Password from "@/components/ui/Password";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, { error: "Password is too short" }),
});

function Login() {
  const [login, { data }] = useLoginMutation();
  const navigate = useNavigate();
  console.log(data);
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      await login(userInfo).unwrap();

      toast.success("User login successfully");
      navigate("/", { replace: true });
    } catch (error: any) {
      console.log("Login error:", error);
      console.error("Login error:", error);
      toast.error(error?.message || "Login failed");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md shadow-lg border border-gray-200 dark:border-gray-700 rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Create Your Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    <FormDescription className="sr-only text-red-500">
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Password {...field}/>
                      {/* <Input placeholder="" type="text" {...field} /> */}
                    </FormControl>
                    <FormDescription className="sr-only text-red-500">
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button variant="secondary" type="submit" className="w-full py-3 text-gray-900  border border-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
                Sign In
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
         <Button
  onClick={() => (window.location.href = "http://localhost:5000/api/v1/auth/google")}
  variant="outline"
  className="w-full py-3 flex items-center justify-center gap-2"
>
  Sign Up with Google
</Button>
        </CardFooter>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pb-4 mt-2">
          Dont have an account?{" "}
          <a
            href="/register"
            className="text-gray-800 font-bold hover:underline dark:text-blue-400"
          >
            Register
          </a>
        </div>
      </Card>
    </div>
  );
}

export default Login;
