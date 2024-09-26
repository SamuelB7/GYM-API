import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { authenticateController } from "./authenticate.controller";
import { profileController } from "./profile.controller";
import { refreshController } from "./refresh.controller";
import { registerController } from "./register.controller";

export async function usersRoutes(app: FastifyInstance) {
    app.post('/users', registerController)
    app.post('/auth', authenticateController)

    app.patch('/token/refresh', refreshController)

    app.get('/profile', { onRequest: [verifyJWT] }, profileController)
}