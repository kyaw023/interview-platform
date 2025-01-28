import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import React from "react";
import { api } from "../../convex/_generated/api";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";

const EndCallButton = () => {
  const call = useCall();

  const router = useRouter();

  const { useLocalParticipant } = useCallStateHooks();

  const localParticipant = useLocalParticipant();

  const updateInterviewStatus = useMutation(
    api.interview.updateInterviewStatus
  );

  const interviews = useQuery(api.interview.getInterviewByStreamCallId, {
    streamCallId: call?.id || "",
  });

  if (!call || !interviews) return null;

  const isMeetingOwner = localParticipant?.userId === call.state.createdBy?.id;

  if (!isMeetingOwner) return null;

  const endCall = async () => {
    try {
      await call?.endCall();
      await updateInterviewStatus({
        id: interviews._id,
        status: "completed",
      });
      router.push("/dashboard");
      toast({
        title: "Meeting ended",
        description: "You can now leave the meeting",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to end the meeting",
      });
    }
  };

  return (
    <Button onClick={endCall} variant={"destructive"}>
      End Meeting
    </Button>
  );
};

export default EndCallButton;
