import { CheckInRepository } from "@/repositories/check-ins-repository";
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-checkIn-repository";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { GetUserCheckInsHistoryUseCase } from "./get-user-check-ins-history";

let checkInRepository: CheckInRepository
let getCheckInsByUserIdUseCase: GetUserCheckInsHistoryUseCase

describe("Get check-ins by userId use case", () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository
        getCheckInsByUserIdUseCase = new GetUserCheckInsHistoryUseCase(checkInRepository)

        vi.useFakeTimers()
    })

    it('should be able to get a paginated list of checkIns by userId', async () => {

        for (let i = 0; i <= 22; i++) {
            await checkInRepository.create({
                user_id: '1',
                gym_id: `${i}`,
                validatedAt: new Date()
            })
        }

        const checkIns = await getCheckInsByUserIdUseCase.execute({
            userId: '1',
            page: 1
        })

        expect(checkIns.checkIns).toHaveLength(20)
    })


})