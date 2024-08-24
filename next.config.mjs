import fs from "node:fs";
import path from "node:path";

const packageJsonPath = path.join(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    appVersion: packageJson.version
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
