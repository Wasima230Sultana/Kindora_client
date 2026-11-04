import { ArrowRight } from "lucide-react"
import Link from "next/link"
import EventsCard from "../Card/EventsCard"
import type { Event } from "../type/type"
import { getTokenFromServer } from "@/lib/getTokenFromServer"

export async function RecentUpcomingEvents() {
  let events: Event[] = []

  try {
    const token = await getTokenFromServer()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create-event`, {
      cache: "no-store",
      headers:{
        authorization : `Bearer ${token}`
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

  return (
    <section className="scroll-mt-20 px-4 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-4">
          <h2 className="flex items-center gap-3 font-heading text-2xl font-bold text-[#1e1b4b] dark:text-white">
            <span aria-hidden className="h-7 w-1.5 rounded-full bg-primary" />
            Recent Upcoming Events
          </h2>

          <Link
            href="/upcoming-events"
            className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            View All
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.length > 0 ? (
            events.map((event) => <EventsCard key={event._id} event={event} />)
          ) : (
            <p className="col-span-full py-10 text-center text-muted-foreground">
              No upcoming events available.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
