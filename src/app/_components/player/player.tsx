"use client";

import { PlayIcon, PauseIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import Queue from "./queue";
import { api } from "@/trpc/react";
import { getMinutesSeconds } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import Cover from "../cover";
import DeviceSelector from "./device-selector";
import { type Track } from "@spotify/web-api-ts-sdk";
import Volume from "./volume";

export default function Player() {
  const { data: currentlyPlayingTrack } =
    api.spotify.getCurrentlyPlayingTrack.useQuery();
  const { data: plabackState } = api.spotify.getPlaybackState.useQuery(
    undefined,
    { refetchInterval: 500 },
  );

  const utils = api.useUtils();
  const { mutate: play } = api.spotify.startResumePlayback.useMutation({
    async onSuccess() {
      await utils.spotify.invalidate();
    },
  });
  const { mutate: pause } = api.spotify.pausePlayback.useMutation({
    async onSuccess() {
      await utils.spotify.invalidate();
    },
  });

  if (!plabackState) return null;
  const track = currentlyPlayingTrack?.item as Track | null;
  return (
    <footer className="sticky bottom-0 z-50 flex items-center gap-3 border-t bg-background p-2">
      <Cover
        className="hidden sm:block"
        src={track?.album.images[2]?.url}
        width={track?.album.images[2]?.width}
        height={track?.album.images[2]?.height}
      />
      <div className="flex flex-col p-2">
        <div>{currentlyPlayingTrack?.item?.name}</div>
        <div>{track?.artists.map((artist) => artist.name)}</div>
      </div>
      {getMinutesSeconds(plabackState.progress_ms)}
      <Progress
        className="hidden flex-grow sm:block"
        value={(plabackState.progress_ms * 100) / plabackState.item.duration_ms}
      />
      {getMinutesSeconds(plabackState.item.duration_ms)}

      {plabackState?.is_playing ? (
        <Button
          variant="outline"
          onClick={() => pause(plabackState.device.id ?? "")}
        >
          <PauseIcon />
        </Button>
      ) : (
        <Button
          variant="outline"
          className=""
          size="icon"
          onClick={() => play(plabackState.device?.id ?? "")}
        >
          <PlayIcon />
        </Button>
      )}
      <Volume currentVolume={plabackState.device.volume_percent} />
      <DeviceSelector
        currentDevice={plabackState.device.name}
        className="hidden w-96 sm:flex"
      />
      <div className="flex-grow sm:hidden" />
      <Queue />
    </footer>
  );
}
