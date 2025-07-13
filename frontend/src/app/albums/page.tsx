"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import PhotoNeneFooter from "@/components/PhotoNeneFooter";

const albums = [
	{
		id: "neon-nights",
		title: "Neon Nights",
		cover: "/placeholder-album1.jpg",
		description: "City lights and neon dreams.",
	},
	{
		id: "cyber-portraits",
		title: "Cyber Portraits",
		cover: "/placeholder-album2.jpg",
		description: "Gamer-inspired portraits.",
	},
	{
		id: "green-glow",
		title: "Green Glow",
		cover: "/placeholder-album3.jpg",
		description: "Nature meets neon.",
	},
];

// Removed metadata export from client component. See src/app/albums/metadata.ts for SEO metadata.

export default function AlbumsPage() {
	const [showScrollUp, setShowScrollUp] = useState(false);
	const [albumVariants, setAlbumVariants] = useState<string[]>(albums.map(() => "lg:h-64")); // default size for SSR
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		// Assign random variant to each album only on the client
		const cardVariants = [
			"lg:row-span-2 lg:h-96", // tall
			"lg:col-span-2 lg:h-64", // wide
			"lg:h-64", // normal
		];
		setAlbumVariants(
			albums.map(() => cardVariants[Math.floor(Math.random() * cardVariants.length)])
		);
	}, []);

	useEffect(() => {
		const onScroll = () => {
			setShowScrollUp(window.scrollY > 200);
		};
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	if (!mounted) return null;

	return (
		<div className="min-h-screen flex flex-col bg-black text-white font-[family-name:var(--font-geist-sans)]">
			<header className="flex items-center justify-between px-6 py-6">
				<Link
					href="/"
					className="text-2xl font-bold tracking-tight hover:underline text-white"
				>
					Photo Nene
				</Link>
				{/* <span className="text-[#39ff14] border border-[#39ff14] rounded-full px-4 py-1 text-sm">
					Albums
				</span> */}
			</header>
			<main className="flex-1 flex flex-col items-center px-4">
				<motion.h1
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7 }}
					className="text-3xl sm:text-4xl font-bold mb-8 mt-8 text-center text-white"
				>
					Albums
				</motion.h1>
				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[16rem] w-full max-w-5xl">
					{albums.map((album, idx) => (
						<Link
							key={album.id}
							href={`/albums/${album.id}`}
							className={`group border border-[#222] rounded-xl overflow-hidden bg-[#101010] hover:border-[#39ff14] transition-colors flex flex-col ${albumVariants[idx]}`}
						>
							<div className="relative w-full h-full">
								<Image
									src={album.cover}
									alt={album.title}
									width={800}
									height={600}
									className="w-full h-full object-cover object-center group-hover:opacity-90 transition-opacity duration-200"
									loading="lazy"
								/>
								{/* Mobile overlay for title/desc */}
								<div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-3 sm:hidden">
									<h2 className="text-base font-semibold text-white mb-1">
										{album.title}
									</h2>
									<p className="text-[#baffc9] text-xs mb-1">
										{album.description}
									</p>
									<span className="text-[#39ff14] text-xs font-medium group-hover:underline">
										View Gallery →
									</span>
								</div>
							</div>
							<div className="p-5 flex-1 flex-col hidden sm:flex">
								<h2 className="text-xl font-semibold mb-1 text-white">
									{album.title}
								</h2>
								<p className="text-[#baffc9] text-sm mb-2 flex-1">
									{album.description}
								</p>
								<span className="text-[#39ff14] text-xs font-medium mt-auto group-hover:underline">
									View Gallery →
								</span>
							</div>
						</Link>
					))}
				</div>
				{/* Scroll Up Button */}
				{showScrollUp && (
					<button
						className="fixed bottom-8 right-8 z-50 bg-[#101010] border-2 border-[#39ff14] text-[#39ff14] hover:bg-[#39ff14] hover:text-black rounded-full p-4 shadow-lg transition-colors animate-pulse"
						style={{
							boxShadow: "0 0 24px #39ff14, 0 0 8px #39ff14 inset",
						}}
						onClick={() =>
							window.scrollTo({ top: 0, behavior: "smooth" })
						}
						aria-label="Scroll to top"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="w-6 h-6 mx-auto"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M5 15l7-7 7 7"
							/>
						</svg>
					</button>
				)}
			</main>
			<footer>
				<PhotoNeneFooter backHref="/" backLabel="← Home" />
			</footer>
		</div>
	);
}
