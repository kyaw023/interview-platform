"use client"
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { SparkleIcon } from "lucide-react";
import { useUserRole } from "@/hooks/useUserRole";

const DashboardBtn = () => {
  const { isCandidate, isLoading } = useUserRole();

  if (isCandidate || isLoading) return null;

  return (
    <div>
      <Button
        asChild
        className=" bg-gradient-to-r from-emerald-600 to-cyan-600"
      >
        <Link className=" gap-2 font-medium" href={"/dashboard"}>
          <SparkleIcon />
          <span>Dashboard</span>
        </Link>
      </Button>
    </div>
  );
};

export default DashboardBtn;
