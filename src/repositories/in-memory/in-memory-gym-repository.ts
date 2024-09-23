import { getDistanceInKilometersBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { Gym, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { GymsRepository } from "../gyms-repository";

export class InMemoryGymRepository implements GymsRepository {
    public gyms: Gym[] = []

    async create(data: Prisma.GymCreateInput): Promise<Gym> {
        const gym: Gym = {
            id: randomUUID(),
            name: data.name,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: new Prisma.Decimal(data.latitude as Prisma.Decimal.Value),
            longitude: new Prisma.Decimal(data.longitude as Prisma.Decimal.Value),
            createdAt: new Date(),
            updatedAt: new Date()
        }

        this.gyms.push(gym)

        return gym
    }

    async findAll(): Promise<Gym[]> {
        return this.gyms
    }

    async findById(id: string): Promise<Gym | null> {
        return this.gyms.find(gym => gym.id === id) || null
    }

    async findByLocation(latitude: number, longitude: number): Promise<Gym | null> {
        return this.gyms.find(gym => gym.latitude.toNumber() === latitude && gym.longitude.toNumber() === longitude) || null
    }

    async update(id: string, data: Prisma.GymUpdateInput): Promise<Gym> {
        let gym = this.gyms.find(gym => gym.id === id)
        gym = data as Gym
        const index = this.gyms.findIndex(gym => gym.id === id)
        this.gyms[index] = gym
        return gym
    }

    async delete(id: string): Promise<Gym | null> {
        const gym = this.gyms.find(gym => gym.id === id) || null
        const index = this.gyms.findIndex(gym => gym.id === id)
        this.gyms.splice(index, 1)
        return gym
    }

    async findByName(name: string, page: number): Promise<Gym[] | null> {
        return this.gyms.filter(gym => gym.name.includes(name)).slice((page - 1) * 20, page * 20)
    }

    async findNearbyGyms(userLatitude: number, userLongitude: number): Promise<Gym[]> {
        return this.gyms.filter(gym => {
            const distance = getDistanceInKilometersBetweenCoordinates({ latitude: userLatitude, longitude: userLongitude }, { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() })
            return distance < 10
        })
    }
}