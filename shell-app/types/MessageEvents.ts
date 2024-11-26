import { MessageTypes } from "@/enums/MessageTypes";

export type TMessageEvent =
  | {
      type: MessageTypes.NOTIFICATION_COUNT_UPDATED;
      payload: number;
    }
  | {
      type: MessageTypes.SEND_BRANDING_STATE;
    };
