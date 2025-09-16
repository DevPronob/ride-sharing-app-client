/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useRideHistoryByDriverQuery } from "@/redux/features/ride/ride.api";

function RideHistory() {
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    startDate: "",
    endDate: "",
    page: 1,
    limit: 10,
  });

  const { data: ridesData, isLoading } = useRideHistoryByDriverQuery(filters);
  console.log("Rides data:", ridesData);

  const handleChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
  };

  const handleReset = () => {
    setFilters({ search: "", status: "", startDate: "", endDate: "", page: 1, limit: 10 });
  };

  return (
    <div className="p-4 space-y-4">
      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-3">
        <Input
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)}
          placeholder="Search by location..."
          className="w-48"
        />
        <Select
          value={filters.status || undefined}
          onValueChange={(value) => handleChange("status", value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-40">
              {filters.startDate ? moment(filters.startDate).format("YYYY-MM-DD") : "Start Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 bg-white">
            <Calendar
              mode="single"
              selected={filters.startDate ? new Date(filters.startDate) : undefined}
              onSelect={(date) => handleChange("startDate", date ? date.toISOString() : "")}
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-40">
              {filters.endDate ? moment(filters.endDate).format("YYYY-MM-DD") : "End Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 bg-white">
            <Calendar
              mode="single"
              selected={filters.endDate ? new Date(filters.endDate) : undefined}
              onSelect={(date) => handleChange("endDate", date ? date.toISOString() : "")}
            />
          </PopoverContent>
        </Popover>

        <Button onClick={handleReset} variant="outline">
          Reset
        </Button>
      </div>

      {/* RIDE TABLE */}
      <Table>
        <TableCaption>Ride History</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Rider Name</TableHead>
            <TableHead>Rider Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Fare</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Pickup</TableHead>
            <TableHead>Destination</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">Loading...</TableCell>
            </TableRow>
          ) : ridesData?.data.rides?.length ? (
            ridesData.data.rides.map((item: any) => (
              <TableRow key={item._id}>
                <TableCell>{item.rider?.name || "-"}</TableCell>
                <TableCell>{item.rider?.email || "-"}</TableCell>
                <TableCell>{item.status || "-"}</TableCell>
                <TableCell>{item.fare ?? "Not calculated"}</TableCell>
                <TableCell>{moment(item.createdAt).format("YYYY-MMM-DD h:mm A")}</TableCell>
                <TableCell>{item.pickupLocation?.address || "-"}</TableCell>
                <TableCell>{item.destinationLocation?.address || "-"}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-500">
                No rides found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* PAGINATION */}
      <div className="mt-4 flex justify-center gap-2">
        <Button
          variant="outline"
          disabled={filters.page <= 1}
          onClick={() => setFilters((prev) => ({ ...prev, page: prev.page - 1 }))}
        >
          Prev
        </Button>
        <span className="flex items-center">Page {filters.page}</span>
        <Button
          variant="outline"
          disabled={ridesData?.totalPages <= filters.page}
          onClick={() => setFilters((prev) => ({ ...prev, page: prev.page + 1 }))}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default RideHistory;
