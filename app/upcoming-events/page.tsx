import type { Event } from "@/components/type/type"
import { UpcomingEventsClient } from "@/components/upcoming-events/upcoming-events-client"
import { getTokenFromServer } from "@/lib/getTokenFromServer"

export default async function UpcomingEventsPage() {
  let events: Event[] = []

  try {
    const token = await getTokenFromServer()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upcoming-events`, {
      cache: "no-store",
      headers:{
            authorization :`Bearer ${token}`
      }
    })

    if (!res.ok) {
      throw new Error("Failed to fetch events")
    }

    events = await res.json()

    const today = new Date()

    const todayString = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("-")

    events = events.filter((event) => {
      return event.date >= todayString
    })
  } catch (error) {
    console.error("Error fetching events:", error)
  }

  return <UpcomingEventsClient events={events} />
}
