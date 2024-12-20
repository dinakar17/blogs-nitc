/** @type {import('next').NextConfig} */

// WithBundleAnalyzer is a custom plugin that enables bundle analyzer which helps to analyze the bundle size. 
// To start the bundle analyzer, run the command `npm run analyze` or `yarn analyze`
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

// https://github.com/timlrx/tailwind-nextjs-starter-blog/issues/319
const ContentSecurityPolicy = `
  
`
// default-src 'self';
//   script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app *.googletagmanager.com *.google-analytics.com;
//   style-src 'self' 'unsafe-inline';
//   img-src * blob: data:;
//   media-src 'none';
//   connect-src *;
//   font-src 'self';
//   frame-ancestors 'self';
//   frame-src giscus.app

// Note: Security headers are added because of security best practices.
const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false,
  },
  // add security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  images: {
    // allow all domains
    domains: ['localhost', 'imagev2api.linoxcloud.com'],
  },
});

// Note: "depcheck" helps you to find unused dependencies in your project.
// Todo: https://darrenwhite.dev/blog/nextjs-replace-react-with-preact
