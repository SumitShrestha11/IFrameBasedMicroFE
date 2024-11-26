import { ThemeProvider } from "@/components/theme-provider";
import { useMicrofrontendCommunication } from "@/hooks/useMicroFrontendCommunication";
import { useGlobalState } from "@/store/globalState";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const { setUnreadNotificationsCount } = useGlobalState();
  useMicrofrontendCommunication();
  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await fetch("/api/notifications");
      if (res.ok) {
        const data = await res.json();
        setUnreadNotificationsCount(data.unreadCount);
      }
    };

    fetchNotifications();
  }, []);
  return (
    <ThemeProvider>
      <Component {...pageProps} />;
    </ThemeProvider>
  );
}
