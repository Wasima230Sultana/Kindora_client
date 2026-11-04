
import Link from "next/link"
import {
    ArrowLeft,
} from "lucide-react"
import { notFound } from "next/navigation"
import { Event } from "@/components/type/type";
import EventDetailsCard from "@/components/Card/EventDetailsCard";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
type PageProps = {
    params: Promise<{ id: string }>;
};
const EventDetailsPage = async ({ params }: PageProps) => {
    const { id } = await params

    const token = await getTokenFromServer();

console.log("Token exists:", !!token);
console.log("Token length:", token?.length);

if (!token) {
  throw new Error("JWT token is missing");
}

const res = await fetch(
  `http://localhost:8000/upcoming-events/${id}`,
  {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

console.log("Response status:", res.status);

const responseText = await res.text();

console.log("Response body:", responseText);

if (res.status === 404) {
  notFound();
}

if (!res.ok) {
  throw new Error(`Failed to fetch event details: ${res.status}`);
}

const result: Event = JSON.parse(responseText);



// const token = await getTokenFromServer()
// console.log("Token exists:", !!token);
// console.log("Token length:", token?.length);
//     const res = await fetch(
//         `http://localhost:8000/upcoming-events/${id}`,
//         {
//             cache: "no-store",
//              headers:{
//           authorization: `Bearer ${token}`
//         }
//         }
//     )

//     if (res.status === 404) {
//         notFound()
//     }

//     if (!res.ok) {
//         throw new Error("Failed to fetch event details")
//     }

//     const result: Event = await res.json()


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
                   

                </div>
                <EventDetailsCard result={result}></EventDetailsCard>

            </div>
        </main>
    )
}

export default EventDetailsPage
