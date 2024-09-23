import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInRepository {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
    findAll(): Promise<CheckIn[]>;
    findById(id: string): Promise<CheckIn | null>;
    findByUserId(userId: string, page: number): Promise<CheckIn[]>;
    findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
    countByUserId(userId: string): Promise<number>;
    update(id: string, data: Prisma.CheckInUpdateInput): Promise<CheckIn>;
    delete(id: string): Promise<CheckIn | null>;
}