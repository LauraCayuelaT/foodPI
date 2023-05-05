const app = require('../../src/app');
const session = require('supertest');
const agent = session(app);


describe("GET by ID", ()=>{
    it("It must return a 200 status if everything is ok", async()=>{
        const response = await agent.get("/recipes/782585")
        expect(response.statusCode).toEqual(200);
    })
    it("Should be an object", async()=>{
        const response = await agent.get("/recipes/782585")
        expect(typeof response).toEqual("object")
        expect(typeof response).not.toBe("number")
    })
    it("Response should be an object with ID, TITLE, IMAGE, SUMMARY, HEALTHSCORE, STEPS, DIETS ", async()=>{
        const response = await agent.get("/recipes/782585")
        expect(response.body).toHaveProperty("id", "title", "image", "summary", "healthScore", "steps", "diets")

    })

    it("It must return a 404 status if there's an error", async()=>{
        const response = await agent.get("/recipes/000000000")
        expect(response.statusCode).toEqual(404)
    })

    
})

describe("Get all Recipes", ()=>{
    it("It should return a 200 code if everything is ok", async()=>{
        const response = await agent.get("/recipes")
        expect(response.statusCode).toEqual(200)
    })
    it("It must return a 404 status if there's an error", async()=>{
        const response = await agent.get("/recipess")
        expect(response.statusCode).toEqual(404)
    })
    it("It should respond with an array", async()=>{
        const response = await agent.get("/recipes")
        expect(Array.isArray(response.body)).toBeTruthy()
    })
    it("If there is name it should reply with a 200 code if everything is ok", async()=>{
        const response = await agent.get("/recipes?name=chicken")
        expect(response.statusCode).toEqual(200)
    })
    it("If there is name it should reply with a 401 code if there is no recipe with that name", async()=>{
        const response = await agent.get("/recipes?name=sancocho")
        expect(response.statusCode).toEqual(401)
    })
})



describe("POST new recipe",()=>{
    it("Should return an object", async()=>{
        const response = await agent.post("/recipes")
        expect(typeof response).toEqual("object")
        expect(typeof response).not.toBe("number")
    })
  
})