"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/utils/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Search({
  className,
}: Readonly<{ className?: string }>) {
  const searchParams = useSearchParams();
  const query = searchParams.get("search");
  const [search, setSearch] = useState(query ?? "");
  const router = useRouter();
  const lookFor = () => router.push(`/?search=${search}`);
  return (
    <Input
      className={cn(className)}
      type="text"
      placeholder="Recherche"
      value={search}
      onChange={(e) => {
        e.preventDefault();
        setSearch(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") lookFor();
      }}
    />
  );
}
