import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";
import { FastifyInstance } from "fastify";
import { createCheckInController } from "./create.controller";
import { checkInHistoryController } from "./history.controller";
import { checkInMetricsController } from "./metrics.controller";
import { validateCheckInController } from "./validate.controller";

export async function checkInsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.get('/check-ins/history', {
        schema: {
            description: 'Get check-in history',
            summary: 'Get check-in history',
            tags: ['Check-Ins'],
            response: {
                200: {
                    type: 'object',
                    properties: {
                        checkIns: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    user_id: { type: 'string' },
                                    gym_id: { type: 'string' },
                                    createdAt: { type: 'string', format: 'date-time' },
                                    validatedAt: { type: 'string', format: 'date-time' }
                                }
                            }
                        }
                    }
                }
            }
        }
    }, checkInHistoryController)
    app.get('/check-ins/metrics', {
        schema: {
            description: 'Get check-in metrics',
            summary: 'Get check-in metrics',
            tags: ['Check-Ins'],
            response: {
                200: {
                    type: 'object',
                    properties: {
                        totalCheckIns: { type: 'number' }
                    }
                }
            }
        }
    }, checkInMetricsController)

    app.post('/gyms/check-ins', {
        schema: {
            description: 'Create a new check-in',
            summary: 'Create a new check-in',
            tags: ['Check-Ins'],
            body: {
                type: 'object',
                properties: {
                    gymId: { type: 'string' },
                    latitude: { type: 'number' },
                    longitude: { type: 'number' }
                },
                required: ['gymId', 'latitude', 'longitude']
            },
            response: {
                201: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        user_id: { type: 'string' },
                        gym_id: { type: 'string' },
                        createdAt: { type: 'string', format: 'date-time' },
                        validatedAt: { type: 'string', format: 'date-time' }
                    }
                }
            }
        }
    }, createCheckInController)
    app.patch('/check-ins/:checkInId/validate', {
        onRequest: [verifyUserRole('ADMIN')],
        schema: {
            description: 'Validate a check-in',
            summary: 'Validate a check-in',
            tags: ['Check-Ins'],
            params: {
                type: 'object',
                properties: {
                    checkInId: { type: 'string' }
                },
                required: ['checkInId']
            },
            response: {
                204: {
                    type: 'null'
                }
            }
        }
    }, validateCheckInController)
}