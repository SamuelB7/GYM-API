import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { UserExistsError } from "@/use-cases/errors/user-exists-error"
import { RegisterUseCase } from "@/use-cases/register"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function registerController(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    try {
        const usersRepository = new PrismaUsersRepository()
        const registerUserUseCase = new RegisterUseCase(usersRepository)
        const user = await registerUserUseCase.execute({ name, email, password })
        return reply.status(201).send(user)
    } catch (error) {
        if (error instanceof UserExistsError) {
            return reply.status(409).send({ message: error.message })
        }
        throw error
    }
}