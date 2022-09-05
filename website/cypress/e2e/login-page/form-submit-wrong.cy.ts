/// <reference types="cypress" />

describe("Submit a totally empty form", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Submit the empty form", () => {
        cy.get('[data-testid="login-form"]').submit();
    });
});

describe("Submit a form with the wrong information", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Submit with both informations wrong", () => {
        cy.get('[data-testid="login-form-username"]').type(
            "matheusa2@3ssss44312$"
        );
        cy.get('[data-testid="login-form-password"]').type("123321sfaas");
        cy.get('[data-testid="login-form"]').submit();
        cy.contains("Make input corrections, based on the tip!");
    });

    it("Submit with username information wrong", () => {
        cy.get('[data-testid="login-form-username"]').type(
            "matheusa2@3ssss44312$"
        );
        cy.get('[data-testid="login-form-password"]').type("asdbsf");
        cy.get('[data-testid="login-form"]').submit();
        cy.contains("Make input corrections, based on the tip!");
    });

    it("Submit with password information wrong", () => {
        cy.get('[data-testid="login-form-username"]').type("matheus");
        cy.get('[data-testid="login-form-password"]').type("123321sfaas");
        cy.get('[data-testid="login-form"]').submit();
        cy.contains("Make input corrections, based on the tip!");
    });

    it("Submit user that is not on the database", () => {
        cy.get('[data-testid="login-form-username"]').type("mathias");
        cy.get('[data-testid="login-form-password"]').type("asdasd");
        //On this case I don't want the database to influence my tests!
        cy.intercept("/api/getUser?*", { fixture: "matheus" }).as(
            "get-user-api"
        );
        cy.get('[data-testid="login-form"]').submit();
        cy.contains("User not found!");
    });

    it("Submit user with incorrect password", () => {
        cy.get('[data-testid="login-form-username"]').type("matheus");
        cy.get('[data-testid="login-form-password"]').type("asdasd");
        cy.get('[data-testid="login-form"]').submit();
        //On this case I don't want the database to influence my tests!
        cy.intercept("/api/getUser?*", { fixture: "matheus" }).as(
            "get-user-api"
        );
        cy.contains("Password does not match!");
    });
});
