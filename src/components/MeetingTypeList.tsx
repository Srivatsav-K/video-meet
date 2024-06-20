"use client";

import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useState } from "react";
import HomeCard from "./HomeCard";
import Loader from "./Loader";
import MeetingModal from "./MeetingModal";
import { useToast } from "./ui/use-toast";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const client = useStreamVideoClient();
  const { toast } = useToast();

  const createInstantMeeting = async () => {
    try {
      setLoading(true);

      if (!user || !client) throw new Error("Failed to create call");

      const callType = "default";
      const callId = crypto.randomUUID();
      const call = client.call(callType, callId);

      if (!call) throw new Error("Failed to create call");

      await call.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
          custom: {
            description: "Instant meeting",
          },
        },
      });

      router.push(`/meeting/${callId}`);
    } catch (e) {
      console.log(e);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Failed to create meeting",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New meeting"
        description="Start an instant meeting"
        handleClick={() => {
          setMeetingState("isInstantMeeting");
        }}
        className="bg-orange-1"
      />

      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule meeting"
        description="Plan your meeting"
        handleClick={() => {
          setMeetingState("isScheduleMeeting");
        }}
        className="bg-blue-1"
      />

      <HomeCard
        img="/icons/recordings.svg"
        title="View recordings"
        description="Check your recordings"
        handleClick={() => {
          router.push("/recordings");
        }}
        className="bg-purple-1"
      />

      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join meeting"
        description="Via invitation link"
        handleClick={() => {
          setMeetingState("isJoiningMeeting");
        }}
        className="bg-yellow-1"
      />

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant meeting"
        buttonText="Start meeting"
        handleClick={createInstantMeeting}
        className="text-center"
      />
    </section>
  );
};
export default MeetingTypeList;
