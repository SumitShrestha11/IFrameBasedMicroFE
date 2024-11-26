import { NextApiRequest, NextApiResponse } from "next";

let userData = { name: "Test User", email: "user@test.com" };

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(userData);
  } else if (req.method === "PUT") {
    const { name, email } = req.body;
    userData = { ...userData, name, email };
    res.status(200).json(userData);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
