/// <reference types="cypress" />

describe("Enter the login page!", () => {
    //The first thing is to tell cypress where to go!
    //Base URL is configured, so we don't need to type the whole domain!
    beforeEach(() => {
        cy.visit("/");
        cy.get('[data-testid="login-form"]').as("form");
        cy.get('[data-testid="login-form-button"]').as("formButton");
    });

    it("Should have a login form", () => {
        cy.get("@form").should("exist");
    });

    it("Button should have the phrase 'Press me!'", () => {
        cy.get("@formButton").contains("Press me!");
    });
});
