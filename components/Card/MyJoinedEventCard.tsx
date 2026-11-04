
import Image from "next/image"
import {
    CalendarDays,
    MapPin,
    CheckCircle2,
} from "lucide-react"


import { JoinedEvent } from "../type/joinedDataType"

import {
    ArrowRight,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import CancelJoined from "../events/CancelJoined"
export default function MyJoinedEventCard({
    event,
}: { event: JoinedEvent }) {
    const formattedDate = new Date(event.date).toLocaleDateString(
        "en-US",
        {
            day: "numeric",
            month: "long",
            year: "numeric",
        }
    )

    return (

        
<Card className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">

    {/* Event Image */}
    <div className="relative h-52 w-full overflow-hidden">
        <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 400px"
        />

        <div className="absolute left-4 top-4">
            <Badge className="border-0 bg-green-600 text-white hover:bg-green-700">
                <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                Joined
            </Badge>
        </div>

        <div className="absolute right-4 top-4">
            <Badge variant="secondary" className="bg-white/90 text-gray-800">
                {event.category}
            </Badge>
        </div>
    </div>

    {/* Event Details */}
    <CardContent className="flex flex-col justify-between gap-5 p-5">

        <div className="space-y-4">

            {/* Title and Type */}
            <div className="space-y-2">
                <Badge variant="outline" className="text-xs">
                    {event.eventType}
                </Badge>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {event.title}
                </h3>
            </div>

            <Separator />

            {/* Event Information */}
            <div className="grid grid-cols-1 gap-4 text-sm text-gray-600 dark:text-gray-300">

                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-50 dark:bg-green-900/30">
                        <CalendarDays className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Event Date</p>
                        <p className="font-medium text-gray-800 dark:text-gray-200">
                            {formattedDate}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-50 dark:bg-green-900/30">
                        <MapPin className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Location</p>
                        <p className="font-medium text-gray-800 dark:text-gray-200">
                            {event.location}
                        </p>
                    </div>
                </div>

            </div>

        </div>

        <Separator />

        {/* Footer */}
        <div className="flex flex-col gap-4">

            <div>
                <p className="text-xs text-gray-400">Joined on</p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {event.joinedDate &&
                        !isNaN(new Date(event.joinedDate).getTime())
                        ? new Date(event.joinedDate).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })
                        : "Date unavailable"}
                </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
                <CancelJoined event={{ ...event, description: "" }} />

                <Link href={`/upcoming-events/${event._id}`} className="flex-1">
                    <Button
                        variant="outline"
                        className="w-full gap-2 border-green-600 text-green-700 hover:bg-green-50 hover:text-green-800 dark:text-green-400"
                    >
                        View Event
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </Link>
            </div>

        </div>

    </CardContent>
</Card>


    )
}
