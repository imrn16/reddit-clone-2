/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        loader: 'custom',
        loaderFile: './src/app/common/customImageLoader.js',
      },
  };
  

export default nextConfig;
