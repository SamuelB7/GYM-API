import { FastifyInstance } from "fastify"
import request from "supertest"

export async function createAndAuthenticateUser(app: FastifyInstance) {
    await request(app.server).post("/users").send({
        name: "John Doe",
        email: "johndoe@email.com",
        password: "1234567"
    })

    const auth = await request(app.server).post("/auth").send({
        email: "johndoe@email.com",
        password: "1234567"
    })

    const { token } = auth.body

    return {
        token
    }
} 