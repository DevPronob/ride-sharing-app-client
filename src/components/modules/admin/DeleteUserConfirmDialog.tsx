import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteUserMutation } from "@/redux/features/user/user.api";

type DeleteUserConfirmDialogProps = {
  id: string;
};

function DeleteUserConfirmDialog({ id }: DeleteUserConfirmDialogProps) {
  const [deleteUserApi] = useDeleteUserMutation();

  const handleDeleteUser = async () => {
    console.log("Deleting user with ID:", id);
    try {
      const res = await deleteUserApi(id).unwrap();
      console.log("Delete user response:", res);
      console.log(`✅ User deleted: ${id}`);
    } catch (error) {
      console.error("❌ Error deleting user:", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Delete User</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-bold">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-gray-600 dark:text-gray-400">
            This action cannot be undone. This will permanently delete this user
            and remove their data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteUser}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteUserConfirmDialog;
