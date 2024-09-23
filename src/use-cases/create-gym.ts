import { GymsRepository } from "@/repositories/gyms-repository"
import { Gym } from "@prisma/client"

interface CreateGymUseCaseRequest {
    name: string
    description: string | null
    phone: string | null
    latitude: number
    longitude: number
}

interface CreateGymUseCaseResponse {
    gym: Gym
}

export class CreateGymUseCase {
    constructor(
        private gymsRepository: GymsRepository
    ) { }

    async execute(data: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
        const { name, latitude, longitude, description, phone } = data

        const gym = await this.gymsRepository.create({
            name,
            description,
            phone,
            latitude,
            longitude
        })

        return {
            gym
        }
    }
}