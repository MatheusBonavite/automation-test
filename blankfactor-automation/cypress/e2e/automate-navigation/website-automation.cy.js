/// <reference types="cypress" />


describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept({
      method: 'POST',
      url: 'https://d.clarity.ms/collect'
    }, req => {
      req.destroy();
    });
    cy.get('#hs-eu-confirmation-button').as('cookie-button');
    cy.get('nav [href="https://blankfactor.com/insights/"]').as('insights');
  })

  it("access article and subscribe to the newsletter", () => {
    //Accessing the article step//
    cy.get('@cookie-button').click(); //Accept cookies
    cy.get('@insights').trigger('mouseover'); //Click on the insights
    cy.get('[href="https://blankfactor.com/insights/blog/"] img').click(); //Click on the blog image!
    cy.get('h2 [href="https://blankfactor.com/insights/blog/fintech-in-latin-america/"]').should('be.visible'); //Scroll to the article
    cy.get('h2 [href="https://blankfactor.com/insights/blog/fintech-in-latin-america/"]').click(); //Access the article
    //Ending the accessing the article step//

    //I'll now make validations that I'm in the correct page!//
      //Checking the URL of the page
    cy.url().should('eq', 'https://blankfactor.com/insights/blog/fintech-in-latin-america/'); //Making sure I'm on the correct page!
      //Ending the URL verification!//

      //Checking the h1 of the page
    cy.get('h1').contains('Why Fintech in Latin America Is Having a Boom'); //Making sure the title of the page is correct
      //Ending the h1 verification!//

      //I'll make sure all the h2-titles are on the page!//
    cy.get('h2').contains('Technology and Finance Are No Strangers').should('exist');
    cy.get('h2').contains('Fintech in Latin America Is Booming').should('exist');
    cy.get('h2').contains('The World of Payment Systems').should('exist');
    cy.get('h2').contains('Challenges and Benefits').should('exist');
      //Ending h2-title verification!//

      //I'll make sure the article is written by Sofia Gonzalez//
    cy.get('.author-name [href="https://blankfactor.com/author/sofia-gonzalez/"]').should('exist'); //Checking on the page
    cy.get('.author-name [href="https://blankfactor.com/author/sofia-gonzalez/"]').contains('Sofia Gonzalez'); //Checking it is from Sofia
      //Ending the author verification!//
    //Ending validations that I'm on the correct page!//

    //Subscribing to the newsletter//
    cy.get('input[placeholder="Your email address"]').type('matheusbonavite@gmail.com'); //Typing my personal email
    cy.get('.form-newsletter').submit(); //Submitting the form
    cy.wait(3000); //Waiting three seconds before I check my subscription!
    cy.contains('Thank you for subscribing! Stay tuned.'); //Making sure I did submitted for the newsletter!
    //Ending the subscription to the newsletter//

    //Going back to the blog//
    cy.get('@insights').trigger('mouseover'); //Click on the insights
    cy.get('[href="https://blankfactor.com/insights/blog/"] img').click(); //Click on the blog image!
    //Ending going back to the blog//

    //Getting the articles by related subjects (searching for strings 'Latin', 'America', 'Why', and 'Fintech')
    const alreadyGrabbedArticles = [];

    //Using a for loop to grab all articles (infinite reload of the page, gets more articles!)
    for(let i =0; i < 9; i++){ 
      const relatedSubjects = ['latin', 'america', 'why', 'fintech'];
      cy.get('article h2').each(($item) => {
        if(
          relatedSubjects.filter(val => $item.text().toLowerCase().includes(val)).length > 0 &&
          !Boolean(alreadyGrabbedArticles.find((val) => val === $item.text()))){
          cy.log($item.text());
          alreadyGrabbedArticles.push($item.text());
        }
      })
      cy.scrollTo("bottom", {duration: 1500});
    }
    //Ending getting the articles

  })
})
