"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import SearchCard from "./_components/search-card";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";
import EmptySearch from "./_components/empty-search";

export default function Page() {
  const { ref, inView } = useInView();
  const searchParams = useSearchParams();
  const query = searchParams.get("search") ?? "muse";
  const [search, { isFetching, fetchNextPage }] =
    api.spotify.search.useSuspenseInfiniteQuery(
      {
        limit: 10,
        query: query,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );
  useEffect(() => {
    if (inView) {
      fetchNextPage().catch((err) => {
        console.error(err);
      });
    }
  }, [fetchNextPage, inView]);
  if (query === "") return <EmptySearch />;
  return (
    <ScrollArea>
      <div className="grid gap-6 p-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {search?.pages.map(
          (page) =>
            page.items?.tracks.items.map((track) => {
              return <SearchCard key={track.id} track={track} />;
            }),
        )}
      </div>
      <Button onClick={() => fetchNextPage()} className="w-full" ref={ref}>
        {isFetching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Plus
      </Button>
    </ScrollArea>
  );
}
