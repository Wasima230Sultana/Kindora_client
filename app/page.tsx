import { Banner } from "@/components/home/banner"
import { FeatureStrip } from "@/components/home/feature-strip"
import { OurGallery } from "@/components/home/our-gallery"
import { RecentUpcomingEvents } from "@/components/home/recent-upcoming-events"

export default function Page() {
  return (
    <div className="min-h-svh">
      <main>
        <Banner />
        <FeatureStrip />
        <RecentUpcomingEvents />
        <OurGallery />
      </main>
    </div>
  )
}
