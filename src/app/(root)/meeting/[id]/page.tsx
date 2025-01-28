"use client";

import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import useGetCallById from "@/hooks/useGetCallById";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import { useState } from "react";

type Params = {
  id: string;
};

export default function Page() {
  const { id } = useParams<Params>();

  const [isSetupCompleted, setIsSetupCompleted] = useState(false);

  const { call } = useGetCallById(id);

  // if (!isLoaded || !isCallLoading) return <LoaderUI />;

  if (!call) {
    return <div>Call not found</div>;
  }

  return (
    <StreamCall call={call}>
      <StreamTheme>
        {!isSetupCompleted ? (
          <MeetingSetup onSetupCompleted={() => setIsSetupCompleted(true)} />
        ) : (
          <MeetingRoom />
        )}
      </StreamTheme>
    </StreamCall>
  );
}
