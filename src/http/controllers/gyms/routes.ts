import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";
import { FastifyInstance } from "fastify";
import { createGymController } from "./create.controller";
import { nearbyGymsController } from "./nearby.controller";
import { searchGymController } from "./search.controller";

export async function gymsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.get('/gyms/search', {
        schema: {
            description: 'Search for gyms by name',
            summary: 'Search for gyms by name',
            tags: ['Gyms'],
            querystring: {
                type: 'object',
                properties: {
                    query: { type: 'string' }
                },
                required: ['query']
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        gyms: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    name: { type: 'string' },
                                    description: { type: 'string' },
                                    phone: { type: 'string' },
                                    latitude: { type: 'number' },
                                    longitude: { type: 'number' }
                                }
                            }
                        }
                    }
                }
            }
        }
    }, searchGymController)
    app.get('/gyms/nearby', {
        schema: {
            description: 'Get nearby gyms',
            summary: 'Get nearby gyms',
            tags: ['Gyms'],
            querystring: {
                type: 'object',
                properties: {
                    latitude: { type: 'number' },
                    longitude: { type: 'number' }
                },
                required: ['latitude', 'longitude']
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        gyms: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    name: { type: 'string' },
                                    description: { type: 'string' },
                                    phone: { type: 'string' },
                                    latitude: { type: 'number' },
                                    longitude: { type: 'number' }
                                }
                            }
                        }
                    }
                }
            }
        }
    }, nearbyGymsController)

    app.post('/gyms', {
        onRequest: [verifyUserRole('ADMIN')],
        schema: {
            description: 'Create a new gym',
            summary: 'Create a new gym',
            tags: ['Gyms'],
            body: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    phone: { type: 'string' },
                    latitude: { type: 'number' },
                    longitude: { type: 'number' }
                },
                required: ['name', 'latitude', 'longitude']
            },
            response: {
                201: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        description: { type: 'string' },
                        phone: { type: 'string' },
                        latitude: { type: 'number' },
                        longitude: { type: 'number' }
                    }
                }
            }
        }
    }, createGymController)
}