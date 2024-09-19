import { CheckInRepository } from "@/repositories/check-ins-repository";
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-checkIn-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CheckInUseCase } from "./checkIn";

let checkInRepository: CheckInRepository
let checkInUseCase: CheckInUseCase

describe("Check in use case", () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository
        checkInUseCase = new CheckInUseCase(checkInRepository)
    })

    it('should be able to create a checkIn', async () => {
        const checkIn = await checkInUseCase.execute({
            gymId: '1',
            userId: '1'
        })

        expect(checkIn.checkIn.id).toEqual(expect.any(String))
    })
})