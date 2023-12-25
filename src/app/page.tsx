"use client";

import { Loader2 } from "lucide-react";
import TrackCard from "./_components/track-card";
import { useSearchParams } from "next/navigation";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const searchParams = useSearchParams();
  const { data: playlists } = api.spotify.getCurrentUserPlaylists.useQuery();
  const query = searchParams.get("search") ?? "";
  const {
    data: search,
    fetchNextPage,
    isFetching,
  } = api.spotify.search.useInfiniteQuery(
    {
      limit: 10,
      query,
    },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );
  return (
    <main className="flex min-h-screen flex-col gap-6 p-6">
      {/* items-center justify-center */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {search?.pages.map((page) =>
          page.items.tracks.items.map((track) => {
            return <TrackCard key={track.id} track={track} />;
          }),
        )}
      </div>
      <Button onClick={() => fetchNextPage()} className="w-full">
        {isFetching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Plus
      </Button>
      <div className="flex flex-col">
        {playlists?.items.map((playlist) => {
          return <div key={playlist.id}>{playlist.name}</div>;
        })}
      </div>
    </main>
  );
}
