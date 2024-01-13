import { api } from "@/trpc/react";
import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import TrackCard from "../track-card";

export default function History({
  className,
}: Readonly<{ className?: string }>) {
  const { data: recentlyPlayedTracks } =
    api.spotify.getRecentlyPlayedTracks.useQuery();
  return (
    <ScrollArea className={className}>
      <div className="flex flex-col gap-3 pr-4">
        {recentlyPlayedTracks?.items.map((playHistory) => {
          return (
            <TrackCard
              track={playHistory.track}
              playedAt={playHistory.played_at}
              key={playHistory.track.id}
            />
          );
        })}
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}
