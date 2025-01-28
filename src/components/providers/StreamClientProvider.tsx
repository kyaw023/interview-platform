"use client";

import { useEffect, useState, ReactNode } from "react";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import LoaderUI from "../LoaderUI";
import { streamTokenProvider } from "@/actions/stream.actions";

const StreamClientProvider = ({ children }: { children: ReactNode }) => {
  const [streamVideoClient, setStreamVideoClient] =
    useState<StreamVideoClient>();

  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      const streamClient = new StreamVideoClient({
        apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
        user: {
          id: user?.id,
          name: user?.firstName || "" + user?.lastName || "" || user?.id,
        },
        tokenProvider: streamTokenProvider,
      });
      setStreamVideoClient(streamClient);
    }
  }, [user, isLoaded]);

  if (!streamVideoClient) {
    return <LoaderUI />;
  }

  return <StreamVideo client={streamVideoClient}>{children}</StreamVideo>;
};

export default StreamClientProvider;
