/// <reference types="cypress" />

describe("Submit a form with the correct information and check the api", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.intercept("/api/getUsers?*").as("get-user-api");
    });

    it("Submit with both informations correctly and make sure we hit the api", () => {
        cy.get('[data-testid="login-form-username"]').type("matheus");
        cy.get('[data-testid="login-form-password"]').type("dbdocs");
        cy.get('[data-testid="login-form"]').submit();
        cy.wait("@get-user-api"); //Making sure we hit our api to get the username!
    });

    it("Submit with both informations correctly and check query params for the url", () => {
        cy.get('[data-testid="login-form-username"]').type("matheus");
        cy.get('[data-testid="login-form-password"]').type("dbdocs");
        cy.get('[data-testid="login-form"]').submit();
        //I wanna make sure I'm sending the correct request
        cy.wait("@get-user-api")
            .its("request.url")
            .should("contain", "name=matheus");
    });
});

describe("Submit a form with the correct information and logout", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.intercept("/api/getUsers?*").as("get-user-api");
    });

    it("Submit with both informations correctly and logout", () => {
        cy.get('[data-testid="login-form-username"]').type("matheus");
        cy.get('[data-testid="login-form-password"]').type("dbdocs");
        cy.get('[data-testid="login-form"]').submit();
        cy.wait("@get-user-api"); //Making sure we hit our api to get the username!

        //Now that the information is correct should render choose-function
        cy.url().should("eq", "http://localhost:3000/choose-function");

        //Check both 'List Users' and 'Logout' buttons
        cy.get('[data-testid="list-users-button"]').contains("List Users");
        cy.get('[data-testid="logout-from-choose-function"]')
            .as("logout-button")
            .contains("Logout");
        cy.wait(1000); //Wait one quick second before leaving the page!
        cy.get("@logout-button").click();
    });
});
