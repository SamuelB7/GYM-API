import { GymsRepository } from "@/repositories/gyms-repository"
import { Gym } from "@prisma/client"

interface FindByNameUseCaseRequest {
    name: string
    page: number
}

interface FindByNameUseCaseResponse {
    gyms: Gym[]
}

export class FindGymByNameUseCase {
    constructor(
        private gymsRepository: GymsRepository
    ) { }

    async execute(data: FindByNameUseCaseRequest): Promise<FindByNameUseCaseResponse> {
        const { name, page } = data

        const gyms = await this.gymsRepository.findByName(name, page)

        return {
            gyms: gyms ?? []
        }
    }
}