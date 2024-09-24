import { PrismaGymRepository } from "@/repositories/prisma/prisma-gym-repository";
import { GetNearbyGymsUseCase } from "../get-nearby-gyms";

export function makeGetNearbyGymsUseCase(): GetNearbyGymsUseCase {
    const gymsRepository = new PrismaGymRepository();
    const getNearbyGymsUseCase = new GetNearbyGymsUseCase(gymsRepository);
    return getNearbyGymsUseCase;
}