"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/utils/utils";
import { useDebounce } from "@react-hooks-library/core";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search({
  className,
}: Readonly<{ className?: string }>) {
  const searchParams = useSearchParams();
  const query = searchParams.get("search");
  const [search, setSearch] = useState(query ?? "");
  const debouncedSearch = useDebounce(search, 200);
  const router = useRouter();
  useEffect(() => {
    router.push(`/?search=${debouncedSearch}`);
  }, [debouncedSearch, router]);
  return (
    <Input
      className={cn(className)}
      type="text"
      placeholder="Que souhaitez vous écouter ?"
      value={search}
      onChange={(e) => {
        e.preventDefault();
        setSearch(e.target.value);
      }}
    />
  );
}
