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
import { redirect } from "next/navigation";
import { useSyncExternalStore, useState, type FormEvent } from "react"

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

const subscribeNoop = () => () => { }

const EditEvents = ({ result }: { result: Event }) => {
    const router = useRouter()
    const [errors, setErrors] = useState<FormErrors>({})

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
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  const eventData = {
    title: formData.get("title"),
    eventType: formData.get("eventType"),
    image: formData.get("image"),
    location: formData.get("location"),
    date: formData.get("date"),
    description: formData.get("description"),
  };

  try {
    const res = await fetch(
      `http://localhost:8000/upcoming-events/${result._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to update event");
    }

    router.push("/upcoming-events");
  } catch (error) {
    console.error("Update event error:", error);
  }
};
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
                                        id="event-type"
                                        name="eventType"
                                        defaultValue={result.eventType}
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
      <AlertDialogCancel>
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