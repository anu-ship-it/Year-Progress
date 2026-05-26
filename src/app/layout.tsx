import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:       "Year Progress — Time, quantified",
  description: "See exactly what percentage of the year, month, week, and day has elapsed — live, to the second.",
  metadataBase: new URL("https://year-progress.vercel.app"),
  openGraph: {
    title:       "Year Progress",
    description: "How much of the year is gone? Find out — live, to the second.",
    type:        "website",
    url:         "https://year-progress.vercel.app",
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Year Progress",
    description: "How much of the year is gone? Live, to the second.",
  },
  robots: { index: true, follow: true },
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/*
          font-display=swap prevents render-blocking.
          Both weights of DM Mono to avoid FOUT on bold text.
        */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
