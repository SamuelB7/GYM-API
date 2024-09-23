import { CheckInRepository } from "@/repositories/check-ins-repository";
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-checkIn-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CountByUserIdUseCase } from "./check-ins-count-by-user";

let checkInRepository: CheckInRepository
let countByUserIdUseCase: CountByUserIdUseCase

describe("Get check-ins by userId use case", () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository
        countByUserIdUseCase = new CountByUserIdUseCase(checkInRepository)
    })

    it('should be able to get a count of total checkIns by userId', async () => {

        for (let i = 0; i < 22; i++) {
            await checkInRepository.create({
                user_id: '1',
                gym_id: `${i}`,
                validatedAt: new Date()
            })
        }

        const checkIns = await countByUserIdUseCase.execute({
            userId: '1',
        })

        expect(checkIns.checkInsCount).toEqual(22)
    })
})