import { CheckInRepository } from "@/repositories/check-ins-repository";

interface CountByUserIdUseCaseRequest {
    userId: string
}

interface CountByUserIdUseCaseResponse {
    checkInsCount: number
}

export class CountByUserIdUseCase {
    constructor(
        private checkInRepository: CheckInRepository
    ) { }

    async execute({ userId }: CountByUserIdUseCaseRequest): Promise<CountByUserIdUseCaseResponse> {
        const checkInsCount = await this.checkInRepository.countByUserId(userId)

        return {
            checkInsCount
        }
    }
}