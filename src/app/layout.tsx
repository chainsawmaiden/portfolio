import "./globals.css";
import "./projects.css";
import "./fonts.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aditya Das",
  description: "Portfolio of Aditya Das, a multidisciplinary designer and engineer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}