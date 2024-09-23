import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateGymUseCase } from "./create-gym";

let gymsRepository: InMemoryGymRepository
let createGymUseCase: CreateGymUseCase

describe("Create gym use case", () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymRepository()
        createGymUseCase = new CreateGymUseCase(gymsRepository)
    })

    it('should be able to create a gym', async () => {
        const gym = await createGymUseCase.execute({
            name: 'Random Gym',
            description: 'Best gym in the world',
            phone: '11999999999',
            latitude: -23.5489,
            longitude: -46.6388
        })

        expect(gym.gym.id).toEqual(expect.any(String))
    })
})