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
        cy.getCookie("user").should("exist"); //Expect to see the user cookie (indicates it is logged in)
        cy.get("@logout-button").click();
    });

    it("Submit with both informations correctly and go to the list users page", () => {
        cy.get('[data-testid="login-form-username"]').type("matheus");
        cy.get('[data-testid="login-form-password"]').type("dbdocs");
        cy.get('[data-testid="login-form"]').submit();
        cy.wait("@get-user-api"); //Making sure we hit our api to get the username!

        //Now that the information is correct should render choose-function
        cy.url().should("eq", "http://localhost:3000/choose-function");

        //Check both 'List Users' and 'Logout' buttons
        cy.get('[data-testid="list-users-button"]')
            .as("list-users")
            .contains("List Users");
        cy.get('[data-testid="logout-from-choose-function"]').contains(
            "Logout"
        );
        cy.wait(1000); //Wait one quick second before leaving the page!
        cy.getCookie("user").should("exist"); //Expect to see the user cookie (indicates it is logged in)
        cy.get("@list-users").click();

        //Check on this page if we have: table (list the users), choose function, logout, and add user
        cy.getCookie("user").should("exist"); //Expect to see the user cookie (still)
        cy.get("table").should("exist");
        cy.get('[data-testid="go-back-choose-function"]').contains(
            "Choose Function"
        );
        cy.get('[data-testid="logout-from-list-users"]')
            .as("logout-button")
            .contains("Logout");
        cy.get('[data-testid="add-user-button"]').contains("Add User");

        cy.wait(1000); //Wait one quick second before leaving the page!
        cy.get("@logout-button").click();
        cy.wait(500); //Wait half a second to check the cookies
        cy.getCookie("user").should("not.exist"); //Now that we logged out, we can't see the cookie!
    });
});

describe("Submit a form with the correct information and logout (plus remember me)", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.intercept("/api/getUsers?*").as("get-user-api");
    });

    it("Submit with both informations correctly plus remember (log out and log back)", () => {
        cy.get('[data-testid="login-form-username"]').type("matheus");
        cy.get('[data-testid="login-form-password"]').type("dbdocs");
        cy.get('[data-testid="remember-me"]').check();
        cy.get('[data-testid="login-form"]').submit();
        cy.wait("@get-user-api"); //Making sure we hit our api to get the username!

        //Now that the information is correct should render choose-function
        cy.url().should("eq", "http://localhost:3000/choose-function");

        //Check both 'List Users' and 'Logout' buttons
        cy.get('[data-testid="list-users-button"]')
            .as("list-users")
            .contains("List Users");
        cy.get('[data-testid="logout-from-choose-function"]')
            .as("logout-button")
            .contains("Logout");
        cy.wait(1000); //Wait one quick second before leaving the page!
        cy.getCookie("user").should("exist"); //Expect to see the user cookie (indicates it is logged in)
        cy.getCookie("remember").should("exist"); //Expect to see the remember me cookie!

        //Page should remember the user
        cy.wait(1000); //Wait one quick second before leaving the page!
        cy.get("@logout-button").click();

        //Should be back to the
        cy.url().should("eq", "http://localhost:3000/");

        //Should only have the 'Press me!' button
        cy.get('input[type="text"]').should("not.be.visible");
        cy.get('input[type="password"]').should("not.be.visible");
        cy.get('[data-testid="login-form-button"]')
            .as("log-in")
            .contains("Press me!");

        cy.wait(1000); //Wait one quick second before logging back the page!
        cy.get("@log-in").click();
        cy.wait(1000); //Wait a second to check route and cookies
        cy.url().should("eq", "http://localhost:3000/choose-function");
        cy.getCookie("user").should("exist"); //Because we logged back!
        cy.getCookie("remember").should("not.exist"); //Because we did not marked the remember me again!
    });

    it("Submit with both informations correctly and go to the list users page plus remember (log out and come back)", () => {
        cy.get('[data-testid="login-form-username"]').type("matheus");
        cy.get('[data-testid="login-form-password"]').type("dbdocs");
        cy.get('[data-testid="remember-me"]').check();
        cy.get('[data-testid="login-form"]').submit();
        cy.wait("@get-user-api"); //Making sure we hit our api to get the username!

        //Now that the information is correct should render choose-function
        cy.url().should("eq", "http://localhost:3000/choose-function");

        //Check both 'List Users' and 'Logout' buttons
        cy.get('[data-testid="list-users-button"]')
            .as("list-users")
            .contains("List Users");
        cy.get('[data-testid="logout-from-choose-function"]').contains(
            "Logout"
        );
        cy.wait(1000); //Wait one quick second before leaving the page!
        cy.getCookie("user").should("exist"); //Expect to see the user cookie (indicates it is logged in)
        cy.getCookie("remember").should("exist"); //Expect to see the remember me cookie!
        cy.get("@list-users").click();

        //Check on this page if we have: table (list the users), choose function, logout, and add user
        cy.getCookie("user").should("exist"); //Expect to see the user cookie (still)
        cy.getCookie("remember").should("exist"); //Expect to see the remember me cookie (still)
        cy.get("table").should("exist");
        cy.get('[data-testid="go-back-choose-function"]').contains(
            "Choose Function"
        );
        cy.get('[data-testid="logout-from-list-users"]')
            .as("logout-button")
            .contains("Logout");
        cy.get('[data-testid="add-user-button"]').contains("Add User");

        cy.wait(1000); //Wait one quick second before leaving the page!
        cy.get("@logout-button").click();
        cy.wait(500); //Wait half a second to check the cookies
        cy.getCookie("user").should("not.exist"); //Now that we logged out, we can't see the cookie!
        cy.getCookie("remember").should("exist"); //Should still se remember me!

        cy.wait(1000); //Wait one quick second before logging back the page!
        cy.get('[data-testid="login-form-button"]')
            .as("log-in")
            .contains("Press me!");
        cy.get("@log-in").click();
        cy.wait(1000); //Wait a second to check route and cookies
        cy.url().should("eq", "http://localhost:3000/choose-function");
        cy.getCookie("user").should("exist"); //Because we logged back!
        cy.getCookie("remember").should("not.exist"); //Because we did not marked the remember me again!
    });
});
