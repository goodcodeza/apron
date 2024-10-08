/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: '/',
				destination: '/users',
				permanent: true
			}
		];
	},
	compiler: {
		reactRemoveProperties: process.env.NODE_ENV === 'production'
	}
};

export default nextConfig;
