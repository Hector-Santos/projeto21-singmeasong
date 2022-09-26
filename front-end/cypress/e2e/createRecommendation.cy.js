/* eslint-disable no-undef */
import { faker } from "@faker-js/faker";

beforeEach(async () => {
  await cy.request("POST", "http://localhost:5000/e2e/reset", {});
});

describe("Testa a rota /recommendations", () => {
  it("cria uma recommendation", async () => {
    const urlStart = "https://www.youtube.com/";
    const youtubeLink = urlStart + faker.random.alphaNumeric(10);
    const recommendation = {
      name: faker.name.fullName(),
      youtubeLink:youtubeLink
    };
    cy.visit("http://localhost:3000/");
    // eslint-disable-next-line quotes
    cy.get("input[placeholder='Name']").type(recommendation.name);
    // eslint-disable-next-line quotes
    cy.get("input[placeholder='https://youtu.be/...']").type(recommendation.youtubeLink);

    cy.intercept("POST", "http://localhost:5000/recommendations").as("postRecommendations");
   
    cy.get("[data-test-id='submit']").click();
    
    cy.wait("@postRecommendations").should((response) => {
      const {statusCode} = response.response;
      expect(statusCode).to.eq(201); 
    });
  });
});