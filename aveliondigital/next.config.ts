import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats (AVIF first, WebP as fallback) for any future
    // raster images. SVGs served via next/image are unaffected.
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Vercel stellt .next/cache wieder her; mit warmem Turbopack-Cache wurde
    // app/globals.css (Tailwind) in Production aus einem alten Stand gebaut.
    // Ohne Build-Cache kompiliert jeder Deploy das CSS frisch.
    turbopackFileSystemCacheForBuild: false,
  },
};

export default nextConfig;
