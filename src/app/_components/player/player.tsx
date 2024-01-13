"use client";

import React from "react";
import Tracks from "./tracks";
import { api } from "@/trpc/react";
import { cn, getMinutesSeconds } from "@/utils/utils";
import { Progress } from "@/components/ui/progress";
import Cover from "../cover";
import DeviceSelector from "./device-selector";
import { type Track } from "@spotify/web-api-ts-sdk";
import Volume from "./volume";
import { Badge } from "@/components/ui/badge";
import PlayPauseButton from "./play-pause-button";
import EmptyPlayer from "./empty-player";

export default function Player({
  className,
}: Readonly<{ className?: string }>) {
  const [plabackState] = api.spotify.getPlaybackState.useSuspenseQuery(
    undefined,
    {
      refetchInterval: 500,
    },
  );
  if (!plabackState) return <EmptyPlayer />;
  if (plabackState.currently_playing_type === "episode") {
    return "Le player ne supporte pas les podcasts";
  }
  const track = plabackState.item as Track | undefined;
  return (
    <footer
      className={cn(
        "z-50 flex items-center gap-3 border-t bg-background p-2",
        className,
      )}
    >
      <Cover className="hidden sm:block" image={track?.album.images[2]} />
      <div className="flex max-w-40 flex-col gap-1">
        <div className="truncate text-nowrap">{plabackState.item?.name}</div>
        <div>
          <Badge className="truncate text-nowrap">
            {track?.artists[0]?.name}
          </Badge>
        </div>
      </div>
      <div>{getMinutesSeconds(plabackState.progress_ms)}</div>
      <Progress
        className="flex flex-grow"
        value={
          (plabackState.progress_ms * 100) / plabackState.item?.duration_ms
        }
      />
      <div className="hidden sm:block">
        {getMinutesSeconds(plabackState.item?.duration_ms)}
      </div>
      <PlayPauseButton />
      <Volume currentVolume={plabackState.device?.volume_percent} />
      <Tracks />
    </footer>
  );
}
