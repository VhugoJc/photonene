import HomeClient from "@/components/HomeClient";

export const metadata = {
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

export default function Home() {
  return <HomeClient />;
}
