import { Gym, Prisma } from "@prisma/client";

export interface GymsRepository {
    create(data: Prisma.GymCreateInput): Promise<Gym>;
    findAll(): Promise<Gym[]>;
    findById(id: string): Promise<Gym | null>;
    findByLocation(latitude: number, longitude: number): Promise<Gym | null>;
    findByName(name: string, page: number): Promise<Gym[] | null>;
    update(id: string, data: Prisma.GymUpdateInput): Promise<Gym>;
    delete(id: string): Promise<Gym | null>;
    findNearbyGyms(userLatitude: number, userLongitude: number): Promise<Gym[]>;
}