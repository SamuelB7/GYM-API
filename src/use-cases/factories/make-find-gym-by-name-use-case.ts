import { PrismaGymRepository } from "@/repositories/prisma/prisma-gym-repository";
import { FindGymByNameUseCase } from "../find-gym-by-name";

export function makeFindGymsByNameUseCase() {
    const gymsRepository = new PrismaGymRepository();
    const findGymsByNameUseCase = new FindGymByNameUseCase(gymsRepository);
    return findGymsByNameUseCase;
}