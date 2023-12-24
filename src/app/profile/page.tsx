"use client";

import { api } from "@/trpc/react";

export default function Page() {
  const { data: profile } = api.spotify.profile.useQuery();
  return <div>Coucou {profile?.display_name}</div>;
}
