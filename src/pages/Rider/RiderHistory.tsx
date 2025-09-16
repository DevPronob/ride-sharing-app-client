/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import moment from "moment"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useRideHistoryByRiderQuery } from "@/redux/features/ride/ride.api"

function RiderHistory() {
  const [filters, setFilters] = useState({
    status: "",
    startDate: "",
    endDate: "",
    page: 1,
    limit: 10,
  })

  const { data: ridesData, isLoading } = useRideHistoryByRiderQuery(filters)
  console.log(ridesData,"ridesData")

  const handleChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value, page: 1 }))
  }

  const handleReset = () => {
    setFilters({ status: "", startDate: "", endDate: "", page: 1, limit: 10 })
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-wrap gap-3">
        <Select value={filters.status || undefined} onValueChange={(v) => handleChange("status", v)}>
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
              <TableCell colSpan={7} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : ridesData?.data?.length ? (
            ridesData.data.map((item: any) => (
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
  )
}

export default RiderHistory
