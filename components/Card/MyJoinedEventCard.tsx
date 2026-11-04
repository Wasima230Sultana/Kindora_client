
import Image from "next/image"
import {
  CalendarDays,
  MapPin,
  Mail,
  UserRound,
  Tag,
  CheckCircle2,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { JoinedEvent } from "../type/joinedDataType"
import Link from "next/link"

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
    <Card className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">

      {/* Event Image */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 400px"
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

      <CardContent className="space-y-4 p-5">

        {/* Event Title */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {event.eventType}
            </Badge>
          </div>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {event.title}
          </h3>
        </div>

        <Separator />

        {/* Event Information */}
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">

          <div className="flex items-center gap-3">
            <CalendarDays className="h-4 w-4 shrink-0 text-green-600" />
            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 shrink-0 text-green-600" />
            <span>{event.location}</span>
          </div>

        </div>

        <Separator />


        <Separator />

        {/* Join Information */}
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-xs text-gray-400">Joined on</p>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {new Date(event.joinedAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>

          <Button
            variant="outline"
            className="border-green-600 text-green-700 hover:bg-green-50 dark:text-green-400"
          >
             <Link href={`/upcoming-events/${event._id}`}>
        View Event
    </Link>
          </Button>
        </div>

      </CardContent>
    </Card>
  )
}
