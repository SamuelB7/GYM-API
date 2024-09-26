import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create gym (e2e)", () => {

    beforeAll(async () => {
        await app.ready();
    })

    afterAll(async () => {
        await app.close();
    })

    it("should create a new gym", async () => {
        const { token } = await createAndAuthenticateUser(app, true);

        const response = await request(app.server).post("/gyms").set('Authorization', `Bearer ${token}`).send({
            name: "Some Gym",
            description: "Some description",
            phone: "12345678910",
            latitude: -27.2092052,
            longitude: -49.6401092,
        })

        expect(response.statusCode).toEqual(201);
    });
});