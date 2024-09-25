import { makeCheckInsCountByUserUseCase } from "@/use-cases/factories/make-check-ins-count-by-user-use-case"
import { FastifyReply, FastifyRequest } from "fastify"

export async function checkInMetricsController(request: FastifyRequest, reply: FastifyReply) {
    const checkInMetricsUseCase = makeCheckInsCountByUserUseCase()

    const checkInsCount = await checkInMetricsUseCase.execute({ userId: request.user.sub })

    return reply.status(200).send(checkInsCount)
}