import { tektur } from "@/app/layout";
import { ReactNode } from "react";

export function Header({ children }: { children: ReactNode }) {
  return (
    <h2
      className={`${tektur.className} text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-12`}
    >
      {children}
    </h2>
  );
}
