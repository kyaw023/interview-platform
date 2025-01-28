"use client";

import ActionCard from "@/components/ActionCard";
import { Button } from "@/components/ui/button";
import { QUICK_ACTIONS } from "@/constant";
import { useUserRole } from "@/hooks/useUserRole";
//import { useQuery } from "convex/react";
import { useState } from "react";
//import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import MeetingModal from "@/components/MeetingModal";
import { Loader2Icon } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import MeetingCard from "@/components/MeetingCard";

export default function Home() {
  const { isInterviewer } = useUserRole();
  const router = useRouter();

  const interviews = useQuery(api.interview.getMyInterviews);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"start" | "join">();

  const handleQuickAction = (title: string) => {
    switch (title) {
      case "New Call":
        setShowModal(true);
        setModalType("start");
        break;

      case "Join Interview":
        setShowModal(true);
        setModalType("join");
        break;

      default:
        router.push(`/${title.toLowerCase()}`);
    }
  };

  const isTrue = true;
  return (
    <div className="py-6">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="lg:w-1/2">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Welcome to <span className="text-blue-400">InterviewPro</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Experience seamless video interviews and real-time coding tests on
            our cutting-edge platform.
          </p>
          <p className="text-muted-foreground mt-2 mb-6">
            {isInterviewer
              ? "Manage your interviews and review candidates effectively"
              : "Access your upcoming interviews and preparations"}
          </p>
          <Button
            size="lg"
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Start Your Interview
          </Button>
        </div>
        <div className="lg:w-1/2">
          <div className="relative rounded-lg overflow-hidden shadow-2xl">
            <video className="w-full h-auto" autoPlay loop muted playsInline>
              <source src="/placeholder.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
          </div>
        </div>
      </div>
      {isTrue ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {QUICK_ACTIONS.map((action, index) => (
              <ActionCard
                key={index}
                action={action}
                handleQuickAction={handleQuickAction}
              />
            ))}
          </div>

          <MeetingModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={modalType === "join" ? "Join Meeting" : "Start Meeting"}
            isJoinMeeting={modalType === "join"}
          />
        </>
      ) : (
        <>
          <div>
            <h1 className="text-3xl font-bold">Your Interviews</h1>
            <p className="text-muted-foreground mt-1">
              View and join your scheduled interviews
            </p>
          </div>

          <div className="mt-8">
            {interviews === undefined ? (
              <div className="flex justify-center py-12">
                <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : interviews.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {interviews.map((interview) => (
                  <MeetingCard key={interview._id} interview={interview} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                You have no scheduled interviews at the moment
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
