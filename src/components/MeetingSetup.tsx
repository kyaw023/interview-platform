import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Camera, Mic, Pencil, SettingsIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const MeetingSetup = ({
  onSetupCompleted,
}: {
  onSetupCompleted: () => void;
}) => {
  // Rename state variables for clarity
  const [isCameraEnabled, setIsCameraEnabled] = useState(true); // Default to enabled
  const [isMicrophoneEnabled, setIsMicrophoneEnabled] = useState(true); // Default to enabled

  const call = useCall();

  useEffect(() => {
    if (call) {
      try {
        if (isCameraEnabled) call.camera.enable();
        else call.camera.disable();
      } catch (error) {
        console.error("Failed to toggle camera:", error);
      }

      try {
        if (isMicrophoneEnabled) call.microphone.enable();
        else call.microphone.disable();
      } catch (error) {
        console.error("Failed to toggle microphone:", error);
      }
    }
  }, [isCameraEnabled, isMicrophoneEnabled, call]);

  const handleJoinMeeting = async () => {
    if (call) {
      try {
        await call.join();
        onSetupCompleted();
      } catch (error) {
        console.error("Failed to join meeting:", error);
      }
    }
  };

  if (!call) return <div>Loading meeting setup...</div>;

  return (
    <div className="min-h-screen bg-black p-4 md:p-6 lg:p-8 text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
        {/* Camera Preview Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Camera Preview</h2>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="relative aspect-video rounded-lg border-2 border-blue-500 bg-slate-900 flex items-center justify-center">
            {isCameraEnabled ? (
              <VideoPreview className="w-full h-full" />
            ) : (
              <p className="text-gray-400">Camera is disabled</p>
            )}
          </div>
        </div>

        {/* Meeting Details Section */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Meeting Details</h2>
                <p className="text-sm text-gray-400 font-mono">
                  bbb630f-4b9b-48a3-96dc-7c9921444f7b
                </p>
              </div>

              <div className="space-y-4">
                {/* Camera Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <Camera className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-medium">Camera</p>
                      <p className="text-sm text-gray-400">
                        {isCameraEnabled ? "On" : "Off"}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={isCameraEnabled}
                    onCheckedChange={(checked) => setIsCameraEnabled(checked)}
                  />
                </div>

                {/* Microphone Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <Mic className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-medium">Microphone</p>
                      <p className="text-sm text-gray-400">
                        {isMicrophoneEnabled ? "On" : "Off"}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={isMicrophoneEnabled}
                    onCheckedChange={(checked) =>
                      setIsMicrophoneEnabled(checked)
                    }
                  />
                </div>

                {/* Settings */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <SettingsIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Settings</p>
                      <p className="text-sm text-muted-foreground">
                        Configure devices
                      </p>
                    </div>
                  </div>
                  <DeviceSettings />
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <Button
                  onClick={handleJoinMeeting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-12"
                >
                  Join Meeting
                </Button>
                <p className="text-sm text-gray-400 text-center">
                  Do not worry, our team is super friendly! We want you to
                  succeed 👋
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MeetingSetup;
