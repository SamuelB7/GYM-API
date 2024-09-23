import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetNearbyGymsUseCase } from "./get-nearby-gyms";

let gymsRepository: InMemoryGymRepository
let getNearbyGymsUseCase: GetNearbyGymsUseCase

describe("Find nearby gyms use case", () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymRepository()
        getNearbyGymsUseCase = new GetNearbyGymsUseCase(gymsRepository)
    })

    it('should be find a gym by name', async () => {
        await gymsRepository.create({
            name: 'Random Gym',
            description: 'Best gym in the world',
            phone: '11999999999',
            latitude: -23.5489,
            longitude: -46.6388
        })

        const gyms = await getNearbyGymsUseCase.execute({ userLatitude: -23.5489, userLongitude: -46.6388 })

        expect(gyms.gyms).toContainEqual(
            expect.objectContaining({
                name: 'Random Gym'
            })
        )
    })
})