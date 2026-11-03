
import Link from "next/link"
import {
    ArrowLeft,
} from "lucide-react"
import { notFound } from "next/navigation"
import { Event } from "@/components/type/type";
import { Button } from "@/components/ui/button";
import EventDetailsCard from "@/components/Card/EventDetailsCard";
import DeleteEvents from "@/components/events/DeleteEvents";
type PageProps = {
    params: Promise<{ id: string }>;
};
const EventDetailsPage = async ({ params }: PageProps) => {
    const { id } = await params

    const res = await fetch(
        `http://localhost:8000/upcoming-events/${id}`,
        {
            cache: "no-store",
        }
    )

    if (res.status === 404) {
        notFound()
    }

    if (!res.ok) {
        throw new Error("Failed to fetch event details")
    }

    const result: Event = await res.json()


    return (
        <main className="min-h-screen bg-[#FAFCFA] px-4 py-8 md:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="flex justify-between items-center ">
                    {/* Back to Events */}
                    <Link
                        href="/upcoming-events"
                        className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-purple-600 transition hover:text-purple-800"
                    >
                        <ArrowLeft size={16} />
                        Back to Events
                    </Link>
                    <div className="flex gap-5">
                        <Button>Edit</Button>
                        <DeleteEvents result={result}></DeleteEvents>
                    </div>

                </div>
                <EventDetailsCard result={result}></EventDetailsCard>

            </div>
        </main>
    )
}

export default EventDetailsPage
