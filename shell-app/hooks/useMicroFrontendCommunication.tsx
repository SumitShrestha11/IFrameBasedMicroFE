import { MessageTypes } from "@/enums/MessageTypes";
import { useGlobalState } from "@/store/globalState";
import { useEffect } from "react";

export const useMicrofrontendCommunication = () => {
  const globalState = useGlobalState();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      switch (event.data.type) {
        case MessageTypes.NOTIFICATION_COUNT_UPDATED:
          // Update unread notification count
          globalState.setUnreadNotificationsCount(event.data.payload);
          break;

        case MessageTypes.SEND_BRANDING_STATE:
          // Send current branding state to microfrontends
          document
            .getElementById("user-profile-iframe")
            ?.contentWindow.postMessage(
              {
                type: "GLOBAL_STATE",
                payload: {
                  branding: globalState.selectedBranding,
                },
              },
              process.env.PROFILE_APP_URL ?? "http://localhost:5001"
            );
          document
            .getElementById("notification-iframe")
            ?.contentWindow?.postMessage(
              {
                type: "GLOBAL_STATE",
                payload: {
                  branding: globalState.selectedBranding,
                },
              },
              process.env.NOTIFICATION_APP_URL ?? "http://localhost:5002"
            );

        case "GET_NOTIFICATIONS":
          const fetchNotifications = async () => {
            const res = await fetch("/api/notifications");
            if (res.ok) {
              const data = await res.json();
              globalState.setUnreadNotificationsCount(data.unreadCount);
              document
                .getElementById("notification-iframe")
                ?.contentWindow?.postMessage(
                  {
                    type: "NOTIFICATIONS_UPDATED",
                    payload: {
                      notifications: data.notifications,
                      unreadCount: data.unreadCount,
                    },
                  },
                  process.env.NEXT_PUBLIC_NOTIFICATION_APP_URL
                );
            }
          };

          fetchNotifications();
          break;

        case "UPDATE_NOTIFICATION_READ_STATUS":
          const updateNotificationReadStatus = async () => {
            const res = await fetch("/api/notifications", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: event.data.payload.id,
                read: event.data.payload.isRead,
              }),
            });
            globalState.setUnreadNotificationsCount(
              event.data.payload.unreadCount
            );
          };

          updateNotificationReadStatus();
          break;

        case "UPDATE_USER_DATA_IN_SHELL":
          fetch("/api/user", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: event?.data?.payload.name,
              email: event?.data?.payload.email,
            }),
          });
          break;

        default:
          break;
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return null;
};
