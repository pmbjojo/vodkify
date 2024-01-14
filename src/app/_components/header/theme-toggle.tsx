"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {resolvedTheme === "dark" ? <Moon /> : <Sun />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuCheckboxItem
          onClick={() => setTheme("light")}
          checked={theme === "light"}
        >
          Clair
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          onClick={() => setTheme("dark")}
          checked={theme === "dark"}
        >
          Sombre
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          onClick={() => setTheme("system")}
          checked={theme === "system"}
        >
          Système
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
