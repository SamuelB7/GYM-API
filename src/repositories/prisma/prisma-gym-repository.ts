import { prisma } from "@/lib/prisma";
import { Gym, Prisma } from "@prisma/client";
import { GymsRepository } from "../gyms-repository";

export class PrismaGymRepository implements GymsRepository {
    async create(data: Prisma.GymCreateInput): Promise<Gym> {
        return await prisma.gym.create({
            data
        })
    }

    async findAll(): Promise<Gym[]> {
        return await prisma.gym.findMany();
    }

    async findById(id: string): Promise<Gym | null> {
        return await prisma.gym.findUnique({
            where: {
                id
            }
        })
    }

    async findByLocation(latitude: number, longitude: number): Promise<Gym | null> {
        return await prisma.gym.findFirst({
            where: {
                latitude,
                longitude
            }
        })
    }

    async update(id: string, data: Prisma.GymUpdateInput): Promise<Gym> {
        return await prisma.gym.update({
            where: {
                id
            },
            data
        })
    }

    async delete(id: string): Promise<Gym | null> {
        return await prisma.gym.delete({
            where: {
                id
            }
        })
    }

    async findByName(name: string, page: number): Promise<Gym[] | null> {
        return prisma.gym.findMany({
            where: {
                name: {
                    contains: name
                }
            },
            skip: page * 20,
            take: 20
        })
    }

    async findNearbyGyms(userLatitude: number, userLongitude: number): Promise<Gym[]> {
        throw new Error("Method not implemented.");
    }
}