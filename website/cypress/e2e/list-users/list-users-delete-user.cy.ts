/// <reference types="cypress" />

describe("Enter /list-users route without cookies", () => {
    beforeEach(() => {
        cy.setCookie("user", "matheus");
        cy.setCookie("remember", "matheus");
        cy.visit("/list-users");
    });

    it("Delete the second user", () => {
        cy.url().should("eq", "http://localhost:3000/list-users");
        let usernameToDelete = "";
        cy.get("table > :nth-child(2) > :nth-child(2) > :nth-child(2)").then(
            ($username) => {
                usernameToDelete = $username.text();
                cy.log(`Will be deleted: ${usernameToDelete}`);
                cy.get(
                    "table > :nth-child(2) > :nth-child(2) > :nth-child(3)"
                ).click();
                cy.wait(1000); //Wait one second to check
                cy.log(`Should not be here: ${usernameToDelete}`);
                cy.get(
                    "table > :nth-child(2) > :nth-child(2) > :nth-child(2)"
                ).should("not.contain", usernameToDelete);
            }
        );
    });
});
