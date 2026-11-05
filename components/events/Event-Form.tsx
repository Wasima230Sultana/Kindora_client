'use client'
import { useSyncExternalStore, useState, type FormEvent } from "react"
import React from 'react';

import { Send } from "lucide-react"
import { Form } from "@base-ui/react"
import { useRouter } from "next/navigation"
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
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import Swal from "sweetalert2";


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

export default function EventForm() {
      const { data: session } = authClient.useSession()
        const user = session?.user
    const router = useRouter()
    const [errors, setErrors] = useState<FormErrors>({})
const [isPending, setIsPending] = useState(false)
    // The page is prerendered at build time: read "today" on the client only, so
    // the date picker's `min` bound is accurate and hydration stays consistent.
    const minDate = useSyncExternalStore(subscribeNoop, getTodayIso, () => "")

    const clearError = (name: FieldName) => {
        setErrors((previous) =>
            previous[name] ? { ...previous, [name]: undefined } : previous
        )
    }

const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault()

  // Check login
  if (!user?.email) {
    await Swal.fire({
      title: "Login Required!",
      text: "Please log in before creating an event.",
      icon: "warning",
      confirmButtonColor: "#7c3aed",
    })
    return
  }

  const values = Object.fromEntries(
    new FormData(event.currentTarget).entries()
  ) as Record<string, string>

  const eventData = {
    ...values,
    creatorName: user.name ?? "",
    creatorEmail: user.email,
  }

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

  // Validation alert
  if (Object.keys(nextErrors).length > 0) {
    await Swal.fire({
      title: "Invalid Information!",
      text: "Please complete all required fields correctly.",
      icon: "warning",
      confirmButtonColor: "#7c3aed",
    })
    return
  }
setIsPending(true)
  try {
    const token = await getTokenFromClient()

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/create-event`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      }
    )

    if (!res.ok) {
      throw new Error("Failed to create event. Please try again.")
    }

    const data = await res.json()

    console.log("Event created successfully:", data)

    // Success alert
    await Swal.fire({
      title: "Event Created!",
      text: "Your event has been created successfully.",
      icon: "success",
      timer: 1800,
      showConfirmButton: false,
    })

    router.push("/upcoming-events")
    router.refresh()

  } catch (error) {
    console.error("Event creation error:", error)

    await Swal.fire({
      title: "Creation Failed!",
      text:
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      icon: "error",
      confirmButtonColor: "#7c3aed",
    })
  }
  finally {
  setIsPending(false)
}
}

//     const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//         event.preventDefault()

//         const values = Object.fromEntries(
//             new FormData(event.currentTarget).entries()
//         ) as Record<string, string>

//         const eventData = {
//   ...values,
//   creatorName: user?.name ?? "",
//   creatorEmail: user?.email ?? "",
// };
// console.log(eventData)

//         const nextErrors: FormErrors = {}

//         if (!values.title?.trim()) {
//             nextErrors.title = "Event title is required"
//         }

//         if (!values.eventType) {
//             nextErrors.eventType = "Please select an event type"
//         }

//         if (!values.image?.trim()) {
//             nextErrors.image = "Thumbnail image URL is required"
//         } else {
//             try {
//                 new URL(values.image)
//             } catch {
//                 nextErrors.image = "Enter a valid URL (including https://)"
//             }
//         }

//         if (!values.location?.trim()) {
//             nextErrors.location = "Location is required"
//         }

//         if (!values.date) {
//             nextErrors.date = "Event date is required"
//         } else if (values.date < getTodayIso()) {
//             nextErrors.date = "Event date cannot be in the past"
//         }

//         if (!values.description?.trim()) {
//             nextErrors.description = "Description is required"
//         }

//         setErrors(nextErrors)

//         // Stop if validation fails
//         if (Object.keys(nextErrors).length > 0) {
//             return
//         }

//         try {
//             const token = await getTokenFromClient()
//             const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create-event`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     authorization:`Bearer ${token}`
//                 },
//                 body: JSON.stringify(eventData),
//             })

//             if (!res.ok) {
//                 throw new Error("Failed to create event")
//             }

//             const data = await res.json()

//             console.log("Event created successfully:", data)

//             // Navigate to upcoming events page
//             router.push("/manage-event")
//             router.refresh()

//         } catch (error) {
//             console.error("Event creation error:", error)
//         }
//     }


    return (
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
                                    {/* <Button type="submit" className="h-11 w-full gap-2">
                                        <Send />
                                        Create Event
                                    </Button> */}
                                    <Button type="submit" disabled={isPending}>
  {isPending ? "Creating Event..." : "Create Event"}
</Button>
                                </Field>
                            </FieldGroup>
                        </Form>
                    </div>
    );
};

