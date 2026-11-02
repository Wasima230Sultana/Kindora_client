"use client"

import { useSyncExternalStore, useState, type FormEvent } from "react"
import { CalendarCheck, Leaf, Send } from "lucide-react"
import { Form } from "@base-ui/react"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { redirect } from "next/navigation"

const eventTypes = ["Registration", "Donation", "Cleanup"]

type FieldName =
  "title" | "eventType" | "image" | "location" | "date" | "description"

type FormErrors = Partial<Record<FieldName, string>>

function getTodayIso() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  return `${now.getFullYear()}-${month}-${day}`
}

const subscribeNoop = () => () => {}

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

  const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const values = Object.fromEntries(
      new FormData(event.currentTarget).entries()
    ) as Record<string, string>

    const res = await fetch('http://localhost:8000/create-event',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(values)

    })
    const nextErrors: FormErrors = {}
    if (!values.title?.trim()) {
      nextErrors.title = "Event title is required"
    }
    if (!values.eventType) {
      nextErrors.eventType = "Please select an event type"
    }
    if (!values.image?.trim()) {
      nextErrors.image = "Thumbnail image URL is required"
    } else {
      try {
        new URL(values.image)
      } catch {
        nextErrors.image = "Enter a valid URL (including https://)"
      }
    }
    if (!values.location?.trim()) {
      nextErrors.location = "Location is required"
    }
    if (!values.date) {
      nextErrors.date = "Event date is required"
    } else if (values.date < getTodayIso()) {
      nextErrors.date = "Event date cannot be in the past"
    }
    if (!values.description?.trim()) {
      nextErrors.description = "Description is required"
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      return
    }
    console.log(values)
    redirect('/upcoming-events')

  }

  return (
    <div className="min-h-svh">
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
          <div>
            <p className="text-sm font-semibold text-primary">
              Create a New Event
            </p>
            <h1 className="mt-1.5 font-heading text-3xl font-extrabold tracking-tight text-[#1e1b4b] sm:text-4xl dark:text-white">
              Create Event
            </h1>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Organize a community service event in your area.
            </p>

            <Form onSubmit={handleSubmit} className="mt-8">
              <FieldGroup className="grid gap-5 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="event-title">
                    Event Title{" "}
                    <span className="text-destructive" aria-hidden>
                      *
                    </span>
                  </FieldLabel>
                  <Input
                    id="event-title"
                    name="title"
                    placeholder="Enter event title"
                    required
                    aria-invalid={errors.title ? true : undefined}
                    onChange={() => clearError("title")}
                  />
                  <FieldError>{errors.title}</FieldError>
                </Field>

                <Field>
                  <FieldLabel htmlFor="event-type">
                    Event Type{" "}
                    <span className="text-destructive" aria-hidden>
                      *
                    </span>
                  </FieldLabel>
                  <Select
                    id="event-type"
                    name="eventType"
                    required
                    onValueChange={() => clearError("eventType")}
                  >
                    <SelectTrigger
                      className="w-full"
                      aria-invalid={errors.eventType ? true : undefined}
                    >
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError>{errors.eventType}</FieldError>
                </Field>

                <Field className="sm:col-span-2">
                  <FieldLabel htmlFor="event-image">
                    Thumbnail Image URL{" "}
                    <span className="text-destructive" aria-hidden>
                      *
                    </span>
                  </FieldLabel>
                  <Input
                    id="event-image"
                    name="image"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    required
                    aria-invalid={errors.image ? true : undefined}
                    onChange={() => clearError("image")}
                  />
                  <FieldError>{errors.image}</FieldError>
                </Field>

                <Field>
                  <FieldLabel htmlFor="event-location">
                    Location{" "}
                    <span className="text-destructive" aria-hidden>
                      *
                    </span>
                  </FieldLabel>
                  <Input
                    id="event-location"
                    name="location"
                    placeholder="Enter location"
                    required
                    aria-invalid={errors.location ? true : undefined}
                    onChange={() => clearError("location")}
                  />
                  <FieldError>{errors.location}</FieldError>
                </Field>

                <Field>
                  <FieldLabel htmlFor="event-date">
                    Event Date{" "}
                    <span className="text-destructive" aria-hidden>
                      *
                    </span>
                  </FieldLabel>
                  <Input
                    id="event-date"
                    name="date"
                    type="date"
                    min={minDate}
                    required
                    aria-invalid={errors.date ? true : undefined}
                    onChange={() => clearError("date")}
                  />
                  <FieldError>{errors.date}</FieldError>
                </Field>

                <Field className="sm:col-span-2">
                  <FieldLabel htmlFor="event-description">
                    Description{" "}
                    <span className="text-destructive" aria-hidden>
                      *
                    </span>
                  </FieldLabel>
                  <Textarea
                    id="event-description"
                    name="description"
                    placeholder="Tell us more about this event..."
                    rows={4}
                    required
                    aria-invalid={errors.description ? true : undefined}
                    onChange={() => clearError("description")}
                  />
                  <FieldError>{errors.description}</FieldError>
                </Field>

                <Field className="sm:col-span-2">
                  <Button type="submit" className="h-11 w-full gap-2">
                    <Send />
                    Create Event
                  </Button>
                </Field>
              </FieldGroup>
            </Form>
          </div>
        </div>
      </main>
    </div>
  )
}
