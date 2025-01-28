import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";

const useMeetingActions = () => {
  const router = useRouter();
  const { toast } = useToast();

  const client = useStreamVideoClient();

  const createInstanceMeeting = async () => {
    if (!client) return;

    try {
      const id = crypto.randomUUID();

      const call = client.call("default", id);

      await call.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
          custom: {
            description: "This is a custom description",
          },
        },
      });

      router.push(`/meeting/${call.id}`);

      toast({
        title: "Meeting created",
        description: "You can now join the meeting",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const joinMeeting = (callId: string) => {
    if (!callId)
      return toast({
        title: "Meeting not found",
        description: "Please try again later",
      });
    router.push(`/meeting/${callId}`);
  };

  return {
    createInstanceMeeting,
    joinMeeting,
  };
};

export default useMeetingActions;
