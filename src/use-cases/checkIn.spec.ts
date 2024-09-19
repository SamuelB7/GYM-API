import { CheckInRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-checkIn-repository";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "./checkIn";

let checkInRepository: CheckInRepository
let checkInUseCase: CheckInUseCase
let gymRepository: GymsRepository

describe("Check in use case", () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository
        gymRepository = new InMemoryGymRepository()
        checkInUseCase = new CheckInUseCase(checkInRepository, gymRepository)

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to create a checkIn', async () => {

        const gym = await gymRepository.create({
            id: '1',
            name: 'Academia',
            latitude: 0,
            longitude: 0
        })

        const checkIn = await checkInUseCase.execute({
            gymId: gym.id,
            userId: '1',
            userLatitude: 0,
            userLongitude: 0
        })

        expect(checkIn.checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        const gym = await gymRepository.create({
            id: '1',
            name: 'Academia',
            latitude: 0,
            longitude: 0
        })

        await checkInUseCase.execute({
            gymId: gym.id,
            userId: '1',
            userLatitude: 0,
            userLongitude: 0
        })

        await expect(() =>
            checkInUseCase.execute({
                gymId: gym.id,
                userId: '1',
                userLatitude: 0,
                userLongitude: 0
            })
        ).rejects.toBeInstanceOf(Error)
    })

    it('should be able to create a checkIn twice but in different days', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        const gym = await gymRepository.create({
            id: '1',
            name: 'Academia',
            latitude: 0,
            longitude: 0
        })

        await checkInUseCase.execute({
            gymId: gym.id,
            userId: '1',
            userLatitude: 0,
            userLongitude: 0
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

        const checkIn = await checkInUseCase.execute({
            gymId: gym.id,
            userId: '1',
            userLatitude: 0,
            userLongitude: 0
        })

        expect(checkIn.checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in if user is too far from gym', async () => {
        const gym = await gymRepository.create({
            id: '1',
            name: 'Academia',
            latitude: 0,
            longitude: 0
        })

        await expect(() =>
            checkInUseCase.execute({
                gymId: gym.id,
                userId: '1',
                userLatitude: 1,
                userLongitude: 1
            })
        ).rejects.toBeInstanceOf(Error)
    });
})