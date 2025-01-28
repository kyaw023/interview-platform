"use client";
import InterviewScheduleUI from "@/components/InterviewScheduleUI";
import LoaderUI from "@/components/LoaderUI";
import { toast } from "@/hooks/use-toast";
import { useUserRole } from "@/hooks/useUserRole";
import { useRouter } from "next/navigation";
import React from "react";

const SchedulePage = () => {
  const router = useRouter();

  const { isInterviewer, isLoading } = useUserRole();

  if (isLoading) return <LoaderUI />;

  if (!isInterviewer) {
    toast({
      title: "Error",
      description: "You are not an interviewer",
      variant: "destructive",
    });

    return router.push("/");
  }

  return <InterviewScheduleUI />;
};

export default SchedulePage;
