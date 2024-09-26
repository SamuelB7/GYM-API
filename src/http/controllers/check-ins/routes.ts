import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";
import { FastifyInstance } from "fastify";
import { createCheckInController } from "./create.controller";
import { checkInHistoryController } from "./history.controller";
import { checkInMetricsController } from "./metrics.controller";
import { validateCheckInController } from "./validate.controller";

export async function checkInsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.get('/check-ins/history', checkInHistoryController)
    app.get('/check-ins/metrics', checkInMetricsController)

    app.post('/gyms/check-ins', createCheckInController)
    app.patch('/check-ins/:checkInId/validate', { onRequest: [verifyUserRole('ADMIN')] }, validateCheckInController)
}