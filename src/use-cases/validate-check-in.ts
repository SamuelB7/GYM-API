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

        checkIn.validatedAt = new Date();

        await this.checkInRepository.update(checkIn.id, checkIn);

        return {
            checkIn
        }
    }
}