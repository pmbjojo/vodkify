"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Cover from "../cover";
import { ListMusicIcon, XIcon } from "lucide-react";
import { type Track } from "@spotify/web-api-ts-sdk";

export default function Queue() {
  const { data: queue } = api.spotify.getUsersQueue.useQuery();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <ListMusicIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Queue</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when youre done.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="mb-10 mt-10 h-5/6">
          <div className="pr-4">
            {queue?.queue.map((track) => {
              track = track as Track;
              return (
                <div
                  key={track.id}
                  className="mb-1 flex items-center justify-between rounded-md border p-1"
                >
                  <Cover
                    src={track.album.images[2]?.url}
                    height={track.album.images[2]?.height}
                    width={track.album.images[2]?.width}
                  />
                  {track.name}
                  <Button variant="destructive">
                    <XIcon />
                  </Button>
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
