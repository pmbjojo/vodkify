import { PlusIcon, CheckIcon, BanIcon, Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  BreakPointHooks,
  breakpointsTailwind,
} from "@react-hooks-library/core";

export const { useGreater, useBetween, useSmaller } =
  BreakPointHooks(breakpointsTailwind);

export const useIconTimeout = (
  status: "error" | "idle" | "loading" | "success",
) => {
  const [icon, setIcon] = useState(<PlusIcon />);
  const [variant, setVariant] = useState<
    "default" | "secondary" | "destructive"
  >("secondary");
  useEffect(() => {
    switch (status) {
      case "success":
        setIcon(<CheckIcon />);
        setVariant("default");
        setTimeout(() => {
          setIcon(<PlusIcon />);
          setVariant("secondary");
        }, 1000);
        break;
      case "error":
        setIcon(<BanIcon />);
        setVariant("destructive");
        setTimeout(() => {
          setIcon(<PlusIcon />);
          setVariant("secondary");
        }, 1000);
        break;
      case "loading":
        setIcon(<Loader2Icon className="animate-spin" />);
        break;
      default:
        setIcon(<PlusIcon />);
        break;
    }
  }, [status]);
  return { icon, variant };
};
