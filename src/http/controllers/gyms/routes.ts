import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";
import { FastifyInstance } from "fastify";
import { createGymController } from "./create.controller";
import { nearbyGymsController } from "./nearby.controller";
import { searchGymController } from "./search.controller";

export async function gymsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.get('/gyms/search', searchGymController)
    app.get('/gyms/nearby', nearbyGymsController)

    app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, createGymController)
}