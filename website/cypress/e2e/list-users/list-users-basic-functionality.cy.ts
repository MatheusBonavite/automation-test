/// <reference types="cypress" />

describe("Enter /list-users route without cookies", () => {
    beforeEach(() => {
        cy.visit("/list-users");
    });

    it("Should go back", () => {
        cy.url().should("eq", "http://localhost:3000/");
    });
});

describe("Enter /list-users route with user cookie", () => {
    beforeEach(() => {
        cy.setCookie("user", "matheus");
        cy.setCookie("remember", "matheus");
        cy.visit("/list-users");
    });

    it("Should not go back", () => {
        cy.url().should("eq", "http://localhost:3000/list-users");
    });

    it("Go back and come again! Without marking 'Remember me!'", () => {
        cy.url().should("eq", "http://localhost:3000/list-users");
        cy.get('[data-testid="logout-from-list-users"]').click();
        cy.wait(1000); //Wait one second before going back!
        cy.get('[data-testid="login-form-button"]').click();
        cy.wait(1500); //Wait one and a half second before checking cookies
        cy.getCookie("user").should("exist");
        cy.getCookie("remember").should("not.exist");
        cy.wait(1000); //Wait one second before going back!
        cy.get('[data-testid="list-users-button"]').click();
        cy.url().should("eq", "http://localhost:3000/list-users");
    });
});
