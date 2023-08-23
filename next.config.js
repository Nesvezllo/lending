/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    additionalData: `@import "@/styles/commons/media_breakpoints.scss";`,
  },
}




module.exports = nextConfig
