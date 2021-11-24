// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import DeviceDetector from "device-detector-js";
import { PrismaClient, Device, Prisma } from "@prisma/client";
import { DeviceService } from "../../services/device.service";

const detector = new DeviceDetector();
const prisma = new PrismaClient();
const deviceService = new DeviceService(prisma);

type Data = {
  device: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const device = detector.parse(req.headers["user-agent"] || "");
  const createdDevice = await deviceService.create({
    clientType: device.client.type,
    clientName: device.client.name,
    osName: device.os.name,
    osVersion: device.os.version,
    deviceTrype: device.device.type,
    deviceBrand: device.device.brand,
    data: device as Prisma.JsonObject,
  });
  res.status(200).json({ device });
}
