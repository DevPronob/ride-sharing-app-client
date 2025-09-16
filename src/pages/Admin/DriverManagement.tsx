/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  useApproveDriverMutation, 
  useGetDriversQuery, 
  useSuspandDriverMutation // better rename to useSuspendDriverMutation
} from "@/redux/features/driver/driver.api"
import { toast } from "sonner"

function DriversManagement() {
  const { data } = useGetDriversQuery(undefined)
  const [approveDriver] = useApproveDriverMutation()
  const [suspendDriver] = useSuspandDriverMutation()

  const handleDriverApprove = async (id: string) => {
  console.log("approve driver id", id)
  try {
    const res = await approveDriver(id).unwrap()  // 🔥 pass string, not object
    console.log("approve response", res)
    console.log(`✅ Driver approved: ${id}`)
  } catch (error) {
    console.log("error", error)
  }
}

// Suspend driver handler
const handleDriverSuspend = async (id: string) => {
  console.log("suspend driver id", id)
  try {
    const res = await suspendDriver(id).unwrap() 
     toast.success("Driver suspended")
    console.log("suspend response", res)
    console.log(`⚠️ Driver suspended: ${id}`)
  } catch (error) {
    toast.error("Failed to suspend driver")
    console.log("error", error)
    console.error("❌ Failed to suspend driver:", error)
  }
}

  return (
    <div className="p-4">
      <Table>
        <TableCaption>List of registered drivers</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Car Model</TableHead>
            <TableHead>Car Plate</TableHead>
            <TableHead>Car Color</TableHead>
            <TableHead>Car Capacity</TableHead>
            <TableHead>Earnings</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.length ? (
            data.data.map((driver: any) => (
              <TableRow key={driver._id}>
                <TableCell>{driver.user?.name}</TableCell>
                <TableCell>{driver.user?.email}</TableCell>
                <TableCell>{driver.vehicleInfo?.model}</TableCell>
                <TableCell>{driver.vehicleInfo?.plate}</TableCell>
                <TableCell>{driver.vehicleInfo?.color}</TableCell>
                <TableCell>{driver.vehicleInfo?.capacity}</TableCell>
                <TableCell>{driver.earnings}</TableCell>
                <TableCell className="text-right">
                    {
                        driver.approved ===true ?(
                            <Button variant="outline" onClick={() => handleDriverSuspend(driver._id)}>Suspend</Button>
                        ):(
                            <Button variant="outline" onClick={() => handleDriverApprove(driver._id)}>Approve</Button>
                        )
                    }
                  
                 
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-gray-500">
                No drivers found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default DriversManagement
