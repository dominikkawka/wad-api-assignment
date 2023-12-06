// Parent commands

Cypress.Commands.add("goToPage", (pageName, directory) => {
   cy.get("button").contains(pageName).click();
   cy.url().should("include", directory);
})

Cypress.Commands.add("getByTestId", (id) => {
   cy.get(`[data-testid=${id}]`)
})

Cypress.Commands.add("btnClick", (text) => {
   cy.get("button").contains(text).click();
})
//These commands exist so that reviews.cy.js is easier to read.
Cypress.Commands.add("missingAuthorText", () => {
   cy.get(".MuiTypography-root").contains("Name is required").scrollIntoView()
   cy.get(".MuiTypography-root").contains("Review cannot be empty").should('not.exist')
   cy.get(".MuiTypography-root").contains("Review is too short").should('not.exist')
})

Cypress.Commands.add("missingReviewText", () => {
   cy.get(".MuiTypography-root").contains("Review cannot be empty").scrollIntoView()
   cy.get(".MuiTypography-root").contains("Name is required").should('not.exist')
   cy.get(".MuiTypography-root").contains("Review is too short").should('not.exist')
})

Cypress.Commands.add("shortReviewText", () => {
   cy.get(".MuiTypography-root").contains("Review is too short").scrollIntoView()
   cy.get(".MuiTypography-root").contains("Review cannot be empty").should('not.exist')
   cy.get(".MuiTypography-root").contains("Name is required").should('not.exist')
})

Cypress.Commands.add("ratingsDropdown", (score) => {
   cy.get(".MuiSelect-select").click()
   cy.get(".MuiButtonBase-root").contains(score).click()
   cy.get(".MuiSelect-select").contains(score)
})

Cypress.Commands.add("typeEmail", (text) => {
   cy.get("#email").click().clear().type(text)
})

Cypress.Commands.add("typePassword", (text) => {
   cy.get("#password").click().clear().type(text)
})

Cypress.Commands.add("isFirebaseUp", (auth) => {
   Cypress.on("fail", (e, runnable) => {
      //console.log("error", e);
      //console.log("runnable", runnable);
      //console.log("message", e.message);
      if ( e.name === "AssertionError" &&
      e.message.includes(`Timed out retrying after 4000ms: Expected to find content: '${auth}' within the element: <p#authText> but never did.`)) 
      {
      throw cy.getByTestId("authText").contains(auth);
      } })
})

// Child commands

// Dual commands

// Overwrite commands