// // 'use client'

// import EventDetailsCard from "@/components/Card/EventDetailsCard";
// import { authClient } from "@/lib/auth-client";
// type PageProps = {
//   params: Promise<{ id: string }>;
// };
// const EventDetailsPage = async({params}:PageProps) => {
//     const {data:session} = await authClient.getSession();
//     const user = session?.user
//     const {id} = await params;
//     console.log(id)
//     const res = await fetch(`http://localhost:8000/upcoming-events/${id}`)
//     return (
//         <div>
            
// <EventDetailsCard ></EventDetailsCard>


//         </div>
//     );
// };

// export default EventDetailsPage;


import React from "react"
import Link from "next/link"
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Users,
  Mail,
  Heart,
  HandHeart,
  CalendarCheck,
} from "lucide-react"
import { notFound } from "next/navigation"
import Image from "next/image";
import { Event } from "@/components/type/type";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
type PageProps = {
  params: Promise<{ id: string }>;
};
const EventDetailsPage = async ({ params }:PageProps) => {
    const {data:session} = await authClient.getSession()
    const user = session?.user
  const { id } = await params

  const res = await fetch(
    `http://localhost:8000/upcoming-events/${id}`,
    {
      cache: "no-store",
    }
  )

  if (res.status === 404) {
    notFound()
  }

  if (!res.ok) {
    throw new Error("Failed to fetch event details")
  }

  const result:Event = await res.json()


  return (
    <main className="min-h-screen bg-[#FAFCFA] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
<div className="flex justify-between items-center ">
     {/* Back to Events */}
        <Link
          href="/upcoming-events"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-purple-600 transition hover:text-purple-800"
        >
          <ArrowLeft size={16} />
          Back to Events
        </Link>
        <div className="flex gap-5">
             <Button>Edit</Button>
<Button>Delete</Button>
        </div>
       
</div>
       
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">

          {/* LEFT SIDE - EVENT DETAILS */}
          <section className="space-y-5 lg:col-span-2">

            {/* Event Banner */}
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <Image
              width={100}
              height={100}
                src={result?.image as string}
                alt={result.eventType}
                className="h-64 w-full object-cover sm:h-80"
              />
            </div>

            {/* Event Title */}
            <div className="space-y-4">

              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
                  {result.title}
                </h1>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  {result.eventType}
                </span>
              </div>

              {/* Location and Date */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-600">

                <div className="flex items-center gap-2">
                  <MapPin
                    size={17}
                    className="text-purple-600"
                  />
                  <span>{result.location}</span>
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays
                    size={17}
                    className="text-purple-600"
                  />
                  <span>{result.date}</span>
                </div>

              </div>
            </div>

            {/* About Event */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

              <div className="mb-4 flex items-center gap-2">
                <div className="rounded-lg bg-purple-100 p-2 text-purple-600">
                  <HandHeart size={20} />
                </div>

                <h2 className="text-lg font-bold text-gray-900">
                  About This Event
                </h2>
              </div>

              <p className="whitespace-pre-line text-sm leading-7 text-gray-600">
                {result.description}
              </p>

            </div>

            {/* Event Information */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

              <h2 className="mb-5 text-lg font-bold text-gray-900">
                Event Information
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div className="flex items-center gap-3 rounded-xl bg-purple-50 p-4">
                  <div className="rounded-lg bg-white p-2 text-purple-600">
                    <CalendarCheck size={21} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Event Date
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {result.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-purple-50 p-4">
                  <div className="rounded-lg bg-white p-2 text-purple-600">
                    <MapPin size={21} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Event Location
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {result.location}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Organizer */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

              <h2 className="mb-5 text-lg font-bold text-gray-900">
                Event Organizer
              </h2>

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-purple-100 text-xl font-bold text-purple-700">
                  {result.title.charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900">
                    {result.title}
                  </h3>

                  <p className="mt-1 flex items-center gap-2 break-all text-sm text-gray-500">
                    <Mail size={14} />
                    {user?.email}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Event Organizer
                  </p>
                </div>

              </div>
            </div>

          </section>

          {/* RIGHT SIDE - JOIN EVENT CARD */}
          <aside className="lg:sticky lg:top-8">

            <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm">

              {/* Icon */}
              <div className="mb-4 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                  <Users size={28} />
                </div>
              </div>

              {/* Heading */}
              <div className="text-center">

                <h2 className="text-xl font-bold text-gray-900">
                  Join This Event
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Be a part of this meaningful initiative!
                  Join us and help spread warmth and happiness
                  to people in need.
                </p>

              </div>

              {/* Event Summary */}
              <div className="my-6 space-y-4 rounded-xl bg-purple-50 p-4">

                <div>
                  <p className="text-xs text-gray-500">
                    Event Name
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    {result.title}
                  </p>
                </div>

                <div className="border-t border-purple-100 pt-3">
                  <p className="text-xs text-gray-500">
                    Date
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    {result.date}
                  </p>
                </div>

                <div className="border-t border-purple-100 pt-3">
                  <p className="text-xs text-gray-500">
                    Location
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    {result.location}
                  </p>
                </div>

              </div>

              {/* Join Button - UI Only */}
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-purple-200 transition duration-300 hover:-translate-y-1 hover:bg-purple-700 hover:shadow-lg"
              >
                <Heart size={17} />
                Join Event
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-gray-400">
                Together, we can make a difference!
              </p>

            </div>

          </aside>

        </div>
      </div>
    </main>
  )
}

export default EventDetailsPage
