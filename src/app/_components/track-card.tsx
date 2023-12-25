import { type Track } from "@spotify/web-api-ts-sdk";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import Cover from "./cover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TrackCard({ track }: Readonly<{ track: Track }>) {
  const utils = api.useUtils();
  const { data: queue } = api.spotify.getUsersQueue.useQuery();
  const { mutate } = api.spotify.addItemToPlaybackQueue.useMutation({
    onSuccess: async () => {
      await utils.spotify.getUsersQueue.invalidate();
      toast.success(`${track.name} ajouté à la queue`, {});
    },
  });
  return (
    <Card className="transition duration-200 hover:scale-105 hover:shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <div className="truncate pr-1">{track.name}</div>
          <div className="flex-grow" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => {
                  if (
                    queue &&
                    queue.queue.filter((item) => item.uri === track.uri)
                      .length > 0
                  )
                    return toast.error("Ce titre est déjà dans la queue");
                  mutate(track.uri);
                }}
              >
                <PlusIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ajouter à la queue</p>
            </TooltipContent>
          </Tooltip>
        </CardTitle>
        <CardDescription>
          <div className="text-wrap">{track.album.name}</div>
          <div className="flex gap-1 truncate">
            {track.artists.map((artist) => (
              <Badge key={artist.id}>{artist.name}</Badge>
            ))}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {track.album.images[0] ? (
          <Cover
            src={track.album.images[0].url}
            height={track.album.images[0].height}
            width={track.album.images[0].width}
            key={track.album.images[0].url}
          />
        ) : null}
      </CardContent>
    </Card>
  );
}
