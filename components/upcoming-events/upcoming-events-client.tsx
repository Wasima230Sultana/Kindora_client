"use client"

import { useMemo, useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"

import EventsCard from "@/components/Card/EventsCard"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import type { Event } from "@/components/type/type"

const ALL_EVENTS = "all"

type UpcomingEventsClientProps = {
  events: Event[]
}

export function UpcomingEventsClient({ events }: UpcomingEventsClientProps) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState(ALL_EVENTS)

  const categories = useMemo(
    () => Array.from(new Set(events.map((event) => event.eventType))),
    [events]
  )

  const filteredEvents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return events.filter((event) => {
      const matchesCategory =
        category === ALL_EVENTS || event.eventType === category

      if (!matchesCategory) return false
      if (!normalizedQuery) return true

      return [event.title, event.location, event.description].some((field) =>
        field.toLowerCase().includes(normalizedQuery)
      )
    })
  }, [events, query, category])

  return (
    <section className="scroll-mt-20 px-4 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm">
              <span className="font-semibold text-primary">Explore</span>
              <span className="text-muted-foreground"> · Get Involved</span>
            </p>
            <h1 className="mt-2 font-heading text-3xl font-extrabold text-[#1e1b4b] dark:text-white">
              Upcoming Events
            </h1>
            <p className="mt-2 text-muted-foreground">
              Find and join meaningful events in your community.
            </p>
          </div>

          <div className="flex w-full flex-wrap items-center gap-2 md:w-auto">
            <div className="relative w-full sm:w-56">
              <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search events..."
                aria-label="Search events"
                className="w-full pl-9"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger
                aria-label="Filter events"
                render={<Button className="shrink-0 gap-2 px-3" />}
              >
                <SlidersHorizontal className="size-4" />
                Filter
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Filter by category</DropdownMenuLabel>
                </DropdownMenuGroup>

                <DropdownMenuRadioGroup
                  value={category}
                  onValueChange={(value) => setCategory(String(value))}
                >
                  <DropdownMenuRadioItem value={ALL_EVENTS}>
                    All events
                  </DropdownMenuRadioItem>

                  {categories.map((eventType) => (
                    <DropdownMenuRadioItem key={eventType} value={eventType}>
                      {eventType}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventsCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-center text-muted-foreground">
            {events.length === 0
              ? "No upcoming events available."
              : "No events match your search."}
          </p>
        )}
      </div>
    </section>
  )
}
