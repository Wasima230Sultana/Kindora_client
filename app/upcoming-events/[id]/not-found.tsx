
import { Skeleton } from "@/components/ui/skeleton"

export default function EventDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Back Button */}
      <Skeleton className="h-5 w-36" />

      {/* Event Banner */}
      <Skeleton className="w-full h-64 md:h-96 rounded-2xl" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Category */}
          <Skeleton className="h-6 w-28 rounded-full" />

          {/* Event Title */}
          <Skeleton className="h-10 w-3/4" />

          {/* Short Description */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>

          {/* Event Details */}
          <div className="space-y-4 pt-4">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>

        {/* Registration Card */}
        <div className="border rounded-xl p-6 space-y-5 h-fit">
          <Skeleton className="h-7 w-40" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-full" />
          </div>

          <Skeleton className="h-11 w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}
