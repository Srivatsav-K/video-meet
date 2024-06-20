"use client";
import Loader from "@/components/Loader";
import MeeetingRoom from "@/components/MeeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { AlertCircle } from "lucide-react";
import { useState } from "react";

type MeetingParams = {
  id?: string;
};
type MeetingProps = {
  params: MeetingParams;
};
const Meeting = ({ params: { id } }: MeetingProps) => {
  const { user, isLoaded } = useUser();

  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { call, isCallLoading, callError } = useGetCallById(id || "");

  if (!isLoaded || isCallLoading) return <Loader />;
  if (callError) {
    return (
      <Alert className="mx-auto my-[15%] max-w-[350px] border-none bg-dark-1 text-white">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{callError}</AlertDescription>
      </Alert>
    );
  }
  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {isSetupComplete ? <MeeetingRoom /> : <MeetingSetup />}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};
export default Meeting;
