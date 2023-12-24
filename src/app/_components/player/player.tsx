"use client";

import { PlayIcon, PauseIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import Queue from "./queue";
import { api } from "@/trpc/react";
import { getMinutesSeconds } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import Cover from "../cover";
import DeviceSelector from "./device-selector";
import { type Track } from "@spotify/web-api-ts-sdk";

export default function Player() {
  const { data: currentlyPlayingTrack } =
    api.spotify.getCurrentlyPlayingTrack.useQuery();
  const { data: plabackState } = api.spotify.getPlaybackState.useQuery(
    undefined,
    { refetchInterval: 500 },
  );
  const { mutate: setPlaybackVolume } =
    api.spotify.setPlaybackVolume.useMutation();
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
  const [volume, setVolume] = React.useState(
    plabackState?.device.volume_percent ?? 50,
  );
  if (!plabackState) return null;
  const track = currentlyPlayingTrack?.item as Track;
  return (
    <footer className="sticky bottom-0 z-50 flex items-center gap-3 border-t bg-background p-2">
      <div className="flex w-1/6 items-center text-wrap">
        <Cover
          src={track.album.images[2]?.url}
          width={track.album.images[2]?.width}
          height={track.album.images[2]?.height}
        />
        <div className="flex flex-col p-2">
          <div>{currentlyPlayingTrack?.item?.name}</div>
          <div>{track.artists.map((artist) => artist.name)}</div>
        </div>
      </div>
      <div className={"w-1/6"}>
        {getMinutesSeconds(plabackState.progress_ms)}
        <Progress
          value={
            (plabackState.progress_ms * 100) / plabackState.item.duration_ms
          }
        />
        {getMinutesSeconds(plabackState.item.duration_ms)}
      </div>
      <Slider
        defaultValue={[50]}
        max={100}
        value={[volume]}
        className="w-1/6"
        onValueCommit={() => {
          setPlaybackVolume(volume);
        }}
        onValueChange={(value) => {
          setVolume(value[0] ?? 50);
        }}
        step={1}
      />
      <div className="flex gap-2">
        {plabackState?.is_playing ? (
          <Button
            variant="outline"
            size="icon"
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
      </div>
      <div>
        <DeviceSelector device={plabackState.device.id} />
      </div>
      <div className="flex-grow" />
      <Queue />
    </footer>
  );
}
