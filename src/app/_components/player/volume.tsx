import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { api } from "@/trpc/react";
import {
  Volume1Icon,
  Volume2Icon,
  VolumeIcon,
  VolumeXIcon,
} from "lucide-react";
import { useState } from "react";

export default function Volume({
  currentVolume,
}: Readonly<{ currentVolume: number | null }>) {
  const [volume, setVolume] = useState(currentVolume ?? 50);
  const { mutate: setPlaybackVolume } =
    api.spotify.setPlaybackVolume.useMutation();
  let Icon = Volume2Icon;
  if (volume === 0) Icon = VolumeXIcon;
  if (volume < (1 / 3) * 100) Icon = VolumeIcon;
  if (volume < (2 / 3) * 100) Icon = Volume1Icon;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Icon />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Slider
          defaultValue={[volume]}
          max={100}
          value={[volume]}
          onValueCommit={() => {
            setPlaybackVolume(volume);
          }}
          onValueChange={(value) => {
            setVolume(value[0] ?? 50);
          }}
          step={1}
        />
      </PopoverContent>
    </Popover>
  );
}
