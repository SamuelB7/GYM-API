import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-checkIn-repository";
import { CountByUserIdUseCase } from "../check-ins-count-by-user";

export function makeCheckInsCountByUserUseCase() {
    const checkInRepository = new PrismaCheckInRepository();
    const checkInsCountByUserUseCase = new CountByUserIdUseCase(checkInRepository);
    return checkInsCountByUserUseCase;
}