"use server";

import config from "@/lib/config";
import { currentUser } from "@clerk/nextjs/server";

import { StreamClient } from "@stream-io/node-sdk";

export const streamTokenProvider = async () => {
  const user = await currentUser();

  if (!user) throw new Error("User not found");

  const streamClient = new StreamClient(
    config.env.stream.apiKey,
    config.env.stream.apiSecret
  );

  const token = await streamClient.generateUserToken({ user_id: user.id });

  return token; 
};
