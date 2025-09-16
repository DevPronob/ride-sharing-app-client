/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useId, useState } from "react";
import {
  useAcceptRideMutation,
  useGetAllRidesQuery,
} from "@/redux/features/ride/ride.api";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import {
  useChangeAvailablityMutation,
  useGetDriverByIdQuery,
} from "@/redux/features/driver/driver.api";
import { toast } from "sonner";

function RideManagement() {
  const { data: ridesData, isLoading } = useGetAllRidesQuery(undefined);
  const { data: userData } = useGetMeQuery(undefined);
  const { data: driverData } = useGetDriverByIdQuery(userData?.data?._id);
  console.log(driverData)

  const [changeAvailablity,{data:availablityData}] = useChangeAvailablityMutation();
  console.log(availablityData)
   const [acceptRide,{data:accpectData}] = useAcceptRideMutation();
  console.log(accpectData)

  const id = useId();
  const [checked, setChecked] = useState<boolean>(driverData?.data?.isOnline || false);

  useEffect(() => {
    setChecked(driverData?.data?.isOnline || false);
  }, [driverData]);

  const acceptRideByDriver = async (id: string) => {
    try {
      const res = await acceptRide(id).unwrap();
      toast.success("accept ride response")
      console.log("accept ride response", res);
    } catch (error:any) {
      console.error("error", error);
      toast.error(error?.message)
    }
  };

  const rides = ridesData?.data?.rides || [];
  const unassignedRides = rides.filter((ride: any) => !ride.driver);

  const changeOnlineStatus = async (isOnline: boolean) => {
    try {
      const res = await changeAvailablity({ isOnline }).unwrap();
      toast.success(`Driver is now ${isOnline ? "Online" : "Offline"}`)
      console.log(`Driver is now ${isOnline ? "Online" : "Offline"}`, res);
    } catch (error:any) {
      toast.error(error.message)
      console.error("error", error);
    }
  };

  return (
    <div>
      {/* Online/Offline Toggle */}
      <div className="inline-flex items-center gap-2 mb-4">
        <Switch
          id={id}
          className="sr-only"
          checked={checked}
          onCheckedChange={(val) => {
            setChecked(val);
            changeOnlineStatus(val);
          }}
          aria-label="Toggle switch"
        />
       <Button variant="outline" className="cursor-default">
         <Label htmlFor={id} className="text-sm font-medium">
          {checked ? "Online" : "Offline"}
        </Label>
       </Button>
      </div>

      {/* Rides Table */}
      <Table>
        <TableCaption>List of booked rides</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Rider Name</TableHead>
            <TableHead>Rider Email</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Pickup</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : checked && unassignedRides.length > 0 ? (
            unassignedRides.map((item: any) => (
              <TableRow key={item?._id}>
                <TableCell>{item?.rider?.name || "-"}</TableCell>
                <TableCell>{item?.rider?.email || "-"}</TableCell>
                <TableCell>
                  {moment(item?.createdAt).format("YYYY-MMM-DD h:mm A")}
                </TableCell>
                <TableCell>{item?.status || "-"}</TableCell>
                <TableCell>{item?.pickupLocation?.address || "-"}</TableCell>
                <TableCell>{item?.destinationLocation?.address || "-"}</TableCell>
                <TableCell className="text-right">
                  <Button
                    onClick={() => acceptRideByDriver(item?._id)}
                    variant="outline"
                    className="mx-1"
                  >
                    Accept
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-gray-500">
                {checked
                  ? "No rides found."
                  : "You are offline. Go online to see rides."}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default RideManagement;
