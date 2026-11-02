
import React from "react";
import Image from "next/image";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Event } from "../type/type";

const EventsCard = ({ event }: { event: Event }) => {
    return (
        <Card className="relative overflow-hidden rounded-2xl transition-shadow hover:shadow-lg hover:shadow-primary/10">

          <div className="relative h-44 w-full">
    {event.thumbnailUrl ? (
        <Image
            src={event.thumbnailUrl}
            alt={event.title || "Event image"}
            fill
            className="object-cover"
            unoptimized
        />
    ) : (
        <div className="flex h-full items-center justify-center bg-muted">
            <span className="text-sm text-muted-foreground">
                No image available
            </span>
        </div>
    )}
</div>

            <Badge className="absolute left-3 top-3">
                {event.eventType}
            </Badge>

            <CardHeader>
                <CardTitle className="font-heading text-base font-bold text-[#1e1b4b] dark:text-white">
                    {event.title}
                </CardTitle>

                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="size-3.5 text-primary" />
                    {event.location}
                </p>

                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays className="size-3.5 text-primary" />
                    {new Date(event.eventDate).toLocaleDateString()}
                </p>

                <p className="line-clamp-2 text-sm text-muted-foreground">
                    {event.description}
                </p>
            </CardHeader>

            <div className="flex justify-end px-4 pb-4">
                <Button size="sm" className="rounded-full">
                    View Event
                    <ArrowRight className="size-3.5" />
                </Button>
            </div>

        </Card>
    );
};

export default EventsCard;
