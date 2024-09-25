import { makeGetNearbyGymsUseCase } from "@/use-cases/factories/make-get-nearby-gyms-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function nearbyGymsController(request: FastifyRequest, reply: FastifyReply) {
    const nearbyGymQuerySchema = z.object({
        latitude: z.number().refine((value) => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine((value) => {
            return Math.abs(value) <= 180
        })
    })

    const { latitude, longitude } = nearbyGymQuerySchema.parse(request.query)

    const nearbyGymsUseCase = makeGetNearbyGymsUseCase()

    const gyms = await nearbyGymsUseCase.execute({ userLatitude: latitude, userLongitude: longitude })

    return reply.status(201).send(gyms)
}