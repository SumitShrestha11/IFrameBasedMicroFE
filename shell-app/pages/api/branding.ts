import { NextApiRequest, NextApiResponse } from "next";
import brandingConfig from "../../utils/brandingConfig.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(brandingConfig);
}
