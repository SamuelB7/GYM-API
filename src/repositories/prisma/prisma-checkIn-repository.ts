import { prisma } from "@/lib/prisma";
import { CheckIn, Prisma } from "@prisma/client";
import dayjs from "dayjs";
import { CheckInRepository } from "../check-ins-repository";

export class PrismaCheckInRepository implements CheckInRepository {

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        return await prisma.checkIn.create({
            data
        });
    }

    async findAll() {
        return await prisma.checkIn.findMany();
    }

    async findById(id: string) {
        return await prisma.checkIn.findUnique({
            where: {
                id
            }
        });
    }

    async update(id: string, data: Prisma.CheckInUpdateInput) {
        return await prisma.checkIn.update({
            where: {
                id
            },
            data
        });
    }

    async delete(id: string) {
        return await prisma.checkIn.delete({
            where: {
                id
            }
        });
    }

    async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
        const startOfDay = dayjs(date).startOf('date')
        const endOfDay = dayjs(date).endOf('date')

        return prisma.checkIn.findFirst({
            where: {
                user_id: userId,
                createdAt: {
                    gte: startOfDay.toDate(),
                    lte: endOfDay.toDate()
                }
            }
        })
    }

    async findByUserId(userId: string, page: number): Promise<CheckIn[]> {
        return await prisma.checkIn.findMany({
            where: {
                user_id: userId
            },
            skip: page * 20,
            take: 20
        })
    }

    async countByUserId(userId: string): Promise<number> {
        return await prisma.checkIn.count({
            where: {
                user_id: userId
            }
        })
    }
}