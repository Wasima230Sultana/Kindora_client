import Image from "next/image"
import { ArrowRight, Leaf } from "lucide-react"

import { galleryItems } from "@/lib/data"

export function OurGallery() {
  return (
    <section id="gallery" className="scroll-mt-20 px-4 pb-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-4">
          <h2 className="flex items-center gap-3 font-heading text-2xl font-bold text-[#1e1b4b] dark:text-white">
            <span aria-hidden className="h-7 w-1.5 rounded-full bg-primary" />
            Our Gallery
          </h2>
          <a
            href="#gallery"
            className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            See More
            <ArrowRight className="size-4" />
          </a>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {galleryItems.map((item, index) => (
            <div
              key={item.image}
              className="group relative aspect-4/3 overflow-hidden rounded-xl ring-1 ring-foreground/10"
            >
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {index === galleryItems.length - 1 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/70 via-black/25 to-transparent p-2 text-center">
                  <p className="flex items-center gap-1 font-heading text-base leading-tight font-bold text-white">
                    Greener
                    <Leaf className="size-4 fill-emerald-400 text-emerald-400" />
                  </p>
                  <p className="font-heading text-base leading-tight font-bold text-white">
                    Tomorrow
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
