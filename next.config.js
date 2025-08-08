/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },

  // Add headers method to control HTTP headers
  async headers() {
    return [
      {
        source: '/(.*)', // all routes
        headers: [
          // You can disable COOP/COEP by not setting them, or explicitly unset them:
          // Uncomment these if you want to actively remove headers (usually not necessary)
          // { key: 'Cross-Origin-Opener-Policy', value: '' },
          // { key: 'Cross-Origin-Embedder-Policy', value: '' },
        ],
      },
    ];
  },
};

// Add your experimental swcPlugins if needed
if (process.env.NEXT_PUBLIC_TEMPO) {
  nextConfig.experimental = {
    // NextJS 13.4.8 up to 14.1.3:
    // swcPlugins: [[require.resolve("tempo-devtools/swc/0.86"), {}]],
    // NextJS 14.1.3 to 14.2.11:
    swcPlugins: [[require.resolve("tempo-devtools/swc/0.90"), {}]],
  };
}

module.exports = nextConfig;
