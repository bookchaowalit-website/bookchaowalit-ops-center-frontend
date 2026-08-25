import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ops Center — Runbook Control Room",
  description: "A product design study for choosing a runbook, checking the current step, and recording the next safe action.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
