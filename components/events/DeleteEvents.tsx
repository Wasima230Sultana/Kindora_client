'use client'
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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Event } from '../type/type';
import { redirect } from 'next/navigation';
import { getTokenFromClient } from "@/lib/getTokenFromClient";
const DeleteEvents = ({ result }: { result: Event }) => {
    const handleDelete = async()=>{
      const token = await getTokenFromClient()
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upcoming-events/${result._id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                authorization : `Bearer ${token}`
            },
          
        })
        await res.json()
        redirect('/manage-event')
    }
    return (
      <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="destructive">Delete</Button>}
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    );
};

export default DeleteEvents;