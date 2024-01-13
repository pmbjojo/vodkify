import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function EmptyPlayer() {
  return (
    <footer className="sticky bottom-0 z-50 flex items-center justify-center gap-3 border-t bg-background p-2">
      <Button asChild>
        <Link
          href="https://open.spotify.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Ouvrir Spotify
        </Link>
      </Button>
    </footer>
  );
}
