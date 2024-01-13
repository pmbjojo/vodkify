import { Button } from "@/components/ui/button";

import { type SimplifiedPlaylist } from "@spotify/web-api-ts-sdk";
import React from "react";
import Cover from "../cover";
import { api } from "@/trpc/react";

export default function PlaylistFragment({
  playlist,
}: Readonly<{ playlist: SimplifiedPlaylist }>) {
  const { mutate: startResumePlayback } =
    api.spotify.startResumePlayback.useMutation();
  const handleClick = () => {
    startResumePlayback({ context_uri: playlist.uri });
  };
  return (
    <Button
      variant="ghost"
      size="lg"
      onClick={() => {
        handleClick();
      }}
    >
      <Cover
        image={playlist.images[0]}
        key={playlist.images[0]?.url}
        size={30}
      />
      <div className="truncate pr-1">{playlist.name}</div>
      <div className="flex-grow" />
    </Button>
  );
}
