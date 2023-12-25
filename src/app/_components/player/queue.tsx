"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Cover from "../cover";
import { ListMusicIcon } from "lucide-react";
import { type Track } from "@spotify/web-api-ts-sdk";
import { Badge } from "@/components/ui/badge";

export default function Queue() {
  const { data: queue } = api.spotify.getUsersQueue.useQuery();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <ListMusicIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Queue</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-grow">
          <div className="flex flex-col gap-3 pr-4">
            {queue?.queue.map((track) => {
              track = track as Track;
              return (
                <div
                  key={track.id}
                  className="flex items-center justify-between rounded-md border bg-card p-2"
                >
                  <Cover
                    src={track.album.images[2]?.url}
                    height={track.album.images[2]?.height}
                    width={track.album.images[2]?.width}
                  />
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
                </div>
              );
            })}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
