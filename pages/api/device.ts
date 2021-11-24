// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import DeviceDetector from "device-detector-js";
import { PrismaClient, Device } from "@prisma/client";
import { DeviceService } from "../../services/device.service";

const prisma = new PrismaClient();
const deviceService = new DeviceService(prisma);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Device[]>
) {
  const devices = await deviceService.find();
  res.status(200).json(devices);
}
