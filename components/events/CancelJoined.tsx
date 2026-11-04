"use client"

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
import { Event } from "../type/type"
import { useRouter } from "next/navigation"
import { getTokenFromClient } from "@/lib/getTokenFromClient"
import { useState } from "react"

const CancelJoined = ({ event }: { event: Event }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    try {
      setLoading(true)

      const token = await getTokenFromClient()

      if (!token) {
        throw new Error("Authentication token not found")
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/joined-event/${event._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "Failed to cancel event")
      }

      router.push("/joined-event")
      router.refresh()

    } catch (error) {
      console.error("Cancel event error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="destructive">Delete</Button>}
      />

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to cancel your participation in this event?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              handleDelete()
            }}
            disabled={loading}
          >
            {loading ? "Cancelling..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CancelJoined