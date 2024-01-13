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
import { ListMusicIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import History from "./history";
import Queue from "./queue";
import { api } from "@/trpc/react";
import TrackCard from "../track-card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Tracks() {
  const { data: currentlyPlayingTrack } =
    api.spotify.getCurrentlyPlayingTrack.useQuery();
  return (
    <Sheet>
      <Tooltip>
        <TooltipTrigger asChild>
          <SheetTrigger asChild>
            <Button variant="outline">
              <ListMusicIcon />
            </Button>
          </SheetTrigger>
        </TooltipTrigger>
        <TooltipContent>Pistes</TooltipContent>
      </Tooltip>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Pistes</SheetTitle>
        </SheetHeader>
        <TrackCard track={currentlyPlayingTrack?.item} />
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="queue">Queue</TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
          </TabsList>
          <TabsContent value="queue">
            <Queue className="h-[800px]" />
          </TabsContent>
          <TabsContent value="history">
            <History className="h-[800px]" />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
