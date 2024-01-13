import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { type SimplifiedPlaylist } from "@spotify/web-api-ts-sdk";
import React from "react";
import Cover from "./cover";
import { api } from "@/trpc/react";
import { useIconTimeout } from "@/utils/hooks";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function PlaylistCard({
  playlist,
}: Readonly<{ playlist: SimplifiedPlaylist }>) {
  const { mutate: startResumePlayback, status } =
    api.spotify.startResumePlayback.useMutation();
  const { icon, variant } = useIconTimeout(status);
  const handleClick = () => {
    startResumePlayback({ context_uri: playlist.uri });
    // addItemToPlaybackQueue({ uri: playlist.uri });
  };
  return (
    <Card className="transition duration-200 hover:scale-105 hover:shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <div className="truncate pr-1">{playlist.name}</div>
          <div className="flex-grow" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => {
                  handleClick();
                }}
                variant={variant}
              >
                {icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Lancer la playlist</p>
            </TooltipContent>
          </Tooltip>
        </CardTitle>
        <CardDescription>
          <div className="text-wrap">{playlist.owner.display_name}</div>
          <div className="text-wrap">{playlist.description} </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Cover image={playlist.images[0]} key={playlist.images[0]?.url} />
      </CardContent>
    </Card>
  );
}
