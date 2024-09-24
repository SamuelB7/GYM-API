import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-checkIn-repository";
import { GetUserCheckInsHistoryUseCase } from "../get-user-check-ins-history";

export function makeGetUserCheckInsHistoryUseCase() {
    const checkInRepository = new PrismaCheckInRepository();
    const getUserCheckInsHistoryUseCase = new GetUserCheckInsHistoryUseCase(checkInRepository);
    return getUserCheckInsHistoryUseCase;
}