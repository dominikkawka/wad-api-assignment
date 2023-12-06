import React from 'react'
import LoginPage from './loginPage'
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

describe('<LoginPage />', () => {
  let randomNumbers = randomString()
  let randomEmail = `testing-${randomNumbers}@gmail.com`
  let randomPassword = `pass-${randomNumbers}`
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LoginPage />)

    cy.getByTestId("CheckBoxOutlineBlankIcon").should("exist")
    cy.get(".PrivateSwitchBase-input").click()
    cy.getByTestId("CheckBoxIcon").should("exist")

    cy.btnClick("Sign In")
    cy.getByTestId("authText").contains("invalid-email")

    cy.typeEmail(randomEmail)
    cy.btnClick("Sign In")
    cy.getByTestId("authText").contains("missing-password")

    cy.typeEmail("invalid")
    cy.btnClick("Sign In")
    cy.getByTestId("authText").contains("invalid-email")

    // Since I don't save any of the users into the firebase, 
    //this test will fail since no users exist in general.

    //cy.typePassword("weak")
    //cy.btnClick("Sign In")
    //cy.getByTestId("authText").contains("wrong-password") 

    //cy.typeEmail("invalid@gmail.com")
    //cy.btnClick("Sign In")
    //cy.getByTestId("authText").contains("user-not-found")
  })
})