import { GymsRepository } from "@/repositories/gyms-repository"
import { Gym } from "@prisma/client"

interface GetNearbyGymsUseCaseRequest {
    userLatitude: number
    userLongitude: number
}

interface GetNearbyGymsUseCaseResponse {
    gyms: Gym[]
}

export class GetNearbyGymsUseCase {
    constructor(
        private gymsRepository: GymsRepository
    ) { }

    async execute(data: GetNearbyGymsUseCaseRequest): Promise<GetNearbyGymsUseCaseResponse> {
        const { userLatitude, userLongitude } = data

        const gyms = await this.gymsRepository.findNearbyGyms(userLatitude, userLongitude)

        return {
            gyms: gyms ?? []
        }
    }
}