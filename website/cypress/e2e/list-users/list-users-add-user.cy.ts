/// <reference types="cypress" />

describe("Enter /choose-function route without cookies", () => {
    beforeEach(() => {
        cy.visit("/choose-function");
    });

    it("Should go back", () => {
        cy.url().should("eq", "http://localhost:3000/");
    });
});
