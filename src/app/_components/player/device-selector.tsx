import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/utils/utils";
import { api } from "@/trpc/react";
import React from "react";

export default function DeviceSelector({
  currentDevice,
  className,
}: Readonly<{
  currentDevice: string | null;
  className?: string;
}>) {
  const { data: devices } = api.spotify.getAvailableDevices.useQuery();
  const { mutate: transferPlayback } =
    api.spotify.transferPlayback.useMutation();
  return (
    <Select onValueChange={(device) => transferPlayback({ device })}>
      <Tooltip>
        <TooltipTrigger asChild>
          <SelectTrigger className={cn(className, "hover:bg-secondary/80")}>
            <SelectValue placeholder={currentDevice} />
          </SelectTrigger>
        </TooltipTrigger>
        <TooltipContent>Appareil</TooltipContent>
      </Tooltip>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Appareil</SelectLabel>
          {devices?.devices?.map((device) => (
            <SelectItem value={device.id ?? ""} key={device.id}>
              {device.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
