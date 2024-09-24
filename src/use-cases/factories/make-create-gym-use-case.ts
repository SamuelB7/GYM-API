import { PrismaGymRepository } from "@/repositories/prisma/prisma-gym-repository";
import { CreateGymUseCase } from "../create-gym";

export function makeCreateGymUseCase() {
    const gymsRepository = new PrismaGymRepository();
    const createGymUseCase = new CreateGymUseCase(gymsRepository);
    return createGymUseCase;
}