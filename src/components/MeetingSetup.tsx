"use client";
import {
  DeviceSettings,
  VideoPreview,
  useCall,
} from "@stream-io/video-react-sdk";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";

type MeetingSetupProps = {
  updateSetupCompletionStatus: (staus: boolean) => void;
};
const MeetingSetup = ({ updateSetupCompletionStatus }: MeetingSetupProps) => {
  const call = useCall();
  const [isMicCamToggled, setIsMicCamToggled] = useState(false);

  useEffect(() => {
    if (!call?.camera || !call.microphone) return;

    if (isMicCamToggled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMicCamToggled, call?.camera, call?.microphone]);

  if (!call) {
    return (
      <Alert className="mx-auto my-[15%] max-w-[350px] border-none bg-dark-1 text-white">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Error starting call</AlertDescription>
      </Alert>
    );
  }
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-center text-2xl font-bold">Setup</h1>

      <VideoPreview />

      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggled}
            onChange={(e) => setIsMicCamToggled(e.target.checked)}
          />
          Join with mic and camera off
        </label>

        <DeviceSettings />
      </div>

      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          call.join();

          updateSetupCompletionStatus(true);
        }}
      >
        Join meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
