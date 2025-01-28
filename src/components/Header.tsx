import React from "react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import {  VideoIcon } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import DashboardBtn from "./DashboardBtn";

const Header = () => {
  return (
    <header className="border-b">
      <div className="  px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
        <div className=" flex h-16 items-center py-4">
          <div>
            {/* left side */}
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-2xl mr-6 font-mono hover:opacity-80 transition-opacity"
            >
              <VideoIcon
                className=" size-8 text-emerald-500
            "
              />
              <span className=" bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                Zaam
              </span>
            </Link>
          </div>
          {/* right side */}

          <SignedIn>
            <div className="flex items-center space-x-4 ml-auto">
              <DashboardBtn />
              <ModeToggle />
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;
