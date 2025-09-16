/* eslint-disable @typescript-eslint/no-explicit-any */

import { useChangeStatusMutation, useGetActiveRidesByDriverQuery } from "@/redux/features/ride/ride.api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import moment from "moment";
import type { IRide, RideStatus } from "@/types/rides.types";
import { toast } from "sonner";

// List of all possible ride statuses
const rideStatuses: RideStatus[] = [
  "requested",
  "accepted",
  "picked_up",
  "in_transit",
  "completed",
  "cancelled",
];

function ActiveRide() {
  const { data: activeRides } = useGetActiveRidesByDriverQuery(undefined);
  console.log(activeRides,"aciveRides")
  const [changeStatus] =useChangeStatusMutation()
  const ride = activeRides?.data as IRide;

  // Function to handle ride status change (ready for API call)
  const handleStatusChange = async(newStatus: RideStatus,id:string) => {
   try {
    const res = await changeStatus({
      id: id,
      body: { status: newStatus }, 
    }).unwrap();
    toast.success("Ride status updated")

    console.log("Ride status updated:", res);
  } catch (error:any) {
    toast.error(error.message)
    console.error("Failed to update status:", error);
  }
  };

  return (
    <div className="p-4">
      <Table>
        <TableCaption>Active Ride</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Rider Name</TableHead>
            <TableHead>Rider Email</TableHead>
            <TableHead>Pickup</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Fare</TableHead>
            <TableHead>Requested At</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ride ? (
            <TableRow key={ride._id}>
              <TableCell>{ride.rider.name}</TableCell>
              <TableCell>{ride.rider.email}</TableCell>
              <TableCell>{ride.pickupLocation.address}</TableCell>
              <TableCell>{ride.destinationLocation.address}</TableCell>
              <TableCell>${ride.fare}</TableCell>
              <TableCell>
                {moment(ride.createdAt).format("YYYY-MMM-DD h:mm A")}
              </TableCell>
              <TableCell>
                <Select
                  defaultValue={ride.status}
                  onValueChange={(val) => handleStatusChange(val as RideStatus,ride._id)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-white">
                    {rideStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.replace("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No active ride found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default ActiveRide;
