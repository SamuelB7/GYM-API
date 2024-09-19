import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { CheckInRepository } from "../check-ins-repository";

export class PrismaCheckInRepository implements CheckInRepository {

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        return prisma.checkIn.create({
            data
        });
    }

    async findAll() {
        return prisma.checkIn.findMany();
    }

    async findById(id: string) {
        return prisma.checkIn.findUnique({
            where: {
                id
            }
        });
    }

    async update(id: string, data: Prisma.CheckInUpdateInput) {
        return prisma.checkIn.update({
            where: {
                id
            },
            data
        });
    }

    async delete(id: string) {
        return prisma.checkIn.delete({
            where: {
                id
            }
        });
    }
}