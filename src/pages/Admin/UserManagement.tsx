/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useAllUsersQuery, useBlockUserMutation, useUnBlockUserMutation } from '@/redux/features/user/user.api';
import React from 'react'
import DeleteUserConfirmDialog from '@/components/modules/admin/DeleteUserConfirmDialog';
import { toast } from 'sonner';

function UserManagement() {
    const {data:usersData} = useAllUsersQuery(undefined);
    const [blockuser] =useBlockUserMutation()
    const [unblockuser] =useUnBlockUserMutation()
    // const [deleteuser] =useDeleteUserMutation()
    console.log(usersData)
  // Example driver data, replace with actual data source or fetch logic
const blockUser =async(id:string) =>{
    try {

        const res = await blockuser(id).unwrap()  // 🔥 pass string, not object
        console.log("block user response", res)
        console.log(`✅ User blocked: ${id}`)
        
    } catch (error) {
        console.log("error", error)
    }
}

const unBlockUser =async(id:string) =>{
    try {

        const res = await unblockuser(id).unwrap()  // 🔥 pass string, not object
        toast.success("User unblocked")
        console.log("unblock user response", res)
        console.log(`✅ User unblocked: ${id}`)
        
    } catch (error) {
        console.log("error", error)
        toast.error("Something went wrong")
    }
}

  return (
    <div className="p-4">
      <Table>
        <TableCaption>List of registered users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersData?.data.map((user:any, idx:string) => (
            <TableRow key={idx}>
              <TableCell>{user?.name}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="text-right">
                <div>
                    <Button variant="outline" className='mx-1'>
                    {user?.role != 'ADMIN' ? 'Make Admin' : 'Remove Admin'}
                </Button>
                {user?.isBlocked ? (
                    <Button variant="outline" className='mx-1' onClick={()=>unBlockUser(user._id)}>
                    Unblock User
                </Button>
                ):(
                    <Button variant="outline" className='mx-1' onClick={()=>blockUser(user._id)}>
                    Block User
                </Button>
                )}
                
                <DeleteUserConfirmDialog id={user._id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default UserManagement;