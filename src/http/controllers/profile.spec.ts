import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("user profile (e2e)", () => {

    beforeAll(async () => {
        await app.ready();
    })

    afterAll(async () => {
        await app.close();
    })

    it("should shou a user profile", async () => {
        await request(app.server).post("/users").send({
            name: "John Doe",
            email: "johndoe@email.com",
            password: "1234567"
        })

        const auth = await request(app.server).post("/auth").send({
            email: "johndoe@email.com",
            password: "1234567"
        })

        const response = await request(app.server).get("/profile").set('Authorization', `Bearer ${auth.body.token}`).send()

        expect(response.statusCode).toEqual(200);
        expect(response.body.user).toEqual(expect.objectContaining({
            email: "johndoe@email.com",
        }));
    });
});