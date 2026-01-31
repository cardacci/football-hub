import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: 'media.api-sports.io',
				pathname: '/**',
				protocol: 'https',
			},
			{
				hostname: 'media-*.api-sports.io',
				pathname: '/**',
				protocol: 'https',
			},
		],
	},
	/* config options here */
	reactCompiler: true,
};

export default nextConfig;
