
import Image from "next/image"
import { ArrowRight, CalendarDays, MapPin } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatEventDate } from "@/lib/utils"
import { Event } from "../type/type"
import Link from "next/link"
import EditEvents from "../events/EditEvents"
import DeleteEvents from "../events/DeleteEvents"

const ManageCard = ({ event }: { event: Event }) => {
  return (

<Card className="group overflow-hidden rounded-2xl border border-border/60 bg-card p-0 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">

  {/* Event Image */}
  <div className="relative h-52 w-full overflow-hidden">
    <Image
      src={event.image}
      alt={event.title}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-105"
      unoptimized
    />

    <div className="absolute left-3 top-3">
      <Badge className="rounded-full px-3 py-1 shadow-md">
        {event.eventType}
      </Badge>
    </div>
  </div>

  {/* Event Information */}
  <div className="flex flex-col justify-between gap-5 p-5">

    <CardHeader className="space-y-4 p-0">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Manage Event
        </p>

        <CardTitle className="line-clamp-2 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
          {event.title}
        </CardTitle>
      </div>

      <div className="space-y-3 text-sm text-muted-foreground">
        <p className="flex items-center gap-2">
          <MapPin className="size-4 shrink-0 text-primary" />
          <span className="truncate">{event.location}</span>
        </p>

        <p className="flex items-center gap-2">
          <CalendarDays className="size-4 shrink-0 text-primary" />
          <span>{formatEventDate(event.date)}</span>
        </p>
      </div>
    </CardHeader>

    {/* Actions */}
    <CardContent className="flex flex-col gap-3 border-t border-border/60 p-0 pt-4">

      <div className="flex items-center gap-3">
        <EditEvents result={event} />
        <DeleteEvents result={event} />
      </div>

      <Link href={`/upcoming-events/${event._id}`} className="w-full">
        <Button className="w-full gap-2 rounded-xl">
          View Event
          <ArrowRight className="size-4" />
        </Button>
      </Link>

    </CardContent>

  </div>
</Card>

  )
}

export default ManageCard
