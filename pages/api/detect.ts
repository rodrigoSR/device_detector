// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import DeviceDetector from "device-detector-js";
import { PrismaClient, Device, Prisma } from "@prisma/client";
import { DeviceService } from "../../services/device.service";
import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";

const detector = new DeviceDetector();
const prisma = new PrismaClient();
const deviceService = new DeviceService(prisma);
const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
    origin: "*",
  })
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Device>
) {
  await cors(req, res);
  // const device = detector.parse(req.headers["user-agent"] || "");
  const createdDevice = await deviceService.create({
    userAgent: "",
    clientType: "unknow",
    clientName: "",
    osName: "",
    osVersion: "",
    deviceTrype: "",
    deviceBrand: "",
    data: req.body as Prisma.JsonObject,
  });
  res.status(201).json(createdDevice);
}
