import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FindGymByNameUseCase } from "./find-gym-by-name";

let gymsRepository: InMemoryGymRepository
let findGymByNameUseCase: FindGymByNameUseCase

describe("Find gym by name use case", () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymRepository()
        findGymByNameUseCase = new FindGymByNameUseCase(gymsRepository)
    })

    it('should be find a gym by name', async () => {
        await gymsRepository.create({
            name: 'Random Gym',
            description: 'Best gym in the world',
            phone: '11999999999',
            latitude: -23.5489,
            longitude: -46.6388
        })

        const gyms = await findGymByNameUseCase.execute({ name: 'Random Gym', page: 1 })

        expect(gyms.gyms).toContainEqual(
            expect.objectContaining({
                name: 'Random Gym'
            })
        )
    })
})