"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import PhotoNeneFooter from "@/components/PhotoNeneFooter";
import PageLoader from "@/components/PageLoader";

type AlbumKey = "neon-nights" | "cyber-portraits" | "green-glow";

const albumData: Record<AlbumKey, { title: string; description: string; images: string[] }> = {
    "neon-nights": {
        title: "Neon Nights",
        description: "City lights and neon dreams. Futuristic urban photography.",
        images: [
            "/placeholder-album1.jpg",
            "/placeholder-album2.jpg",
            "/placeholder-album3.jpg",
            "/placeholder-album1.jpg",
            "/placeholder-album2.jpg",
            "/placeholder-album3.jpg",
        ],
    },
    "cyber-portraits": {
        title: "Cyber Portraits",
        description: "Gamer-inspired portraits with a digital edge.",
        images: [
            "https://cdn.pixabay.com/photo/2025/06/05/09/49/young-man-9642647_1280.jpg",
            "https://cdn.pixabay.com/photo/2025/06/05/09/49/architecture-9642644_1280.jpg",
            "https://cdn.pixabay.com/photo/2025/06/05/09/49/man-9642645_1280.jpg",
            "https://cdn.pixabay.com/photo/2025/06/05/09/49/young-man-9642647_1280.jpg",
            "https://cdn.pixabay.com/photo/2025/06/05/09/49/architecture-9642644_1280.jpg",
            "https://cdn.pixabay.com/photo/2025/06/05/09/49/man-9642645_1280.jpg",
            "https://cdn.pixabay.com/photo/2025/06/05/09/49/young-man-9642647_1280.jpg",
            "https://cdn.pixabay.com/photo/2025/06/05/09/49/architecture-9642644_1280.jpg",
            "https://cdn.pixabay.com/photo/2025/06/05/09/49/man-9642645_1280.jpg",
            "https://cdn.pixabay.com/photo/2025/06/05/09/49/young-man-9642647_1280.jpg",
            "https://cdn.pixabay.com/photo/2025/06/05/09/49/architecture-9642644_1280.jpg",
            "https://cdn.pixabay.com/photo/2025/06/05/09/49/man-9642645_1280.jpg",
            "/placeholder-album2.jpg",
            "/placeholder-album3.jpg",
            "/placeholder-album1.jpg",
        ],
    },
    "green-glow": {
        title: "Green Glow",
        description: "Nature meets neon. Surreal landscapes in green.",
        images: [
            "/placeholder-album3.jpg",
            "/placeholder-album1.jpg",
            "/placeholder-album2.jpg",
            "/placeholder-album3.jpg",
            "/placeholder-album1.jpg",
            "/placeholder-album2.jpg",
        ],
    },
};

// Helper to randomize image heights for a masonry effect
const getRandomHeight = () => {
    const sizes = ["h-48", "h-64", "h-80", "h-56", "h-72"];
    return sizes[Math.floor(Math.random() * sizes.length)];
};

// Removed metadata export from client component. See src/app/albums/[albumId]/metadata.ts for SEO metadata.

export default function AlbumGalleryPage() {
    const params = useParams();
    const albumId = params?.albumId as AlbumKey;
    const album = albumData[albumId];
    const [modalImg, setModalImg] = useState<string | null>(null);
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [selectMode, setSelectMode] = useState(false);
    const [showScrollUp, setShowScrollUp] = useState(false);

    const toggleSelect = (src: string) => {
        setSelectedImages((prev) =>
            prev.includes(src) ? prev.filter((s) => s !== src) : [...prev, src]
        );
    };

    const downloadSelected = async () => {
        for (const src of selectedImages) {
            try {
                const response = await fetch(src, { mode: 'cors' });
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = src.split('/').pop() || 'image.jpg';
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            } catch (err) {
                alert('Failed to download ' + src);
            }
        }
    };

    useEffect(() => {
        const onScroll = () => {
            setShowScrollUp(window.scrollY > 200);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Memoize random heights for each image (stable for session)
    const imageHeights = useMemo(() => {
        if (!album) return [];
        return album.images.map(() => getRandomHeight());
    }, [album]);

    if (!album) {
        return (
            <PageLoader>
                <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold mb-4 text-white">Album not found</h1>
                    <Link href="/albums" className="text-[#39ff14] underline">Back to Albums</Link>
                </div>
            </PageLoader>
        );
    }

    // Sort images: selected first, then unselected
    const sortedImages = [
        ...album.images.filter((src) => selectMode && selectedImages.includes(src)),
        ...album.images.filter((src) => !selectMode || !selectedImages.includes(src)),
    ];

    return (
        <PageLoader>
            <div className="min-h-screen bg-black text-white flex flex-col font-[family-name:var(--font-geist-sans)]">
                <header className="flex items-center justify-between px-6 py-6">
                    <Link href="/albums" className="text-2xl font-bold tracking-tight hover:underline text-white">Albums</Link>
                    {/* <span className="text-[#39ff14] border border-[#39ff14] rounded-full px-4 py-1 text-sm">Gallery</span> */}
                    <button
                        className={`ml-4 px-4 py-1 rounded-full border border-[#39ff14] text-sm font-semibold transition-colors ${selectMode ? 'bg-[#39ff14] text-black' : 'text-[#39ff14] hover:bg-[#39ff14] hover:text-black'}`}
                        onClick={() => setSelectMode((v) => !v)}
                    >
                        {selectMode ? 'Cancel Selection' : 'Select Images'}
                    </button>
                    {selectMode && selectedImages.length > 0 && (
                        <button
                            className="ml-2 px-4 py-1 rounded-full border border-[#39ff14] bg-[#39ff14] text-black text-sm font-semibold transition-colors hover:bg-white"
                            onClick={downloadSelected}
                        >
                            Download Selected ({selectedImages.length})
                        </button>
                    )}
                </header>
                <main className="flex-1 w-full flex flex-col">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2 mt-2 text-center text-white">
                        {album.title}
                    </h1>
                    <p className="text-[#baffc9] text-lg max-w-xl mb-6 text-center mx-auto">
                        {album.description}
                    </p>
                    <div className="flex-1 w-full max-w-[1800px] mx-auto px-2 pb-8">
                        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                            {sortedImages.map((src: string, idx: number) => {
                                // Find the index in the original album.images array to get the correct height
                                const originalIdx = album.images.indexOf(src);
                                const heightClass = imageHeights[originalIdx] || "h-64";
                                return (
                                    <div
                                        key={idx}
                                        className={`relative break-inside-avoid overflow-hidden rounded-xl shadow-lg border ${selectMode && selectedImages.includes(src) ? 'border-2 border-[#39ff14]' : 'border border-[#222] hover:border-[#39ff14]'} bg-[#101010] transition-colors duration-200 mb-4 ${heightClass} ${selectMode && 'cursor-pointer'}`}
                                        onClick={() => selectMode ? toggleSelect(src) : setModalImg(src)}
                                        tabIndex={0}
                                        role="button"
                                        aria-label={selectMode ? (selectedImages.includes(src) ? 'Deselect image' : 'Select image') : 'Open image'}
                                    >
                                        <img
                                            src={src}
                                            alt={album.title + " image " + (idx + 1)}
                                            className="w-full h-full object-cover object-center hover:opacity-90 transition-opacity duration-200 bg-[#181818]"
                                            loading="lazy"
                                        />
                                        {selectMode && selectedImages.includes(src) && (
                                            <div className="absolute top-2 right-2 w-6 h-6 rounded-full border-2 border-[#39ff14] bg-[#39ff14] flex items-center justify-center">
                                                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {/* Modal Lightbox */}
                    {modalImg && (
                        <div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
                            onClick={() => setModalImg(null)}
                        >
                            <div className="relative flex items-center justify-center w-full h-full">
                                <img
                                    src={modalImg}
                                    alt="Full size preview"
                                    className="max-h-[90vh] max-w-[95vw] rounded-xl cursor-zoom-out"
                                    onClick={e => e.stopPropagation()}
                                />
                                <button
                                    type="button"
                                    onClick={async (e) => {
                                        e.stopPropagation();
                                        try {
                                            const response = await fetch(modalImg, { mode: 'cors' });
                                            const blob = await response.blob();
                                            const url = window.URL.createObjectURL(blob);
                                            const a = document.createElement('a');
                                            a.href = url;
                                            a.download = modalImg.split('/').pop() || 'image.jpg';
                                            document.body.appendChild(a);
                                            a.click();
                                            a.remove();
                                            window.URL.revokeObjectURL(url);
                                        } catch (err) {
                                            alert('Failed to download image.');
                                        }
                                    }}
                                    className="absolute bottom-4 right-4 bg-black/70 hover:bg-white text-[#39ff14] hover:text-black border border-[#39ff14] rounded-full p-3 flex items-center justify-center transition-colors shadow-lg"
                                    aria-label="Download image"
                                    style={{ zIndex: 10 }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4m-8 8h8" />
                                    </svg>
                                </button>
                            </div>
                            <button
                                className="absolute top-6 right-8 text-[#39ff14] text-4xl font-bold bg-transparent hover:text-white transition-colors border-none outline-none"
                                onClick={() => setModalImg(null)}
                                aria-label="Close image preview"
                                style={{ borderRadius: 0, background: 'none', padding: 0 }}
                            >
                                ×
                            </button>
                        </div>
                    )}
                    {/* Scroll Up Button */}
                    {showScrollUp && !modalImg && (
                        <button
                            className="fixed bottom-8 right-8 z-50 bg-[#101010] border-2 border-[#39ff14] text-[#39ff14] hover:bg-[#39ff14] hover:text-black rounded-full p-4 shadow-lg transition-colors animate-pulse"
                            style={{ boxShadow: '0 0 24px #39ff14, 0 0 8px #39ff14 inset' }}
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            aria-label="Scroll to top"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mx-auto">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                            </svg>
                        </button>
                    )}
                </main>
                <footer className="mt-8">
                    <PhotoNeneFooter backHref="/albums" backLabel="← Back to Albums" />
                </footer>
            </div>
        </PageLoader>
    );
}
