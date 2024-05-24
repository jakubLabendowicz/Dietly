import { describe, it, beforeAll, expect } from '@jest/globals';
import { app } from '../../backend_test';
let request = require('supertest')(app);
let auth: string;
let toDelete: Number;

beforeAll(async () => {
    const temp = await request
        .post('/api/v1/auth')
        .send({
            data: {
                login: "test",
                password: "PasswordForTesting"
            }
        })
    auth = temp.body.data.token
});


describe("Get endpoint", () => {
    describe("Given bad data", () => {
        it("Should return 404", async () => {
            const temp = await request
                .get('/api/v1/me/69')
                .auth(auth, { type: "bearer" })
            expect(temp.status).toBe(404)
        })
    })

    describe("Given no data", () => {
        it("Should return 200", async () => {
            const temp = await request
                .get('/api/v1/me/')
                .auth(auth, { type: "bearer" })
            expect(temp.status).toBe(200)
        })
    })
})

describe("Patch endpoint", () => {

    describe("Given bad data", () => {
        it("Should return 404", async () => {
            const temp = await request
                .patch('/api/v1/me/ds')
                .auth(auth, { type: "bearer" })
                .send({
                    data: {
                        fileId: "test"
                    }
                })
            expect(temp.status).toBe(404)
        })
    })

    describe("Given good data", () => {
        it("Should return 200", async () => {
            const temp = await request
                .patch('/api/v1/me/')
                .auth(auth, { type: "bearer" })
                .send({
                    data: {
                       fileId: 1
                    }
                })
            expect(temp.status).toBe(200)
        })
    })
})
