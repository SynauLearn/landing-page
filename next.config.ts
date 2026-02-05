import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      oneOf: [
        {
          include: /assets\/(icons|vector)/,
          use: ["@svgr/webpack"],
        },

        {
          type: "asset/resource",
          include: /assets\/images/,
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
