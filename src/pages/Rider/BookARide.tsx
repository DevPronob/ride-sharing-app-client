/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { upazillas, districts } from "bd-geojs";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import LocationInput from "@/components/ui/LocationInput";
import { useRideRequestMutation } from "@/redux/features/ride/ride.api";


const rideSchema = z.object({
  pickup: z.string().min(3, "Pickup location is required"),
  drop: z.string().min(3, "Drop location is required"),
});

export default function BookARide() {
    const [rideRequest, {data}] = useRideRequestMutation();
    console.log(data);

  const form = useForm({
    resolver: zodResolver(rideSchema),
    defaultValues: {
      pickup: "",
      drop: ""
    },
  });

  const onSubmit = async (formData: z.infer<typeof rideSchema>) => {
    console.log(formData,"form data");
    const pickup = formData.pickup.split("→").pop()?.trim() || "";
    const drop = formData.drop.split("→").pop()?.trim() || "";
    console.log("Pickup:", pickup, "Drop:", drop);
    console.log("Form Data:", pickup, drop);
   const pickupData = districts.find(
  (d) => d.name.toLowerCase().trim() === pickup.toLowerCase().trim()
);
const dropData = districts.find(
  (d) => d.name.toLowerCase().trim() === drop.toLowerCase().trim()
);
    console.log(pickupData,"Pickup Data", dropData ,"Drop Data");
    console.log("Pickup Data:",data);
    const pickupLocation = {
        lat: Number(pickupData?.lat) || 0,
        lng: Number(pickupData?.lon) || 0,
        address: formData.pickup,
    }
    console.log("Pickup Location:", pickupLocation);
    const dropLocation = {
        lat: Number(dropData?.lat) || 0,
        lng: Number(dropData?.lon) || 0,
        address: formData.drop,
    }
    console.log("Drop Location:", dropLocation);
    // Here you will integrate Google Places API or similar to get lat/lng
    // const payload = {
    //   pickupAddress: formData.pickup,
    //   pickupLat: 23.8103, // Replace with fetched lat
    //   pickupLng: 90.4125, // Replace with fetched lng
    //   dropAddress: formData.drop,
    //   dropLat: 23.7956,
    //   dropLng: 90.4033,
    //   district: formData.district,
    //   union: formData.union,
    // };
    const rideData = {
        pickupLocation: pickupLocation,
        destinationLocation: dropLocation,
    }
console.log(rideData,"Ride Data");
    try {
     const res = await rideRequest(rideData).unwrap();
     console.log(res,"res")
      toast.success("Ride booked successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Ride booking failed");
      console.error("Ride booking error:", error);
      console.log(error,"error")
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md shadow-lg border border-gray-200 dark:border-gray-700 rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Book a Ride
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="pickup"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pickup Location</FormLabel>
                    <FormControl>
                      <LocationInput
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="drop"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Drop Location</FormLabel>
                    <FormControl>
                      <LocationInput
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant="secondary" type="submit" className="w-full py-3 text-gray-900  border border-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
                Book Ride
              </Button>
            </form>         
          </Form>
        </CardContent>
        <CardFooter />
      </Card>
    </div>
  );
}
