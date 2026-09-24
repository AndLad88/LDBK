import type { NextConfig } from "next";
import { social } from "./src/data/content";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // QR-koderna pekar hit, så att länkarna kan ändras i efterhand
      { source: "/instagram", destination: social.instagram, permanent: false },
    ];
  },
};

export default nextConfig;
