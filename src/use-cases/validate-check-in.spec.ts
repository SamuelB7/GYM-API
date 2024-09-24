import { CheckInRepository } from "@/repositories/check-ins-repository";
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-checkIn-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import { ValidateCheckInUseCase } from "./validate-check-in";

let checkInRepository: CheckInRepository
let validateCheckInUseCase: ValidateCheckInUseCase

describe("Validate check in use case", () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository
        validateCheckInUseCase = new ValidateCheckInUseCase(checkInRepository)

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to validate a checkIn', async () => {

        const checkIn = await checkInRepository.create({
            gym_id: '1',
            user_id: '1',
        })

        await validateCheckInUseCase.execute({ checkInId: checkIn.id })

        expect(checkIn.validatedAt).toEqual(expect.any(Date))
    })

    it('should not be able to validate an inexistent checkIn', async () => {
        await expect(() =>
            validateCheckInUseCase.execute({ checkInId: '1' })
        ).rejects.toThrowError(ResourceNotFoundError)
    })
})