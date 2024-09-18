import { FastifyInstance } from "fastify";
import { registerController } from "./controllers/register.controller";

export async function appRoutes(app: FastifyInstance) {
    app.get('/hello', async (request, reply) => {
        return 'Hello World'
    })
    app.post('/users', registerController)
}