import { prisma } from "@/lib/prisma";
import { CheckIn, Prisma } from "@prisma/client";
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

    async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
        return prisma.checkIn.findFirst({
            where: {
                user_id: userId,
                createdAt: date
            }
        })
    }

    async findByUserId(userId: string, page: number): Promise<CheckIn[]> {
        return prisma.checkIn.findMany({
            where: {
                user_id: userId
            },
            skip: page * 20,
            take: 20
        })
    }
}