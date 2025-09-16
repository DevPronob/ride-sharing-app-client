import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form"
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
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from './../../node_modules/@hookform/resolvers/zod/src/zod';
import { toast } from "sonner";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { useNavigate } from "react-router";
import Password from "@/components/ui/Password";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, {
        error: "Name is too short",
      })
      .max(50),
    email: z.email(),
    phone:z.string(),
    password: z.string().min(8, { error: "Password is too short" }),
    confirmPassword: z
      .string()
      .min(8, { error: "Confirm Password is too short" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

function Register() {
    const [register] =useRegisterMutation()
     const navigate = useNavigate();
    const form =useForm({
        resolver: zodResolver(registerSchema),
        defaultValues:{
            name:"",
            email:"",
            password:"",
            confirmPassword:""
        }
    })
    const onSubmit =async(data: z.infer<typeof registerSchema>)=>{
        const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    console.log(userInfo)

    try {
        console.log(userInfo)
      await register(userInfo).unwrap();

      toast.success("User created successfully");
      navigate("/",{ replace: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      console.error('Login error:', error);
         toast.error(error?.message || "Login failed");
    }
    }
  return (
    <div className="flex  items-center justify-center min-h-screen  bg-gray-50 dark:bg-gray-900 px-4 ">
      <Card className="w-full my-8 max-w-md shadow-lg border border-gray-200 dark:border-gray-700 rounded-2xl">
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+880"
                      type="text"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                   <Password {...field}/>
                    {/* <Input placeholder="" type="text" {...field} /> */}
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
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                   <Password {...field}/>
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
           <Button variant="outline" type="submit" className="w-full py-3 text-gray-900  border border-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
            Sign Up
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
          Already have an account?{" "}
          <a
            href="/login"
            className="text-gray-800 font-bold hover:underline dark:text-blue-400"
          >
            Login
          </a>
        </div>
      </Card>
    </div>
  );
}

export default Register;
