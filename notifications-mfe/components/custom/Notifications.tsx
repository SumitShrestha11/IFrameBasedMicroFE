"use client";
import { useGlobalState } from "@/store/globalState";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

type Notification = {
  id: string;
  message: string;
  isRead: boolean;
};

const dummyNotifications: Notification[] = [
  { id: "1", message: "New message from John Doe", isRead: false },
  { id: "2", message: "You have a new follower", isRead: false },
  { id: "3", message: "Your post has been liked", isRead: true },
  { id: "4", message: "Reminder: Team meeting at 3 PM", isRead: false },
  { id: "5", message: "New comment on your photo", isRead: true },
];

const Notifications = () => {
  const { setSelectedBranding, selectedBranding } = useGlobalState();

  const { setTheme } = useTheme();
  const [notifications, setNotifications] =
    useState<Notification[]>(dummyNotifications);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      switch (event.data.type) {
        case "NOTIFICATIONS_UPDATED":
          // Update unread notification count
          setNotifications(event.data.payload.notifications);
          setUnreadCount(event.data.payload.unreadCount);
          break;

        case "SET_BRANDING":
          setSelectedBranding(event.data.payload.branding);
          setTheme(event.data.payload.branding.theme);
          break;

        default:
          break;
      }
    };

    window.addEventListener("message", handleMessage);
    console.log("Sending GET_NOTIFICATIONS message to shell application");
    window.parent.postMessage(
      { type: "GET_NOTIFICATIONS" },
      process.env.NEXT_PUBLIC_SHELL_APP_URL ?? "http://localhost:5000"
    );
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--primary-color",
      selectedBranding?.primaryColor
    );
  }, [selectedBranding]);

  const updateUnreadCount = (notifs: Notification[]) => {
    const count = notifs.filter((n) => !n.isRead).length;
    setUnreadCount(count);
  };

  const handleToggleRead = (id: string, prevReadValue: boolean) => {
    const updatedNotifications = notifications.map((n) =>
      n.id === id ? { ...n, isRead: !n.isRead } : n
    );
    setNotifications(updatedNotifications);
    updateUnreadCount(updatedNotifications);

    window.parent.postMessage(
      {
        type: "UPDATE_NOTIFICATION_READ_STATUS",
        payload: {
          id,
          isRead: !prevReadValue,
          unreadCount: updatedNotifications?.filter((n) => !n.isRead).length,
        },
      },
      process.env.NEXT_PUBLIC_SHELL_APP_URL ?? "http://localhost:5000"
    );
  };
  return (
    <>
      <h3 className="font-semibold mb-2 text-foreground">Notifications</h3>
      <ScrollArea className="h-[300px]">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-center justify-between p-3 rounded-md mb-2 ${
              notification.isRead ? "bg-muted" : "bg-accent"
            }`}
          >
            <span className="text-sm">{notification.message}</span>
            <Button
              onClick={() =>
                handleToggleRead(notification.id, notification.isRead)
              }
              size="sm"
              variant="ghost"
              className="text-xs text-primaryColor"
            >
              {notification.isRead ? "Mark Unread" : "Mark Read"}
            </Button>
          </div>
        ))}
      </ScrollArea>
    </>
  );
};

export default Notifications;
