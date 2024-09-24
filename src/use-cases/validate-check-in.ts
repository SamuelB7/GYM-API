import { CheckInRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface ValidateCheckInUseCaseRequest {
    checkInId: string;
}

interface ValidateCheckInUseCaseResponse {
    checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
    constructor(
        private checkInRepository: CheckInRepository,
    ) { }

    async execute({ checkInId }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
        const checkIn = await this.checkInRepository.findById(checkInId);

        if (!checkIn) {
            throw new ResourceNotFoundError();
        }

        const now = new Date();

        const diff = now.getTime() - checkIn.createdAt.getTime();

        if (diff > 20 * 60 * 1000) {
            throw new Error('Check in is too old to be validated');
        }

        checkIn.validatedAt = new Date();

        await this.checkInRepository.update(checkIn.id, checkIn);

        return {
            checkIn
        }
    }
}