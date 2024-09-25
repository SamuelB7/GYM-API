import { makeFindGymsByNameUseCase } from "@/use-cases/factories/make-find-gym-by-name-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function searchGymController(request: FastifyRequest, reply: FastifyReply) {
    const searchGymQuerySchema = z.object({
        query: z.string(),
        page: z.coerce.number().min(1).default(1),
    })

    const { query, page } = searchGymQuerySchema.parse(request.query)

    const searchGymUseCase = makeFindGymsByNameUseCase()

    const gym = await searchGymUseCase.execute({ name: query, page })

    return reply.status(201).send(gym)
}