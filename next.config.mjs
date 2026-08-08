/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // pdf-parse relies on pdfjs, which loads a companion pdf.worker.mjs at
  // runtime. If the bundler inlines these, the worker file can't be resolved
  // ("Setting up fake worker failed"). Keeping them external makes Node load
  // them from node_modules, where the worker sits next to the main module.
  serverExternalPackages: ["pdf-parse", "pdfjs-dist"],
  experimental: {
    serverActions: {
      // Allow course materials (PDFs) well beyond the 1 MB default.
      bodySizeLimit: "25mb",
    },
  },
}

export default nextConfig
