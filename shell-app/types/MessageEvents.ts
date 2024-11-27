import { MessageTypes } from "@/enums/MessageTypes";

export type TMessageEvent =
  | {
      type: MessageTypes.NOTIFICATION_COUNT_UPDATED;
      payload: number;
    }
  | {
      type: MessageTypes.GET_NOTIFICATIONS;
      payload: void;
    }
  | {
      type: MessageTypes.UPDATE_NOTIFICATION_READ_STATUS;
      payload: {
        id: string;
        isRead: boolean;
        unreadCount: number;
      };
    }
  | {
      type: MessageTypes.UPDATE_USER_DATA_IN_SHELL;
      payload: {
        name: string;
        email: string;
      };
    };
