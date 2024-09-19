import { CheckInRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { getDistanceInKilometersBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { CheckIn } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface CheckInUseCaseRequest {
    userId: string;
    gymId: string;
    userLatitude: number;
    userLongitude: number;
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn;
}

export class CheckInUseCase {
    constructor(
        private checkInRepository: CheckInRepository,
        private gymRepository: GymsRepository
    ) { }

    async execute({ userId, gymId, userLatitude, userLongitude }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const gym = await this.gymRepository.findById(gymId);

        if (!gym) {
            throw new ResourceNotFoundError();
        }

        const distance = getDistanceInKilometersBetweenCoordinates(
            { latitude: userLatitude, longitude: userLongitude },
            { latitude: Number(gym.latitude), longitude: Number(gym.longitude) }
        );

        const MAX_DISTANCE_IN_KILOMETERS = 0.1;

        if (distance > MAX_DISTANCE_IN_KILOMETERS) {
            throw new Error('User is too far from gym');
        }

        const checkInExists = await this.checkInRepository.findByUserIdOnDate(userId, new Date());

        if (checkInExists) {
            throw new Error('User already checked in today');
        }

        const checkIn = await this.checkInRepository.create({
            user_id: userId,
            gym_id: gymId,
        })

        if (!checkIn) {
            throw new ResourceNotFoundError();
        }

        return {
            checkIn
        }
    }
}