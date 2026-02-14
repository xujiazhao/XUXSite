/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static image imports
  images: {
    domains: [
      'www.notion.so',
      'notion.so',
      'images.unsplash.com',
      'abs.twimg.com',
      'pbs.twimg.com',
      's3.us-west-2.amazonaws.com',
      'prod-files-secure.s3.us-west-2.amazonaws.com',
    ],
    // Use unoptimized for static export compatibility
    unoptimized: true,
  },

  // Notion API response can be large
  experimental: {
    largePageDataBytes: 512 * 1000,
  },
}

module.exports = nextConfig
