import { Card } from "@/components/ui/card"
import { features } from "@/lib/data"
import { cn } from "@/lib/utils"

export function FeatureStrip() {
  return (
    <section id="about" className="relative z-10 scroll-mt-20 px-4">
      <Card className="mx-auto max-w-6xl rounded-3xl p-2 shadow-xl shadow-foreground/5 dark:bg-card/60">
        <div className="flex snap-x gap-1 overflow-x-auto p-1 md:grid md:grid-cols-4 md:gap-0 md:overflow-visible">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="flex min-w-62 shrink-0 snap-start items-start gap-3 rounded-2xl px-4 py-4 md:min-w-0 md:rounded-none md:border-l md:border-border md:first:border-l-0"
              >
                <span
                  className={cn(
                    "flex size-11 shrink-0 items-center justify-center rounded-xl",
                    feature.iconClassName
                  )}
                >
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-heading text-sm font-bold text-[#1e1b4b] dark:text-white">
                    {feature.title}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </section>
  )
}
