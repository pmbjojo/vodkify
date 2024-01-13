import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function SearchCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Skeleton className="h-4 w-full flex-grow " />
          <div className="flex-grow" />
        </CardTitle>
        <CardDescription>
          <div className="flex gap-1 truncate">
            <Skeleton className="h-4 w-32 " />
            <Skeleton className="h-4 w-32 " />
            <Skeleton className="h-4 w-32 " />
            <div className="flex-grow truncate text-right">
              <Skeleton className="h-4 w-96 " />
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        <Skeleton className="h-full w-full flex-grow rounded-md" />
      </CardContent>
    </Card>
  );
}
