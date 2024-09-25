import { makeCheckInsUseCase } from "@/use-cases/factories/make-check-ins-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function createCheckInController(request: FastifyRequest, reply: FastifyReply) {
    const createCheckInBodySchema = z.object({
        gymId: z.string(),
        latitude: z.number().refine((value) => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine((value) => {
            return Math.abs(value) <= 180
        }),
    })

    const { gymId, latitude, longitude } = createCheckInBodySchema.parse(request.body)

    const createCheckInUseCase = makeCheckInsUseCase()

    const gym = await createCheckInUseCase.execute({ userLatitude: latitude, userLongitude: longitude, gymId, userId: request.user.sub })

    return reply.status(201).send(gym)
}