/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zlrhivicmrzlathlilhu.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/car-images/**',
      },
    ],
  },
    async headers(){
        return [
            {
                source: "/embed",
                headers: [
                    {
                        key: "Content-Security-Policy",
                        value: "frame-src 'self' https://www.create.xyz/app/eeaf07f4-ba37-4f24-a763-1d58ba02ac24;",
                    }
                ]
            }
        ]
    }
};

export default nextConfig;
