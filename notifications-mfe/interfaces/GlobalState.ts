import { IBranding } from "./Branding";

export interface IGlobalState {
  selectedBranding: IBranding;
  setSelectedBranding: (branding: IBranding) => void;
}
