import { CheckIn, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import dayjs from "dayjs";
import { CheckInRepository } from "../check-ins-repository";

export class InMemoryCheckInRepository implements CheckInRepository {
    public checkIns: CheckIn[] = []

    async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
        const checkIn: CheckIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            latitude: null,
            longitude: null,
            validatedAt: data.validatedAt ? new Date(data.validatedAt) : null,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        this.checkIns.push(checkIn)

        return checkIn
    }

    async findAll(): Promise<CheckIn[]> {
        return this.checkIns
    }

    async findById(id: string): Promise<CheckIn | null> {
        return this.checkIns.find(checkIn => checkIn.id === id) || null
    }

    async update(id: string, data: Prisma.CheckInUpdateInput): Promise<CheckIn> {
        let checkIn = this.checkIns.find(checkIn => checkIn.id === id)
        checkIn = data as CheckIn
        const index = this.checkIns.findIndex(checkIn => checkIn.id === id)
        this.checkIns[index] = checkIn
        return checkIn
    }

    async delete(id: string): Promise<CheckIn | null> {
        const checkIn = this.checkIns.find(checkIn => checkIn.id === id) || null
        const index = this.checkIns.findIndex(checkIn => checkIn.id === id)
        this.checkIns.splice(index, 1)
        return checkIn
    }

    async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
        const startOfDay = dayjs(date).startOf('date')
        const endOfDay = dayjs(date).endOf('date')

        return this.checkIns.find(checkIn => {
            const checkInDate = dayjs(checkIn.createdAt)
            const isSameDay = checkInDate.isAfter(startOfDay) && checkInDate.isBefore(endOfDay)
            return checkIn.user_id === userId && isSameDay
        }) || null
    }

    async findByUserId(userId: string, page: number): Promise<CheckIn[]> {
        const checkIns = this.checkIns.filter(checkIn => checkIn.user_id === userId).slice((page - 1) * 20, page * 20)
        return checkIns
    }
}