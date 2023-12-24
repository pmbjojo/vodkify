"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Search() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const lookFor = () => router.push(`/?search=${search}`);
  return (
    <div className="flex gap-3">
      <Input
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
      <Button onClick={() => lookFor()}>
        <SearchIcon />
      </Button>
    </div>
  );
}
