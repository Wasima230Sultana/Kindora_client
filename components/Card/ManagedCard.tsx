
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
      <div className="flex flex-col sm:flex-row">

        {/* Event Image */}
        <div className="relative h-52 w-full shrink-0 overflow-hidden sm:h-auto sm:min-h-[230px] sm:w-64 md:w-72">
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
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-5 p-4 sm:p-5 md:p-6">

          <CardHeader className="space-y-4 p-0">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Manage Event
              </p>

              <CardTitle className="line-clamp-2 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-xl">
                {event.title}
              </CardTitle>
            </div>

            <div className="grid grid-cols-1 gap-3 text-sm text-muted-foreground sm:grid-cols-2">
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
          <CardContent className="flex flex-col gap-4 border-t border-border/60 p-0 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <EditEvents result={event} />
              <DeleteEvents result={event} />
            </div>

           <Link href={`/upcoming-events/${event._id}`}>
  <Button className="w-full gap-2 rounded-xl sm:w-auto">
    View Event
    <ArrowRight className="size-4" />
  </Button>
</Link>
          </CardContent>

        </div>
      </div>
    </Card>
  )
}

export default ManageCard
