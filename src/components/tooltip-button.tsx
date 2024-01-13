import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button, type ButtonProps } from "./ui/button";

export default function TooltipButton(
  props: { children: React.ReactNode; description: string } & ButtonProps,
) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button {...props}>{props.children}</Button>
      </TooltipTrigger>
      <TooltipContent>{props.description} </TooltipContent>
    </Tooltip>
  );
}
