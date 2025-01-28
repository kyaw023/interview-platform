const config = {
  env: {
    clerk: {
      clerkPublishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!,
      clerkSecretKey: process.env.NEXT_PUBLIC_CLERK_SECRET_KEY!,
    },
    stream: {
      apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
      apiSecret: process.env.STREAM_SECRET_KEY!,
    },
    convex: {
      convexUrl: process.env.NEXT_PUBLIC_CONVEX_URL!,
    },
  },
};

export default config;
