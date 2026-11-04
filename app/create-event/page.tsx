'use client'
import { useSyncExternalStore, useState, type FormEvent } from "react"

import EventForm from "@/components/events/Event-Form"
import { CalendarCheck, Leaf, Send } from "lucide-react"

const eventTypes = [
  "Registration",
  "Donation",
  "Cleanup",
  "Relief",
  "Fundraising",
  "Awareness",
  "Volunteering",
  "Distribution",
  "Training",
  "Campaign",
]

type FieldName =
  "title" | "eventType" | "image" | "location" | "date" | "description"

type FormErrors = Partial<Record<FieldName, string>>

function getTodayIso() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  return `${now.getFullYear()}-${month}-${day}`
}

const subscribeNoop = () => () => { }

export default function CreateEventPage() {
  const [errors, setErrors] = useState<FormErrors>({})

  // The page is prerendered at build time: read "today" on the client only, so
  // the date picker's `min` bound is accurate and hydration stays consistent.
  const minDate = useSyncExternalStore(subscribeNoop, getTodayIso, () => "")

  const clearError = (name: FieldName) => {
    setErrors((previous) =>
      previous[name] ? { ...previous, [name]: undefined } : previous
    )
  }



  return (
    <div className="min-h-svh">
      <div>
        <main className="mx-auto max-w-6xl px-4 py-10 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-12">
            {/* Decorative panel */}
            <aside className="relative flex flex-col items-center justify-center gap-6 overflow-hidden rounded-3xl bg-gradient-to-b from-violet-100 via-violet-50 to-violet-100/60 p-8 text-center dark:from-violet-500/15 dark:via-violet-500/5 dark:to-violet-500/10">
              <div
                aria-hidden
                className="absolute -top-16 -left-12 size-48 rounded-full bg-primary/10 blur-2xl"
              />
              <div className="relative rounded-3xl bg-card p-8 shadow-xl ring-1 ring-primary/10">
                <CalendarCheck
                  className="size-20 text-primary"
                  strokeWidth={1.5}
                />
              </div>
              <p className="relative font-heading text-2xl leading-snug font-extrabold text-primary sm:text-3xl">
                Let&apos;s Make a Difference Together!
              </p>
              <Leaf
                aria-hidden
                className="absolute top-8 left-8 size-5 -rotate-12 fill-emerald-400 text-emerald-500"
              />
              <Leaf
                aria-hidden
                className="absolute right-10 bottom-12 size-4 rotate-45 fill-emerald-300 text-emerald-400"
              />
            </aside>

            {/* Form */}
            <EventForm></EventForm>
          </div>
        </main>
      </div>
    </div>
  )
}