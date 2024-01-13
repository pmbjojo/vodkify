import { Card } from "@/components/ui/card";
import { type Episode, type Track } from "@spotify/web-api-ts-sdk";
import Cover from "./cover";
import { Badge } from "@/components/ui/badge";
export default function TrackCard({
  track,
  playedAt,
}: Readonly<{
  track: Track | Episode | undefined;
  playedAt?: string;
}>) {
  if (!track) return null;
  if (track.type === "episode") return null;
  track = track as Track;
  return (
    <Card className="flex items-center justify-between p-2">
      <Cover image={track.album.images[2]} />
      <div className="flex basis-auto flex-col gap-1">
        <p className="text-right">{track.name}</p>
        {playedAt && (
          <p className="text-right text-sm font-light">
            {Intl.DateTimeFormat("fr-FR", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(new Date(playedAt))}
          </p>
        )}
        {track.artists[0] && (
          <div className="flex flex-row-reverse">
            <Badge>{track.artists[0].name}</Badge>
          </div>
        )}
      </div>
    </Card>
  );
}
