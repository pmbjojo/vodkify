import { Loader2Icon } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="flex w-full flex-col items-center justify-center overflow-hidden">
      <Loader2Icon className="h-60 w-60 animate-spin" strokeWidth={1} />
      <h2 className="text-center text-xl font-semibold text-white">
        Chargement...
      </h2>
    </div>
  );
}
