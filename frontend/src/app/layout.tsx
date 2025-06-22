import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FuturisticSpinner from "@/components/FuturisticSpinner";
import PageLoader from "@/components/PageLoader";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Photo Nene | Futuristic Photography",
  description:
    "Photo Nene blends nature, technology, and self-growth through a futuristic lens. Visual stories captured with purpose, energy, and evolution in every frame.",
  keywords: [
    "Photo Nene",
    "photography",
    "futuristic",
    "gamer aesthetic",
    "neon",
    "3D visuals",
    "motion UI",
    "albums",
    "gallery",
    "masonry",
    "nature",
    "technology",
    "self-growth",
    "modern web design",
  ],
  openGraph: {
    title: "Photo Nene | Futuristic Photography",
    description:
      "Photo Nene blends nature, technology, and self-growth through a futuristic lens. Visual stories captured with purpose, energy, and evolution in every frame.",
    url: "https://photonene.com/",
    siteName: "Photo Nene",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Photo Nene Futuristic Photography",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Nene | Futuristic Photography",
    description:
      "Photo Nene blends nature, technology, and self-growth through a futuristic lens.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PageLoader>{children}</PageLoader>
      </body>
    </html>
  );
}
