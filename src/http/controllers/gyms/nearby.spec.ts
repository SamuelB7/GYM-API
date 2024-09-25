import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Nearby gyms (e2e)", () => {

    beforeAll(async () => {
        await app.ready();
    })

    afterAll(async () => {
        await app.close();
    })

    it("should search for a nearby gym", async () => {
        const { token } = await createAndAuthenticateUser(app);

        await request(app.server).post("/gyms").set('Authorization', `Bearer ${token}`).send({
            name: "Some Gym",
            description: "Some description",
            phone: "12345678910",
            latitude: -27.2092052,
            longitude: -49.6401092,
        })

        await request(app.server).post("/gyms").set('Authorization', `Bearer ${token}`).send({
            name: "Far away Gym",
            description: "Far far away...",
            phone: "10987654321",
            latitude: -20.2092052,
            longitude: -33.6401092,
        })

        const response = await request(app.server)
            .get("/gyms/nearby")
            .query({
                latitude: -27.2092052,
                longitude: -49.6401092,
            })
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