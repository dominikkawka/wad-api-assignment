import React from 'react'
import CreateAccountPage from './createAccountPage'
import '../../cypress/support/commands'
import '../../cypress/support/component'
import { randomString } from "../../cypress/support/e2e";

Cypress.on('fail', (err, runnable) => {
  if (err.name === "AssertionError") {
     cy.getByTestId("authText").contains("|||")
     return false;
  } else {
     return true
  }
}); 


describe('<CreateAccountPage />', () => {
  let randomNumbers = randomString()
  let randomEmail = `testing-${randomNumbers}@gmail.com`
  let randomPassword = `pass-${randomNumbers}`
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CreateAccountPage />)

    cy.btnClick("Create Account")
    cy.getByTestId("authText").contains("invalid-email")
    //If firebase is down, these tests will fail.
    //To start firebase, write `firebase emulators:start --only auth --project $FIREBASE_PROJECT_ID`
    cy.isFirebaseUp("invalid-email")

    cy.typeEmail(randomEmail)
    cy.btnClick("Create Account")
    cy.getByTestId("authText").contains("missing-password")

    cy.typePassword("weak")
    cy.btnClick("Create Account")
    cy.getByTestId("authText").contains("weak-password")   
    
    cy.typeEmail("invalid")
    cy.typePassword("weak")
    cy.btnClick("Create Account")
    cy.getByTestId("authText").contains("invalid-email")

    cy.typeEmail("invalid")
    cy.typePassword(randomPassword)
    cy.btnClick("Create Account")
    cy.getByTestId("authText").contains("invalid-email")

    let letter = "a"
    let ltr = letter.repeat(64)
    cy.typeEmail(`${ltr}@gmail.com`)
    cy.typePassword(randomPassword)
    cy.btnClick("Create Account")
      
    cy.get("#email").should('not.contain', '@gmail.com')
    cy.getByTestId("authText").contains("invalid-email")

    cy.typeEmail(randomEmail)
    cy.typePassword(randomPassword)
    cy.btnClick("Create Account")
    cy.getByTestId("authText").contains(`Account created! welcome ${randomEmail}`)

    cy.typeEmail(randomEmail)
    cy.typePassword(randomPassword)
    cy.btnClick("Create Account")
    cy.getByTestId("authText").contains("email-already-in-use")

    cy.getByTestId("CheckBoxOutlineBlankIcon").should("exist")
    cy.get(".PrivateSwitchBase-input").click()
    cy.getByTestId("CheckBoxIcon").should("exist")
  })
})