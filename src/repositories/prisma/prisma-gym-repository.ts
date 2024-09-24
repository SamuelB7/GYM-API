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
        return await prisma.gym.findMany({
            where: {
                name: {
                    contains: name
                }
            },
            skip: (page - 1) * 20,
            take: 20
        })
    }

    async findNearbyGyms(userLatitude: number, userLongitude: number): Promise<Gym[]> {
        return await prisma.$queryRaw<Gym[]>`
            SELECT * from gyms
            WHERE ( 6371 * acos( cos( radians(${userLatitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${userLongitude}) ) + sin( radians(${userLatitude}) ) * sin( radians( latitude ) ) ) ) <= 10
        `
    }
}