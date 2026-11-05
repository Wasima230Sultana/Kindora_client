'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Event } from "../type/type";
import { useSyncExternalStore, useState, type FormEvent } from "react"

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

const EditEvents = ({ result }: { result: Event }) => {

    const [errors, setErrors] = useState<FormErrors>({})
    const [eventType, setEventType] = useState(result.eventType || "")
    // The page is prerendered at build time: read "today" on the client only, so
    // the date picker's `min` bound is accurate and hydration stays consistent.
    const minDate = useSyncExternalStore(subscribeNoop, getTodayIso, () => "")

    const clearError = (name: FieldName) => {
        setErrors((previous) =>
            previous[name] ? { ...previous, [name]: undefined } : previous
        )
    }

    
const handleUpdateEvent = async (
  event: React.FormEvent<HTMLFormElement>
) => {
  event.preventDefault()

  const form = event.currentTarget
  const formData = new FormData(form)

  const eventData = {
    title: formData.get("title"),
    eventType: formData.get("eventType"),
    image: formData.get("image"),
    location: formData.get("location"),
    date: formData.get("date"),
    description: formData.get("description"),
  }

  // Confirmation
  const confirmation = await Swal.fire({
    title: "Update Event?",
    text: "Are you sure you want to save these changes?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, Update",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#7c3aed",
    cancelButtonColor: "#6b7280",
  })

  if (!confirmation.isConfirmed) return

  try {
    const token = await getTokenFromClient()

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/manage-event/${result._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      }
    )

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || "Failed to update event")
    }

    await Swal.fire({
      title: "Event Updated!",
      text: "Your event has been updated successfully.",
      icon: "success",
      timer: 1800,
      showConfirmButton: false,
    })

    window.location.href = "/manage-event"

  } catch (error) {
    console.error("Update event error:", error)

    await Swal.fire({
      title: "Update Failed!",
      text:
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      icon: "error",
      confirmButtonColor: "#7c3aed",
    })
  }
}


    // const handleUpdateEvent = async (
    //     event: React.FormEvent<HTMLFormElement>
    // ) => {
    //     event.preventDefault();

    //     const form = event.currentTarget;
    //     const formData = new FormData(form);

    //     const eventData = {
    //         title: formData.get("title"),
    //         eventType: formData.get("eventType"),
    //         image: formData.get("image"),
    //         location: formData.get("location"),
    //         date: formData.get("date"),
    //         description: formData.get("description"),
    //     };

    //     try {
    //         const token = await getTokenFromClient()
    //         const res = await fetch(
    //             `${process.env.NEXT_PUBLIC_API_URL}/manage-event/${result._id}`,
    //             {
    //                 method: "PATCH",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     authorization: `Bearer ${token}`
    //                 },
    //                 body: JSON.stringify(eventData),
    //             }
    //         );

    //         if (!res.ok) {
    //             const errorData = await res.json()
    //             throw new Error(errorData.message || "Failed to update event")
    //         }

    //         console.log("Event updated successfully!")

    //         console.log("Before redirect")

    //         window.location.href = "/manage-event"

    //         console.log("After redirect")
    //     } catch (error) {
    //         console.error("Update event error:", error);
    //     }
    // };
    return (

        <AlertDialog>
            <AlertDialogTrigger
                render={
                    <Button className="bg-violet-600 text-white" variant="outline">
                        Edit
                    </Button>
                }
            />

            <AlertDialogContent className="flex max-h-[90vh] w-[95vw] max-w-3xl flex-col gap-0 overflow-hidden p-0">

                {/* Fixed Header */}
                <AlertDialogHeader className="shrink-0 border-b px-6 py-5">
                    <AlertDialogTitle>
                        Update the information
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        Update your event details using the form below.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                {/* Scrollable Form */}
                <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
                    <Form onSubmit={handleUpdateEvent} className="mt-0">

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
                                    defaultValue={result.title}
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
                                    value={eventType}
                                    onValueChange={(value) => {
                                        setEventType(value ?? "")
                                        clearError("eventType")
                                    }}
                                    name="eventType"
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
                                    defaultValue={result.image as string}
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
                                    defaultValue={result.location}
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
                                    defaultValue={result.date}
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
                                    defaultValue={result.description}
                                    rows={4}
                                    required
                                    aria-invalid={errors.description ? true : undefined}
                                    onChange={() => clearError("description")}
                                />
                                <FieldError>{errors.description}</FieldError>
                            </Field>

                        </FieldGroup>

                        {/* Fixed Footer */}
                        <AlertDialogFooter className="shrink-0 border-t bg-white px-6 py-4">
                            <AlertDialogCancel className="bg-blue-300 text-black hover:bg-blue-400 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600">
                                Cancel
                            </AlertDialogCancel>


                            <Button type="submit" className="bg-violet-600 text-white">
                                Update
                            </Button>
                        </AlertDialogFooter>
                    </Form>
                </div>



            </AlertDialogContent>
        </AlertDialog>

    );
};

export default EditEvents;