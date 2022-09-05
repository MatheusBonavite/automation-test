/// <reference types="cypress" />

describe("Test the username input in the login page.", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.get('[data-testid="login-form-username"]').as("user-name");
        cy.get('[data-testid="login-form-password"]').as("user-password");
    });

    it("Should display incorrect username length tip in the form", () => {
        cy.get("@user-name").type("mathafdkldfklnflk");
        cy.get("[style='color: var(--error-color);']").contains(
            "Should have 5-10 characters"
        );
    });

    it("Should display username allowed values tip in the form", () => {
        cy.get("@user-name").type("matheu$");
        cy.get("[style='color: var(--error-color);']").contains(
            "Allowed values: A-Z, a-z, 0-9"
        );
    });

    it("Should display both tips for the username in the form", () => {
        cy.get("@user-name").type("matheusa2@3ssss44312$");
        cy.get("[style='color: var(--error-color);']").contains(
            "Allowed values: A-Z, a-z, 0-9"
        );
        cy.get("[style='color: var(--error-color);']").contains(
            "Should have 5-10 characters"
        );
    });
});

describe("Test the password input in the login page.", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.get('[data-testid="login-form-username"]').as("user-name");
        cy.get('[data-testid="login-form-password"]').as("user-password");
    });

    it("Should display allowed values for password tip in the form", () => {
        cy.get("@user-password").type("asdd$5");
        cy.get("[style='color: var(--error-color);']").contains(
            "Allowed values: a-z"
        );
    });

    it("Should display incorrect password length tip in the form", () => {
        cy.get("@user-password").type("faasffafasfafafa");
        cy.get("[style='color: var(--error-color);']").contains(
            "Should have 6 characters"
        );
    });

    it("Should display both tips for the password in the form", () => {
        cy.get("@user-password").type("faasffafasfafafa#asd123AAA");
        cy.get("[style='color: var(--error-color);']").contains(
            "Allowed values: a-z"
        );
        cy.get("[style='color: var(--error-color);']").contains(
            "Should have 6 characters"
        );
    });
});

describe("Test both the username and password input in the login page.", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.get('[data-testid="login-form-username"]').as("user-name");
        cy.get('[data-testid="login-form-password"]').as("user-password");
    });

    it("Should display allowed values username/password tip in the form", () => {
        cy.get("@user-name").type("math&u$");
        cy.get("@user-password").type("280897");
        cy.get("[style='color: var(--error-color);']").contains(
            "Allowed values: A-Z, a-z, 0-9"
        );
        cy.get("[style='color: var(--error-color);']").contains(
            "Allowed values: a-z"
        );
    });

    it("Should display incorrect username/password length tip in the form", () => {
        cy.get("@user-name").type("mathafdkldfklnflk");
        cy.get("@user-password").type("azazazazazaz");
        cy.get("[style='color: var(--error-color);']").contains(
            "Should have 5-10 characters"
        );
        cy.get("[style='color: var(--error-color);']").contains(
            "Should have 6 characters"
        );
    });

    it("Should display both tips for username/password in the form", () => {
        cy.get("@user-name").type("math$afdk$ldfkln#@flk");
        cy.get("@user-password").type("aza#124zazazaza###z");
        cy.get("[style='color: var(--error-color);']").contains(
            "Allowed values: A-Z, a-z, 0-9"
        );
        cy.get("[style='color: var(--error-color);']").contains(
            "Should have 5-10 characters"
        );
        cy.get("[style='color: var(--error-color);']").contains(
            "Allowed values: a-z"
        );
        cy.get("[style='color: var(--error-color);']").contains(
            "Should have 6 characters"
        );
    });
});
