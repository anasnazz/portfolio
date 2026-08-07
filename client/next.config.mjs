/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Required: Generates static HTML/CSS/JS
  images: {
    unoptimized: true, // Required: GitHub Pages cannot optimize images on the server
  },
  // Note: No basePath is needed because this is your root site!
};

export default nextConfig;