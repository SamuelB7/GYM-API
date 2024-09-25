import { makeGetUserCheckInsHistoryUseCase } from "@/use-cases/factories/make-get-user-check-ins-history-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function checkInHistoryController(request: FastifyRequest, reply: FastifyReply) {
    const checkInHistoryBodySchema = z.object({
        page: z.coerce.number().min(1).default(1),
    })
    const { page } = checkInHistoryBodySchema.parse(request.query)

    const checkInHistoryUseCase = makeGetUserCheckInsHistoryUseCase()

    const checkIns = await checkInHistoryUseCase.execute({ page, userId: request.user.sub })

    return reply.status(200).send(checkIns)
}