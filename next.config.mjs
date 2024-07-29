const prod = process.env.NODE_ENV === 'production'
const dev = process.env.NODE_ENV === 'development'

import { createSecureHeaders } from 'next-secure-headers'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // env: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        port: '',
        // pathname: '/custom-prefix/**',
      },
    ],
  },
  reactStrictMode: true,
  poweredByHeader: false,
  swcMinify: true,
  ...(prod
    ? {
        compiler: {
          removeConsole: prod,
        },
      }
    : {}),
  skipTrailingSlashRedirect: true,
  trailingSlash: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: createSecureHeaders({
          forceHTTPSRedirect: dev
            ? false
            : [
                true,
                {
                  maxAge: 60 * 60 * 24 * 365 * 2,
                  // includeSubDomains: true
                },
              ],
          referrerPolicy: 'no-referrer-when-downgrade',
          frameGuard: false,
        }),
      },
    ]
  },
}

export default nextConfig
