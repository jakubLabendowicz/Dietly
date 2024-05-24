import { describe, it, beforeAll, afterAll, expect } from '@jest/globals';
import { app } from '../../backend_test';
let request = require('supertest')(app);

describe("Given no login and password", () => {
    it("Should return 401", async () => {
        const temp = await request.post('/api/v1/auth')
        expect(temp.status).toBe(401)
    })
})

describe("Given bad password", () => {
    it("Should return 401", async () => {
        const temp = await request.post('/api/v1/auth')
            .send({
                "data": {
                    login: "test",
                    password: "badPassword"
                }
            })

        expect(temp.status).toBe(401)
    })
})

describe("Given good login", () => {
    it("Should return 200", async () => {
        const temp = await request.post('/api/v1/auth').send({
            "data": {
                login: "test",
                password: "PasswordForTesting"
            }
        })

        expect(temp.status).toBe(200)
    })
})

describe("Given no token", () => {
    it("Should return 401", async () => {
        const temp = await request
            .post('/api/v1/badge')
        expect(temp.status).toBe(401)
    })
})