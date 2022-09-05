/// <reference types="cypress" />

describe("Enter /choose-function route without cookies", () => {
    beforeEach(() => {
        cy.visit("/choose-function");
    });

    it("Should go back", () => {
        cy.url().should("eq", "http://localhost:3000/");
    });
});

describe("Enter /choose-function route with user cookie", () => {
    beforeEach(() => {
        cy.setCookie("user", "matheus");
        cy.setCookie("remember", "matheus");
        cy.visit("/choose-function");
    });

    it("Should not go back", () => {
        cy.url().should("eq", "http://localhost:3000/choose-function");
    });

    it("Go back and come again! Without marking 'Remember me!'", () => {
        cy.url().should("eq", "http://localhost:3000/choose-function");
        cy.get('[data-testid="logout-from-choose-function"]').click();
        cy.wait(1000); //Wait one second before going back!
        cy.get('[data-testid="login-form-button"]').click();
        cy.wait(1500); //Wait one and a half second before checking cookies
        cy.getCookie("user").should("exist");
        cy.getCookie("remember").should("not.exist");
    });

    it("Go back and come again (two times)! Marking 'Remember me!'", () => {
        cy.url().should("eq", "http://localhost:3000/choose-function");
        cy.get('[data-testid="logout-from-choose-function"]')
            .as("log-out")
            .click();
        cy.wait(1000); //Wait one second before going back!
        cy.get('[data-testid="remember-me"]').check();
        cy.get('[data-testid="login-form-button"]').click();
        cy.wait(1500); //Wait one and a half second before checking cookies
        cy.getCookie("user").should("exist");
        cy.getCookie("remember").should("exist"); //Now that we have marked!
        cy.wait(1000); //Wait one second before going back!
        cy.get("@log-out").click();
        cy.wait(1000); //Wait one second before going back!
        cy.get('[data-testid="login-form-button"]').click();
        cy.url().should("eq", "http://localhost:3000/choose-function");
    });

    it("Go back and come again (two times) and list users! Marking 'Remember me!'", () => {
        cy.url().should("eq", "http://localhost:3000/choose-function");
        cy.get('[data-testid="logout-from-choose-function"]')
            .as("log-out")
            .click();
        cy.wait(1000); //Wait one second before going back!
        cy.get('[data-testid="remember-me"]').check();
        cy.get('[data-testid="login-form-button"]').click();
        cy.wait(1500); //Wait one and a half second before checking cookies
        cy.getCookie("user").should("exist");
        cy.getCookie("remember").should("exist"); //Now that we have marked!
        cy.wait(1000); //Wait one second before going back!
        cy.get("@log-out").click();
        cy.wait(1000); //Wait one second before going back!
        cy.get('[data-testid="login-form-button"]').click();
        cy.url().should("eq", "http://localhost:3000/choose-function");
        cy.get('[data-testid="list-users-button"]').click();
        cy.url().should("eq", "http://localhost:3000/list-users");
    });
});
