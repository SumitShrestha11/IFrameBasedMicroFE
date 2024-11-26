import { NextApiRequest, NextApiResponse } from "next";

let notifications = [
  { id: 1, message: "This is test notification one.", isRead: false },
  { id: 2, message: "This is test notification two", isRead: true },
  { id: 3, message: "This is test notification three", isRead: false },
  { id: 4, message: "This is test notification four", isRead: true },
  { id: 5, message: "This is test notification five", isRead: false },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json({
      notifications,
      unreadCount: notifications.filter((notification) => !notification.isRead)
        .length,
    });
  } else if (req.method === "POST") {
    const { id, read } = req.body;
    notifications = notifications.map((notif) =>
      notif.id === id ? { ...notif, read } : notif
    );
    res.status(200).json({ message: "Notification updated" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
