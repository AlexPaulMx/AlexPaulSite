/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ["assets.sound.xyz", "d2i9ybouka0ieh.cloudfront.net"],
  },
}

export default nextConfig