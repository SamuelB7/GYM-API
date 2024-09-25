import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Validate check-in (e2e)", () => {

    beforeAll(async () => {
        await app.ready();
    })

    afterAll(async () => {
        await app.close();
    })

    it("should validate a check-in", async () => {
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

        let checkIn = await prisma.checkIn.create({
            data: {
                user_id: user.id,
                gym_id: gym.id,
            }
        })

        const response = await request(app.server)
            .patch(`/check-ins/${checkIn.id}/validate`)
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(204);

        checkIn = await prisma.checkIn.findUniqueOrThrow({
            where: {
                id: checkIn.id
            }
        })

        expect(checkIn.validatedAt).toEqual(expect.any(Date));
    });
});