import { Banner } from "@/components/home/banner"
import { FeatureStrip } from "@/components/home/feature-strip"
import { OurGallery } from "@/components/home/our-gallery"
import { PreviousEventsPage } from "@/components/home/previous-events"
import { RecentUpcomingEvents } from "@/components/home/recent-upcoming-events"
// export const dynamic = "force-dynamic"

export default function Page() {
  return (
    <div className="min-h-svh">
      <main>
        <Banner />
        <FeatureStrip />
        <RecentUpcomingEvents />
        <PreviousEventsPage></PreviousEventsPage>
        <OurGallery />
      </main>
    </div>
  )
}
