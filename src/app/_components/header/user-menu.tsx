"use client";

import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function UserMenu() {
  const { resolvedTheme } = useTheme();
  return (
    <UserButton
      appearance={{ baseTheme: resolvedTheme === "dark" ? dark : undefined }}
    />
  );
}
