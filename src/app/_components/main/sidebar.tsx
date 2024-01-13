"use client";

import { api } from "@/trpc/react";
import PlaylistFragment from "./playlist-fragment";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Sidebar() {
  const { data: playslits } = api.spotify.getCurrentUserPlaylists.useQuery();
  return (
    <ScrollArea className="border-r">
      <div className="flex flex-col">
        {playslits?.items.map((playlist) => {
          return <PlaylistFragment playlist={playlist} key={playlist.id} />;
        })}
      </div>
    </ScrollArea>
  );
}
