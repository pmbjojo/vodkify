import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { api } from "@/trpc/react";
import { PauseIcon, PlayIcon } from "lucide-react";

export default function PlayPauseButton() {
  const { data: plabackState } = api.spotify.getPlaybackState.useQuery();
  const utils = api.useUtils();
  const { mutate: startResumePlayback } =
    api.spotify.startResumePlayback.useMutation({
      async onSuccess() {
        await utils.spotify.invalidate();
      },
    });
  const { mutate: pausePlayback } = api.spotify.pausePlayback.useMutation({
    async onSuccess() {
      await utils.spotify.invalidate();
    },
  });
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {plabackState?.is_playing ? (
          <Button
            variant="outline"
            disabled={!plabackState?.device?.id}
            onClick={() => pausePlayback()}
          >
            <PauseIcon />
          </Button>
        ) : (
          <Button
            variant="outline"
            disabled={!plabackState?.device?.id}
            onClick={() => startResumePlayback({})}
          >
            <PlayIcon />
          </Button>
        )}
      </TooltipTrigger>
      <TooltipContent>
        {plabackState?.is_playing ? "Pause" : "Play"}
      </TooltipContent>
    </Tooltip>
  );
}
