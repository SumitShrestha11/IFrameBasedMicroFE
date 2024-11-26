import { IGlobalState } from "@/interfaces/GlobalState";
import { create } from "zustand";

export const useGlobalState = create<IGlobalState>((set) => ({
  selectedBranding: { logo: "", primaryColor: "", theme: "light" },
  setSelectedBranding: (branding) => set({ selectedBranding: branding }),
}));
