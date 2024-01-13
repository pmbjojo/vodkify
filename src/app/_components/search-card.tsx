import { type Track } from "@spotify/web-api-ts-sdk";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import Cover from "./cover";
import { useIconTimeout } from "@/utils/hooks";
import TooltipButton from "@/components/tooltip-button";

export default function SearchCard({ track }: Readonly<{ track: Track }>) {
  const utils = api.useUtils();
  const { mutate: addItemToPlaybackQueue, status } =
    api.spotify.addItemToPlaybackQueue.useMutation({
      onSuccess: async () => {
        await utils.spotify.getUserQueue.invalidate();
        toast.success(`${track.name} ajouté à la queue`, {});
      },
      onError: (err) => {
        toast.error("Une erreur est survenue", { description: err.message });
      },
    });
  const { icon, variant } = useIconTimeout(status);
  const handleClick = () => {
    addItemToPlaybackQueue({ uri: track.uri });
  };

  return (
    <Card className="sm:transition sm:duration-200 sm:hover:scale-105 sm:hover:shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <div className="truncate pr-1">{track.name}</div>
          <div className="flex-grow" />
          <TooltipButton
            description="Ajouter à la queue"
            onClick={() => {
              handleClick();
            }}
            variant={variant}
          >
            {icon}
          </TooltipButton>
        </CardTitle>
        <CardDescription>
          <div className="flex gap-1 truncate">
            {track.artists.map((artist) => (
              <Badge key={artist.id}>{artist.name}</Badge>
            ))}
            <div className="flex-grow truncate text-right">
              {track.album.name}
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Cover image={track.album.images[0]} key={track.album.images[0]?.url} />
      </CardContent>
    </Card>
  );
}
