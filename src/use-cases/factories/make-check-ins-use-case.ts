import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-checkIn-repository";
import { PrismaGymRepository } from "@/repositories/prisma/prisma-gym-repository";
import { CheckInUseCase } from "../checkIn";

export function makeCheckInsUseCase() {
    const checkInRepository = new PrismaCheckInRepository();
    const gymsRepository = new PrismaGymRepository();
    const checkInsCountByUserUseCase = new CheckInUseCase(checkInRepository, gymsRepository);
    return checkInsCountByUserUseCase;
}