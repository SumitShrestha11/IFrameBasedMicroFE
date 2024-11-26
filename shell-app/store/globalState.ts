import { IBranding } from "@/interfaces/Branding";
import { IGlobalState } from "@/interfaces/GlobalState";
import { create } from "zustand";
import brandingConfig from "../utils/brandingConfig.json";

export const useGlobalState = create<IGlobalState>((set) => ({
  currentClient: "clientA",
  selectedBranding: brandingConfig["clientA"] as IBranding,
  unreadNotificationsCount: 0,
  setClient: (client) =>
    set({
      currentClient: client,
      selectedBranding: brandingConfig[client] as IBranding,
    }),
  setUnreadNotificationsCount: (count) =>
    set({ unreadNotificationsCount: count }),
}));
