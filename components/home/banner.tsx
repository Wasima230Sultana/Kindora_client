import Image from "next/image"
import { ArrowRight, Heart, Leaf } from "lucide-react"

import { Avatar, AvatarGroup, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { avatarImages, heroImage } from "@/lib/data"

export function Banner() {
  return (
    <section
      id="home"
      className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-violet-50 via-background to-background dark:from-violet-500/10"
    >
      <div
        aria-hidden
        className="absolute -top-40 -left-32 size-72 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 lg:grid-cols-2 lg:py-20">
        {/* Copy */}
        <div>
          <p className="font-heading text-lg font-semibold text-primary">
            Together for a <span aria-hidden>💗</span>
          </p>
          <h1 className="mt-2 font-heading text-5xl leading-[1.05] font-extrabold tracking-tight sm:text-6xl">
            <span className="block text-primary">Stronger</span>
            <span className="block text-[#1e1b4b] dark:text-white">
              Community
            </span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
            Join, create, and support social service events in your local area.
            Let&apos;s build a kinder, greener and more helpful community
            together.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button className="h-11 rounded-full px-6 text-[0.9rem]">
              Explore Events
              <ArrowRight />
            </Button>
            <Button
              variant="outline"
              className="h-11 rounded-full border-primary/30 px-6 text-[0.9rem] text-primary hover:bg-primary/5 hover:text-primary"
            >
              Create Event
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <AvatarGroup>
              {avatarImages.slice(0, 4).map((src, index) => (
                <Avatar key={src} size="sm" className="ring-2 ring-background">
                  <AvatarImage
                    src={src}
                    alt={`Community member ${index + 1}`}
                  />
                </Avatar>
              ))}
            </AvatarGroup>
            <p className="text-sm text-muted-foreground">
              <span className="font-heading font-bold text-foreground">
                10K+
              </span>{" "}
              people are part of our community
            </p>
          </div>
        </div>

        {/* Hero image */}
        <div className="relative mx-auto w-full max-w-xl">
          <div className="relative aspect-4/3 overflow-hidden rounded-[2.5rem] rounded-tl-[1rem] rounded-br-[6rem] shadow-2xl ring-1 shadow-primary/20 ring-primary/20">
            <Image
              src={heroImage}
              alt="Volunteers sorting donations at a community service event"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Decorations */}
          <Leaf
            aria-hidden
            className="absolute -top-3 -left-4 size-7 -rotate-12 fill-emerald-400 text-emerald-500"
          />
          <Leaf
            aria-hidden
            className="absolute top-10 -left-7 size-5 rotate-18 fill-emerald-300 text-emerald-400"
          />
          <Leaf
            aria-hidden
            className="absolute -bottom-4 left-10 size-6 rotate-45 fill-emerald-400 text-emerald-500"
          />
          <Heart
            aria-hidden
            className="absolute -top-4 right-16 size-6 fill-primary text-primary"
          />
          <Heart
            aria-hidden
            className="absolute -top-1 right-5 size-4 fill-fuchsia-500 text-fuchsia-500"
          />

          <div className="absolute -right-2 -bottom-6 rotate-[-6deg] rounded-2xl bg-card px-5 py-3 text-center shadow-xl ring-1 ring-primary/10">
            <p className="font-heading text-sm font-semibold text-[#1e1b4b] italic dark:text-white">
              Small Actions.
            </p>
            <p className="flex items-center justify-center gap-1 font-heading text-sm font-semibold text-primary italic">
              Big Impact. <Heart className="size-3.5 fill-current" />
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
