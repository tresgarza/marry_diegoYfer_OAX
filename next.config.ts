import type { NextConfig } from "next";
import path from "node:path";

const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  // Only use outputFileTracingRoot in local development, not in Vercel
  ...(process.env.VERCEL !== '1' && {
    outputFileTracingRoot: path.resolve(__dirname, '../../'),
  }),
  // Only use Turbopack loader in development, not in production builds
  // Temporarily disabled due to Turbopack bug with directory reading
  // ...(process.env.NODE_ENV === 'development' && {
  //   turbopack: {
  //     rules: {
  //       "*.{jsx,tsx}": {
  //         loaders: [LOADER]
  //       }
  //     }
  //   }
  // })
};

export default nextConfig;
