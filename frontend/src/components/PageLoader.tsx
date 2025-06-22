"use client";
import { useEffect, useState } from "react";
import FuturisticSpinner from "@/components/FuturisticSpinner";

export default function PageLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <FuturisticSpinner />;
  return <>{children}</>;
}
