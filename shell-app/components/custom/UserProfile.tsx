"use client";

import { useGlobalState } from "@/store/globalState";
import { useEffect } from "react";

const profileAppURL = process.env.NEXT_PUBLIC_PROFILE_APP_URL;
const UserProfile = () => {
  const { selectedBranding } = useGlobalState();
  useEffect(() => {
    if (selectedBranding) {
      document
        .getElementById("user-profile-iframe")
        ?.contentWindow?.postMessage(
          {
            type: "SET_BRANDING",
            payload: { branding: selectedBranding },
          },
          process.env.NEXT_PUBLIC_PROFILE_APP_URL ?? "http://localhost:5001"
        );
    }
    const timeout = setTimeout(() => {
      if (selectedBranding) {
        document
          .getElementById("user-profile-iframe")
          ?.contentWindow?.postMessage(
            {
              type: "SET_BRANDING",
              payload: { branding: selectedBranding },
            },
            process.env.NEXT_PUBLIC_PROFILE_APP_URL ?? "http://localhost:5001"
          );
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [selectedBranding]);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        document
          .getElementById("user-profile-iframe")
          ?.contentWindow?.postMessage(
            {
              type: "UPDATE_USER_DATA",
              payload: {
                name: data.name,
                email: data.email,
              },
            },
            process.env.NEXT_PUBLIC_PROFILE_APP_URL ?? "http://localhost:5001"
          );
      });
  }, []);
  return (
    <div className="h-96">
      <iframe
        id="user-profile-iframe"
        src={profileAppURL}
        width="100%"
        height="100%"
        style={{
          border: "none",
          height: "100%",
          width: "100%",
        }}
      />
    </div>
  );
};

export default UserProfile;
