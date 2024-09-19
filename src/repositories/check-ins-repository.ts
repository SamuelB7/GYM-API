import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInRepository {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
    findAll(): Promise<CheckIn[]>;
    findById(id: string): Promise<CheckIn | null>;
    findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
    update(id: string, data: Prisma.CheckInUpdateInput): Promise<CheckIn>;
    delete(id: string): Promise<CheckIn | null>;
}