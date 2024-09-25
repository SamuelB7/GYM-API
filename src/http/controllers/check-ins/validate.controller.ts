import { makeValidateCheckInUseCase } from "@/use-cases/factories/make-validate-check-in-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function validateCheckInController(request: FastifyRequest, reply: FastifyReply) {
    const validateCheckInParamsSchema = z.object({
        checkInId: z.string(),
    })

    const { checkInId } = validateCheckInParamsSchema.parse(request.params)

    const validateCheckInuseCase = makeValidateCheckInUseCase()

    const gym = await validateCheckInuseCase.execute({ checkInId })

    return reply.status(204).send(gym)
}