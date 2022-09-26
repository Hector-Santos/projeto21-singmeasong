/* eslint-disable no-undef */


beforeEach(async () => {
  await cy.request("POST", "http://localhost:5000/e2e/reset", {});
});


describe("Testa a rota /recommendations", () => {
  it("da upvote em uma recommendation", async () => {

    cy.request("POST", "http://localhost:5000/e2e/create", {});
    cy.visit("http://localhost:3000/");
    

    // eslint-disable-next-line quotes
    cy.get("[data-test-id='upvote']").click();
  });

  it("da downvote em uma recommendation", async () => {

    cy.request("POST", "http://localhost:5000/e2e/create", {});
    cy.visit("http://localhost:3000/");
    

    // eslint-disable-next-line quotes
    cy.get("[data-test-id='downvote']").click();
  });
});