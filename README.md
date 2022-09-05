# About the repo ✨
The repo is dedicated to show the automation of a web application with Cypress. 

Such application was modelled by the Blankfactor dev team, I took the liberty of modelling the system using Next.js and PostgreSQL, further automating it with Cypress.

Later, I also performed an automation task with Cypress on the Blankfactor webpage.

# Usage ⚙️
To run the Cypress automated tests you must first initialize the Next.js application and the database! Will do that step-by-step (starting with the database).

## Initializing PostgreSQL

Just so you don't have to install PostgreSQL and create a new database, I have created the 'database' folder. Go inside that folder and run the 'runner.sh' shell script:

```bash
cd database
chmod +x ./runner.sh #Have the right permissions to run
./runner.sh
```

It is important to have docker installed! The 'runner' shell script will create a docker image based on the Dockerfile (that will simply create a PostgreSQL image, give it a password and create the user_info table on the postgres defaault database).
And also run a container with that image exposing the port 5432 of the container (and binding that port with your machine, so remember to set it free!).

With that, a simple postgres default database is running with the user_info table! That was created with the query:

```sql
CREATE TABLE user_info (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(10) UNIQUE,
    user_password CHAR(6)
);
```
According to the specifications of the Blankfactor team.

## Initializing Next.js

To initialize the Next.js application just go to the website folder, npm install the dependencies of the project and run a development environment. All of this can be done with:

```bash
cd website
npm i
npm run dev
```

The application will be running on your machine at port 3000 (so you also better have it free!).

# Test and Automation with Cypress 🧪

## First Part
Now that both the database and the Next.js applications are running, on ports 5432 and 3000 respectively, we can do our testing and automation with Cypress.

To test the Next.js application, that mimics the software requirements specification (SRS) given in the PDF file, we must go inside website and open Cypress, just like:

```bash
cd website
npm run cypress:open
```

After that, choose the Google Chrome option and run the test cases for the application! 

The tests are focused on testing the major features of the application:
- Adding users and Deleting users (on the List Users page)
- Checking if the cookies work properly (to maintain the state of the logged users)
- Checking if wrong inputs would break the application

The application is NOT intended to look pretty, it was more focused on being "testable".

Also, the only feature that was on the SRS and it was not implemented was the Idle time function. This decision was made because testing such feature is not that complex in Cypress, so I've decided to deliver the solutions faster.
To test such feature in Cypress what could've been done was:

```javascript
cy.wait(2000); //Amount of time in milliseconds
cy.url().should('eq','https://localhost:3000/'); //Should go back, because it was idle for the amount of time in the wait.
```
This part covers the first assignment given on the SRS. 

Here is an example of the tests running:


![Cypress running smooth, first part.](https://github.com/MatheusBonavite/automation-test/blob/main/gifs/ezgif-3-8f0511c064.gif)

An alternative to the open command would be running 'npm run cypress:run', which will give you the output:

```
       Spec                                              Tests  Passing  Failing  Pending  Skipped  
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ ✔  choose-function-basic-functionality      00:15        5        5        -        -        - │
  │    .cy.ts                                                                                      │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ ✔  form-submit-right.cy.ts                  00:18        6        6        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ ✔  form-submit-wrong.cy.ts                  00:05        6        6        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ ✔  loading-the-page.cy.ts                   787ms        2        2        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ ✔  test-text-input-wrong.cy.ts              00:07        9        9        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ ✖  list-users-add-user.cy.ts                00:09        3        2        1        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ ✔  list-users-basic-functionality.cy.t      00:04        3        3        -        -        - │
  │    s                                                                                           │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ ✔  list-users-delete-user.cy.ts             00:01        1        1        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    ✖  1 of 8 failed (13%)                      01:03       35       34        1        -        -  
```

## Second Part

For the second part things are a little bit easier (hoooray ✨).

All you got to do is go to the blankfactor-automation folder, install the dependencies (such as Cypress itself) and then hit cypress:open. Then the steps are similar for the first part. The commands are:

```bash
cd blankfactor-automation
npm i
npm run cypress:open
```
There is only one automated test that will perform all that is required for the second part of the assignment. 

An example of that part running: 


