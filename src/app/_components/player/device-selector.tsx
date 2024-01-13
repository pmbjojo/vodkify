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
import { api } from "@/trpc/react";
import React from "react";
import { Button } from "@/components/ui/button";

export default function DeviceSelector({
  className,
}: Readonly<{
  className?: string;
}>) {
  const [plabackState] = api.spotify.getPlaybackState.useSuspenseQuery();
  const { data: devices } = api.spotify.getAvailableDevices.useQuery();
  const { mutate: transferPlayback } =
    api.spotify.transferPlayback.useMutation();

  return (
    <Select
      onValueChange={(device) => transferPlayback({ device })}
      defaultValue={plabackState?.device.id ?? undefined}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button asChild variant="outline">
            <SelectTrigger className={className}>
              <SelectValue placeholder="Appareil" />
            </SelectTrigger>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Appareil</TooltipContent>
      </Tooltip>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Appareil</SelectLabel>
          {devices?.devices?.map((device) => (
            <SelectItem value={device.id ?? "Inconnu"} key={device.id}>
              {device.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
