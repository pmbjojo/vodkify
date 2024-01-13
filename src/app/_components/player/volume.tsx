import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { api } from "@/trpc/react";
import {
  Volume1Icon,
  Volume2Icon,
  VolumeIcon,
  VolumeXIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Volume({
  currentVolume,
}: Readonly<{ currentVolume: number | null }>) {
  const defaultVolume = 50;
  const [volume, setVolume] = useState(currentVolume ?? defaultVolume);
  const { mutate: setPlaybackVolume } =
    api.spotify.setPlaybackVolume.useMutation();
  const [icon, setIcon] = useState(<Volume1Icon />);
  useEffect(() => {
    if (volume === 0) setIcon(<VolumeXIcon />);
    if (volume >= 1 && volume < (1 / 3) * 100) setIcon(<VolumeIcon />);
    if (volume >= (1 / 3) * 100 && volume < (2 / 3) * 100)
      setIcon(<Volume1Icon />);
    if (volume >= (2 / 3) * 100) setIcon(<Volume2Icon />);
  }, [volume]);

  return (
    <Popover>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button variant="outline">{icon}</Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>Volume</TooltipContent>
      </Tooltip>
      <PopoverContent>
        <Slider
          defaultValue={[volume]}
          max={100}
          value={[volume]}
          onValueCommit={() => {
            setPlaybackVolume(volume);
          }}
          onValueChange={(value) => {
            setVolume(value[0] ?? defaultVolume);
          }}
          step={1}
        />
      </PopoverContent>
    </Popover>
  );
}
