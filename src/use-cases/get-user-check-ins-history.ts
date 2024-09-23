import { CheckInRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface GetUserCheckInsHistoryUseCaseRequest {
    userId: string
    page: number
}

interface GetUserCheckInsHistoryUseCaseResponse {
    checkIns: CheckIn[]
}

export class GetUserCheckInsHistoryUseCase {
    constructor(
        private checkInRepository: CheckInRepository
    ) { }

    async execute({ userId, page }: GetUserCheckInsHistoryUseCaseRequest): Promise<GetUserCheckInsHistoryUseCaseResponse> {
        const checkIns = await this.checkInRepository.findByUserId(userId, page)

        return {
            checkIns
        }
    }
}