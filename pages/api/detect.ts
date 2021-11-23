// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import DeviceDetector from "device-detector-js";

const detector = new DeviceDetector();

type Data = {
  device: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const device = detector.parse(req.headers["user-agent"] || "");
  res.status(200).json({ device });
}
