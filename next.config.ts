import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env :{
    'API_URL': 'https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json',
  }
};

export default nextConfig;
