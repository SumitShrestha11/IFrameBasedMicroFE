"use client";

import { useGlobalState } from "@/store/globalState";
import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const notificationAppURL = process.env.NEXT_PUBLIC_NOTIFICATION_APP_URL;
const Notifications = () => {
  const notificationIframeRef = useRef<HTMLIFrameElement | null>(null);
  const { unreadNotificationsCount, selectedBranding, currentClient } =
    useGlobalState();

  const [toggleVisibility, setToggleVisibility] = useState(false);

  useEffect(() => {
    if (selectedBranding && toggleVisibility) {
      document
        .getElementById("notification-iframe")
        ?.contentWindow?.postMessage(
          {
            type: "SET_BRANDING",
            payload: { branding: selectedBranding },
          },
          process.env.NEXT_PUBLIC_NOTIFICATION_APP_URL ??
            "http://localhost:5002"
        );
    }
  }, [selectedBranding, toggleVisibility]);

  return (
    <Popover open={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="relative"
          onClick={() => setToggleVisibility((prev) => !prev)}
        >
          <Bell className="h-5 w-5" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primaryColor text-white text-xs flex items-center justify-center">
              {unreadNotificationsCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 overflow-hidden h-96 bg-background"
        style={{
          visibility: toggleVisibility ? "visible" : "hidden",
          height: toggleVisibility ? "" : 0,
          pointerEvents: toggleVisibility ? "auto" : "none",
        }}
      >
        <iframe
          ref={notificationIframeRef}
          src={notificationAppURL}
          id="notification-iframe"
          width="100%"
          height="100%"
          style={{ border: "none", height: "100%", width: "100%" }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
