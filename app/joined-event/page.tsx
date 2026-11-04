
import MyJoinedEventCard from "@/components/Card/MyJoinedEventCard"
import { JoinedEvent } from "@/components/type/joinedDataType"
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth"
import { getTokenFromServer } from "@/lib/getTokenFromServer"
import { CalendarDays } from "lucide-react"
import { headers } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"

const JoinedEventPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    const user = session?.user

    // Redirect if user is not logged in
    if (!user?.email) {
        redirect("/login")
    }
const token = await getTokenFromServer();
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/joined-event/${user.email}`,
        {
            cache: "no-store",
            headers:{
                authorization : `Bearer ${token}`
            }
        }
    )

    if (!res.ok) {
        throw new Error("Failed to fetch joined events")
    }

    const joinedEvents: JoinedEvent[] = await res.json()

    return (
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-10">

    {/* Page Heading */}
    <div className="flex items-center justify-between">
        <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                My Joined Events
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Manage and track the events you have joined.
            </p>
        </div>

        <div className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
            {joinedEvents.length} {joinedEvents.length === 1 ? "Event" : "Events"}
        </div>
    </div>

    {/* Joined Events */}
    {joinedEvents.length > 0 ? (
        <div className="space-y-5">
            {joinedEvents.map((event) => (
                <MyJoinedEventCard
                    key={event._id}
                    event={event}
                />
            ))}
        </div>
    ) : (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center dark:border-gray-700 dark:bg-gray-900/50">

            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <CalendarDays className="h-8 w-8 text-green-600" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                No Joined Events Yet!
            </h3>

            <p className="mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
                You haven&apos;t joined any events yet. Explore upcoming events
                and participate in activities that make a difference.
            </p>

            <Button className="mt-6 bg-green-600 hover:bg-green-700">
                <Link href="/upcoming-events">
                    Explore Events
                </Link>
            </Button>
        </div>
    )}
</div>
    )
}

export default JoinedEventPage
