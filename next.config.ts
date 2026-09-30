import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
    // 90 keeps the full-screen film frame free of banding in the dark greens.
    qualities: [75, 90],
  },
}

export default nextConfig
