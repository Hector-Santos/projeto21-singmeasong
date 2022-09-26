import supertest from "supertest";
import app from "../../src/app";
import { prisma } from "../../src/database";
import {createRecommendation, prepareRecommendation} from "../factories/recommendationFactory";
import {
  deleteAllData,
  disconnectPrisma
} from "../factories/scenarioFactory";

beforeEach(async () => {
  await deleteAllData();
});

const server = supertest(app);

describe("Testes com recommendations", () => {
  it("Testa POST /recommendations passando uma recomendação válida", async () => {
    const recommendation = await prepareRecommendation();

    const result = await server.post("/recommendations").send(recommendation);

    const createdRecommendation = await prisma.recommendation.findFirst({
      where: { name: recommendation.name }
    });

    expect(result.status).toBe(201);
    expect(createdRecommendation).not.toBeNull();
    
  });
  
  it("Testa POST /recommendations passando uma recomendação existente", async () => {
    const recommendation = await createRecommendation();

    const result = await server.post("/recommendations").send(
      {
        name: recommendation.name,
        youtubeLink: recommendation.youtubeLink
      });

    expect(result.status).toBe(409);
    expect(result.text).toEqual("Recommendations names must be unique");
    
  });

  it("Testa POST /recommendations passando uma recomendação inválida", async () => {
    const recommendation = {};

    const result = await server.post("/recommendations").send(recommendation);

    expect(result.status).toBe(422);
    
  });

  it("Testa POST /recommendations/:id/upvote passando um id válido", async () => {
    const recommendation = await createRecommendation();

    const result = await server.post(`/recommendations/${recommendation.id}/upvote`);

    const createdRecommendation = await prisma.recommendation.findFirst({
      where: { name: recommendation.name }
    });

    expect(result.status).toBe(200);
    expect(createdRecommendation.score).toEqual(recommendation.score +1);
  });

  it("Testa POST /recommendations/:id/downvote passando um id válido", async () => {
    const recommendation = await createRecommendation();

    const result = await server.post(`/recommendations/${recommendation.id}/downvote`);

    const createdRecommendation = await prisma.recommendation.findFirst({
      where: { name: recommendation.name }
    });

    expect(result.status).toBe(200);
    expect(createdRecommendation.score).toEqual(recommendation.score -1);
  });

  it("Testa POST /recommendations/:id/upvote passando um id inválido", async () => {

    const result = await server.post("/recommendations/1/upvote");

    expect(result.status).toBe(404);
  });

  it("Testa POST /recommendations/:id/downvote passando um id inválido", async () => {

    const result = await server.post("/recommendations/1/downvote");

    expect(result.status).toBe(404);
  });


  it("Testa GET /recommendations ", async () => {
    await createRecommendation();

    const result = await server.get("/recommendations");

    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
    
  });
  it("Testa GET /recommendations/:id com um id válido", async () => {
    const recommendation = await createRecommendation();

    const result = await server.get(`/recommendations/${recommendation.id}`);

    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Object);
    
  });

  it("Testa GET /recommendations/:id com um id inválido", async () => {
    const result = await server.get("/recommendations/1");

    expect(result.status).toBe(404); 
  });

  it("Testa GET /recommendations/random", async () => {
    await createRecommendation();

    const result = await server.get("/recommendations/random");

    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Object);
    
  });

  it("Testa GET /recommendations/random com banco vazio", async () => {

    const result = await server.get("/recommendations/random");

    expect(result.status).toBe(404);
    
  });

  it("Testa GET /recommendations/top/:amount", async () => {

    const result = await server.get("/recommendations/top/3");

    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
    
  });

  it("Testa GET /recommendations/top/:amount com parametro diferente de inteiro", async () => {

    const result = await server.get("/recommendations/top/e");

    expect(result.status).toBe(500);
    
  });
  

});


afterAll(async () => {
  await disconnectPrisma();
});
