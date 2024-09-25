import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create check-in (e2e)", () => {

    beforeAll(async () => {
        await app.ready();
    })

    afterAll(async () => {
        await app.close();
    })

    it("should create a new check-in", async () => {
        const { token } = await createAndAuthenticateUser(app);

        const gym = await prisma.gym.create({
            data: {
                name: "Test Gym",
                description: "Test Gym Description",
                phone: "123456789",
                latitude: -27.2092052,
                longitude: -49.6401092,
            }
        })

        const response = await request(app.server).post("/gyms/check-ins").set('Authorization', `Bearer ${token}`).send({
            gymId: gym.id,
            latitude: -27.2092052,
            longitude: -49.6401092,
        })

        expect(response.statusCode).toEqual(201);
    });
});