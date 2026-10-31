import Image from "next/image"
import { ArrowRight, CalendarDays, MapPin } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { avatarImages, events } from "@/lib/data"
import { cn } from "@/lib/utils"

export function RecentUpcomingEvents() {
  return (
    <section id="events" className="scroll-mt-20 px-4 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-4">
          <h2 className="flex items-center gap-3 font-heading text-2xl font-bold text-[#1e1b4b] dark:text-white">
            <span aria-hidden className="h-7 w-1.5 rounded-full bg-primary" />
            Recent Upcoming Events
          </h2>
          <a
            href="#events"
            className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            View All
            <ArrowRight className="size-4" />
          </a>
        </div>

        <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card
              key={event.id}
              className="relative overflow-hidden rounded-2xl transition-shadow hover:shadow-lg hover:shadow-primary/10"
            >
              <Image
                src={event.image}
                alt={event.imageAlt}
                width={640}
                height={400}
                className="h-44 w-full object-cover"
              />
              <Badge
                className={cn("absolute top-3 left-3", event.tagClassName)}
              >
                {event.tag}
              </Badge>

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
                  {event.date}
                </p>
              </CardHeader>

              <div className="flex items-center justify-between gap-3 px-4 pb-1">
                <div className="flex items-center gap-2">
                  <AvatarGroup>
                    {avatarImages.slice(0, 3).map((src, index) => (
                      <Avatar key={src} size="sm">
                        <AvatarImage
                          src={src}
                          alt={`Joined member ${index + 1}`}
                        />
                        <AvatarFallback>CH</AvatarFallback>
                      </Avatar>
                    ))}
                  </AvatarGroup>
                  <span className="text-xs text-muted-foreground">
                    +{event.joined} joined
                  </span>
                </div>
                <Button size="sm" className="rounded-full">
                  View Event
                  <ArrowRight className="size-3.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
