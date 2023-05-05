const app = require('../../src/app');
const session = require('supertest');
const agent = session(app);

describe("GET all diets",()=>{
    it("It should return an array", async()=>{
        const result = await agent.get("/diets")
        expect(Array.isArray(result.body)).toBeTruthy()
    })
    it("It should return a 200 code if everything worked", async()=>{
        const result = await agent.get("/diets")
        expect(result.statusCode).toEqual(200)
    })
    it("It should return a 404 code if there was an error", async()=>{
        const result = await agent.get("/dietss")
        expect(result.statusCode).toEqual(404)
    })
})

