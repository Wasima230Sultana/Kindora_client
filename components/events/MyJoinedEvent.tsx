'use client'
import { authClient } from '@/lib/auth-client';
import { Button, Form } from '@base-ui/react';
import { Heart } from 'lucide-react';

import { Event } from '../type/type';
import { getTokenFromClient } from '@/lib/getTokenFromClient';
import Swal from 'sweetalert2';


const MyJoinedEvent = ({result}:{result:Event}) => {
      const { data: session } = authClient.useSession()
    const user = session?.user
// const handleSubmit=async(e: React.SubmitEvent<HTMLElement>)=>{
//     e.preventDefault()
//     const data = {
//         username: user?.name,
//         email:user?.email,
//         UserImage:user?.image,
//         ...result,
//         joinedDate : new Date()
//     }
//     console.log(data)
//   const token = await getTokenFromClient()
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/joined-event`,{
//         method:'POST',
//         headers:{
//             'Content-Type':'application/json',
//             authorization : `Bearer ${token}`
        
//         },
//         body:JSON.stringify(data)
//     })
//     const joinedRes = await res.json()
//     console.log(joinedRes)

// }
const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()

    // Check login
    if (!user?.email) {
      await Swal.fire({
        title: "Login Required!",
        text: "Please log in before joining this event.",
        icon: "warning",
        confirmButtonText: "Okay",
        confirmButtonColor: "#7c3aed",
      })
      return
    }

    // Confirmation
    const confirmation = await Swal.fire({
      title: "Join This Event?",
      text: "Are you sure you want to participate in this event?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Join",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#7c3aed",
      cancelButtonColor: "#6b7280",
    })

    if (!confirmation.isConfirmed) return

    try {
      const data = {
        username: user.name,
        email: user.email,
        UserImage: user.image,
        ...result,
        joinedDate: new Date(),
      }

      const token = await getTokenFromClient()

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/joined-event`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      )

      const joinedRes = await res.json()

      if (!res.ok) {
        if (res.status === 409) {
          await Swal.fire({
            title: "Already Joined!",
            text: "You have already joined this event.",
            icon: "warning",
            confirmButtonColor: "#7c3aed",
          })
          return
        }

        throw new Error(joinedRes.message || "Failed to join event.")
      }

      await Swal.fire({
        title: "Successfully Joined!",
        text: "You are now a participant in this event.",
        icon: "success",
        confirmButtonColor: "#7c3aed",
      })

    } catch (error) {
      await Swal.fire({
        title: "Something Went Wrong!",
        text:
          error instanceof Error
            ? error.message
            : "Unable to join this event. Please try again.",
        icon: "error",
        confirmButtonColor: "#7c3aed",
      })
    }
  }
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                  {/* Join Button - UI Only */}
                            <Button
                                type="submit"
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-purple-200 transition duration-300 hover:-translate-y-1 hover:bg-purple-700 hover:shadow-lg"
                            >
                                <Heart size={17} />
                                Join Event
                            </Button>
            </Form>
          
        </div>
    );
};

export default MyJoinedEvent;