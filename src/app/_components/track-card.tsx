import { type Track } from "@spotify/web-api-ts-sdk";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import Cover from "./cover";

export default function TrackCard({ track }: Readonly<{ track: Track }>) {
  const utils = api.useUtils();
  const { mutate } = api.spotify.addItemToPlaybackQueue.useMutation({
    onSuccess: async () => {
      console.log("rjgbshergmhrubhsetgihsetubhseltkbhseuiltbh");
      await utils.spotify.getUsersQueue.invalidate();
      toast(`${track.name} ajouté à la queue`);
    },
  });
  return (
    <Card className="h-[34rem] w-full transition duration-200 hover:scale-105 hover:shadow-2xl md:w-96">
      <CardHeader>
        <CardTitle className="truncate hover:text-clip">{track.name}</CardTitle>
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
      <CardFooter>
        <Button
          onClick={() => mutate(track.uri)}
          className="w-full active:bg-primary"
        >
          <PlusIcon /> Ajouter
        </Button>
      </CardFooter>
    </Card>
  );
}
