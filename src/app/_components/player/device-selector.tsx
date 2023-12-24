import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { api } from "@/trpc/react";
import React from "react";

export default function DeviceSelector({ device }: { device: string | null }) {
  const { data: devices } = api.spotify.getAvailableDevices.useQuery();
  const { mutate: transferPlayback } =
    api.spotify.transferPlayback.useMutation();
  return (
    <Select onValueChange={(device) => transferPlayback({ device })}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={device} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Appareil</SelectLabel>
          {devices?.devices.map((device) => (
            <SelectItem value={device.id ?? ""} key={device.id}>
              {device.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
