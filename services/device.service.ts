import { PrismaClient, Prisma, Device } from "@prisma/client";

export class DeviceService {
  constructor(private prisma: PrismaClient) {}

  async create(data: Prisma.DeviceCreateInput) {
    return await this.prisma.device.create({ data });
  }

  async find(): Promise<Device[]> {
    return await this.prisma.device.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}
