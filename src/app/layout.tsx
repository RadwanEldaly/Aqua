import type { ReactNode } from "react";
import "./globals.css";

// Root layout passes through directly to localized [locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
