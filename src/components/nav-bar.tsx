"use client";

import { Zap } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function NavBar() {
  return (
    <nav className="flex items-center gap-x-2 container mx-auto justify-between py-5">
      <div className="flex gap-x-2 items-center">
        <Zap className="w-6 h-6 text-emerald-500" />
        <h1 className="text-2xl font-bold">CSS2Tail</h1>
      </div>
      <ThemeToggle />
    </nav>
  );
}
