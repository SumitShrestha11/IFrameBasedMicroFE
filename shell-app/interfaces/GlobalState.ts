import brandingConfig from "../utils/brandingConfig.json";
import { IBranding } from "./Branding";

export interface IGlobalState {
  currentClient: keyof typeof brandingConfig;
  selectedBranding: IBranding;
  unreadNotificationsCount: number;
  setClient: (client: keyof typeof brandingConfig) => void;
  setUnreadNotificationsCount: (count: number) => void;
}
