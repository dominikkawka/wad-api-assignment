import "../support/commands";
import { randomString } from "../support/e2e";

describe("Signing up and Logging in", () => {
   let randomNumbers = randomString()
   let randomEmail = `testing-${randomNumbers}@gmail.com`
   let randomPassword = `pass-${randomNumbers}`
   beforeEach(() => {
      cy.visit("/login")
      cy.getByTestId("authText").should("not.exist")
   }) 
   
   Cypress.on('fail', (err, runnable) => {
      if (err.name === "AssertionError") {
         return false;
      } else {
         return true
      }
    }); 
    
   
   describe("Create account tests", () => {
      beforeEach(() => {
         cy.get(".MuiTypography-root").contains("Sign Up").click()
         cy.url().should("include", "signup")
      })
      it("Failing to make account", () => {
         cy.btnClick("Create Account")
         cy.getByTestId("authText").contains("invalid-email")
         //If firebase is down, these tests will fail when ln13-20 is commented out
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
      })
      it("edge case - character limit in email address", () => {
         let letter = "a"
         let ltr = letter.repeat(64)
         cy.typeEmail(`${ltr}@gmail.com`)
         cy.typePassword(randomPassword)
         cy.btnClick("Create Account")
      
         cy.get("#email").should('not.contain', '@gmail.com')
         cy.getByTestId("authText").contains("invalid-email")
      })
      it("Account created", () => {
         cy.typeEmail(randomEmail)
         cy.typePassword(randomPassword)
         cy.btnClick("Create Account")
         cy.getByTestId("authText").contains(`Account created! welcome ${randomEmail}`)

         cy.typeEmail(randomEmail)
         cy.typePassword(randomPassword)
         cy.btnClick("Create Account")
         cy.getByTestId("authText").contains("email-already-in-use")
      })
   })

   //These tests fail if you skip the signup
   describe("Login tests", () => {
      it("Failing to login", () => {
         cy.btnClick("Sign In")
         cy.getByTestId("authText").contains("invalid-email")

         cy.typeEmail(randomEmail)
         cy.btnClick("Sign In")
         cy.getByTestId("authText").contains("missing-password")

         cy.typePassword("weak")
         cy.btnClick("Sign In")
         cy.getByTestId("authText").contains("wrong-password") 

         cy.typeEmail("invalid")
         cy.btnClick("Sign In")
         cy.getByTestId("authText").contains("invalid-email")

         cy.typeEmail("invalid@gmail.com")
         cy.btnClick("Sign In")
         cy.getByTestId("authText").contains("user-not-found")
      })
      it("edge case - character limit in email address", () => {
         let letter = "a"
         let ltr = letter.repeat(64)
         cy.typeEmail(`${ltr}@gmail.com`)
         cy.typePassword(randomPassword)
         cy.btnClick("Sign In")
      
         cy.get("#email").should('not.contain', '@gmail.com')
         cy.getByTestId("authText").contains("invalid-email")
      })
      it("Successful login", () => {
         cy.typeEmail(randomEmail)
         cy.typePassword(randomPassword)
         cy.btnClick("Sign In")
         cy.getByTestId("authText").contains(`Welcome ${randomEmail}`)
      })
   })

   describe("Remember me box working", () => {
      it("signup page", () => {
         cy.get(".MuiTypography-root").contains("Sign Up").click()
         cy.url().should("include", "signup")

         cy.getByTestId("CheckBoxOutlineBlankIcon").should("exist")
         cy.get(".PrivateSwitchBase-input").click()
         cy.getByTestId("CheckBoxOutlineBlankIcon").should("not.exist")

         cy.getByTestId("CheckBoxIcon").should("exist")
         cy.get(".PrivateSwitchBase-input").click()
         cy.getByTestId("CheckBoxIcon").should("not.exist")
      })
      it("login page", () => {
         cy.getByTestId("CheckBoxOutlineBlankIcon").should("exist")
         cy.get(".PrivateSwitchBase-input").click()
         cy.getByTestId("CheckBoxOutlineBlankIcon").should("not.exist")

         cy.getByTestId("CheckBoxIcon").should("exist")
         cy.get(".PrivateSwitchBase-input").click()
         cy.getByTestId("CheckBoxIcon").should("not.exist")
      })
   })
})