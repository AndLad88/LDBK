import type { NextConfig } from "next";
import { social } from "./src/data/content";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Instagram-QR-koden pekar hit, så att länken kan ändras i efterhand
      { source: "/instagram", destination: social.instagram, permanent: false },
    ];
  },
};

export default nextConfig;
