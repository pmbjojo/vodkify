import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { type Track } from "@spotify/web-api-ts-sdk";
import Cover from "../cover";
import { api } from "@/trpc/react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function Queue({ className }: Readonly<{ className?: string }>) {
  const { data: userQueue } = api.spotify.getUserQueue.useQuery();
  return (
    <ScrollArea className={className}>
      <div className="flex flex-col gap-3 pr-4">
        {userQueue?.queue.map((track) => {
          track = track as Track;
          return (
            <Card
              className="flex items-center justify-between p-2"
              key={track.id}
            >
              <Cover image={track.album.images[2]} />
              <div className="flex basis-auto flex-col gap-1">
                <p className="text-right">{track.name}</p>
                {track.artists[0] && (
                  <div className="flex flex-row-reverse">
                    <Badge key={track.artists[0].id}>
                      {track.artists[0].name}
                    </Badge>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}
