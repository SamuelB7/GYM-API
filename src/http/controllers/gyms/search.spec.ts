import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Search gym (e2e)", () => {

    beforeAll(async () => {
        await app.ready();
    })

    afterAll(async () => {
        await app.close();
    })

    it("should search for a gym by name", async () => {
        const { token } = await createAndAuthenticateUser(app, true);

        await request(app.server).post("/gyms").set('Authorization', `Bearer ${token}`).send({
            name: "Some Gym",
            description: "Some description",
            phone: "12345678910",
            latitude: -27.2092052,
            longitude: -49.6401092,
        })

        const response = await request(app.server)
            .get("/gyms/search")
            .query({ query: "Some Gym" })
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200);
        expect(response.body.gyms).toHaveLength(1);
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                name: "Some Gym",
            })
        ])
    });
});