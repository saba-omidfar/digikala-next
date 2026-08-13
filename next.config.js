/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dkstatics-private.digikala.com",
      },
      {
        protocol: "https",
        hostname: "dkstatics-public.digikala.com",
      },
      {
        protocol: "https",
        hostname: "dkstatics-public.digikala.com",
        pathname: "/digikala-static/**",
      },
      {
        protocol: "https",
        hostname: "dkstatics-public.digikala.com",
        pathname: "/digikala-products/**",
      },
      {
        protocol: "https",
        hostname: "dkstatics-public.digikala.com",
        pathname: "/digikala-comment-files/**",
      },
      {
        protocol: "https",
        hostname: "dkstatics-public.digikala.com",
        pathname: "/digikala-content-x-post-media/**",
      },
      {
        protocol: "https",
        hostname: "www.digikala.com",
      },
      {
        protocol: "https",
        hostname: "digikala.arvanvod.ir",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
