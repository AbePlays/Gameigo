const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  images: {
    domains: ['media.rawg.io'],
    formats: ['image/avif', 'image/webp'],
  },
});
