"use server";
import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

//https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
const apiSecret = process.env.STREAM_SECRET_KEY!;

export const tokenProvider = async () => {
  const user = await currentUser();

  if (!user) throw new Error("User is not logged in");
  if (!apiKey) throw new Error("Stream API key missing");
  if (!apiSecret) throw new Error("Stream API secret missing");

  const serverClient = new StreamClient(apiKey, apiSecret, { timeout: 3000 });

  // exp is optional (by default the token is valid for an hour)
  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;

  const issuedAt = Math.floor(Date.now() / 1000) - 60;

  const token = serverClient.createToken(user.id, exp, issuedAt);

  return token;
};
