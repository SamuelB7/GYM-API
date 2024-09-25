import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Check-in metrics (e2e)", () => {

    beforeAll(async () => {
        await app.ready();
    })

    afterAll(async () => {
        await app.close();
    })

    it("should return a count of check-ins", async () => {
        const { token } = await createAndAuthenticateUser(app);

        const user = await prisma.user.findFirstOrThrow()

        const gym = await prisma.gym.create({
            data: {
                name: "Test Gym",
                description: "Test Gym Description",
                phone: "123456789",
                latitude: -27.2092052,
                longitude: -49.6401092,
            }
        })
        await prisma.checkIn.createMany({
            data: [
                {
                    user_id: user.id,
                    gym_id: gym.id,
                },
                {
                    user_id: user.id,
                    gym_id: gym.id,
                }
            ]
        })

        const response = await request(app.server)
            .get('/check-ins/metrics')
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200);
        expect(response.body.checkInsCount).toEqual(2);
    });
});