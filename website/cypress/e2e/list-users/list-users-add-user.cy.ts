/// <reference types="cypress" />

describe("Enter /list-users route and add some user", () => {
    beforeEach(() => {
        cy.visit("/list-users");
        cy.setCookie("user", "matheus");
    });

    it("Add new existing user", () => {
        cy.get('[data-testid="add-user-button"]').click();
        cy.scrollTo("bottom", { duration: 1000, ensureScrollable: false });
        cy.get('[data-testid="add-username"]').type("casimiro");
        cy.get('[data-testid="add-password"]').type("miguel");
        cy.get('[data-testid="add-button"]').click();
        cy.contains("User already exists!");
    });

    it("Input wrong information", () => {
        cy.url().should("eq", "http://localhost:3000/list-users");
        cy.get('[data-testid="add-user-button"]').click();
        cy.scrollTo("bottom", { duration: 1000, ensureScrollable: false });
        cy.get('[data-testid="add-username"]').type("c4simiro");
        cy.get('[data-testid="add-password"]').type("migu$l");
        cy.get('[data-testid="add-button"]').click();
        cy.contains("Check out the rules!");
    });

    it("Add a new user", () => {
        cy.url().should("eq", "http://localhost:3000/list-users");
        cy.get('[data-testid="add-user-button"]').click();
        cy.scrollTo("bottom", { duration: 1000, ensureScrollable: false });
        cy.get('[data-testid="add-username"]').type("tahir");
        cy.get('[data-testid="add-password"]').type("asddsa");
        cy.get('[data-testid="add-button"]').click();
        cy.wait(500);
        cy.url().should("eq", "http://localhost:3000/list-users");
        cy.contains("tahir");
        cy.wait(500);

        //Delete the user just created! So future tests won't break!
        cy.get("table > :nth-child(2) > :last-child() > :nth-child(3)").click();
    });
});
