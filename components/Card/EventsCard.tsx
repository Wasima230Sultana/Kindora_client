import Image from "next/image"
import { ArrowRight, CalendarDays, MapPin } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { formatEventDate } from "@/lib/utils"
import { Event } from "../type/type"
import Link from "next/link"

const EventsCard = ({ event }: { event: Event }) => {
  return (
    <Card className="relative overflow-hidden rounded-2xl pt-0 pb-0 transition-shadow hover:shadow-lg hover:shadow-primary/10">
      <div className="relative h-44 w-full">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <Badge className="absolute top-3 left-3">{event.eventType}</Badge>

      <CardHeader>
        <CardTitle className="font-heading text-base font-bold text-[#1e1b4b] dark:text-white">
          {event.title}
        </CardTitle>

        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="size-3.5 text-primary" />
          {event.location}
        </p>

        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="size-3.5 text-primary" />
          {formatEventDate(event.date)}
        </p>
      </CardHeader>

      <div className="flex justify-start px-4 pb-4">
        <Link href={`/upcoming-events/${event._id}`}>
          <Button className="gap-2 px-4">
            View Event
            <ArrowRight className="size-3.5" />
          </Button>
        </Link>
      </div>
    </Card>
  )
}

export default EventsCard
