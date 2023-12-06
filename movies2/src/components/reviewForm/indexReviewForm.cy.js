import React from 'react'
import ReviewForm from './index'

import { MemoryRouter } from 'react-router-dom'

describe('<ReviewForm />', () => {
  beforeEach(() => {
    cy.mount(<ReviewForm movie={10}/>)
  })

  describe("Writing a review", () => {
    let review = "This is a test review. Hope you enjoy this review!"
    let authorEdgeName = "This is a really long name of an author"

    it("Resetting the form", () => {
      cy.get('input[id="author"]').click().type("Author")
      cy.get('textarea[id="review"]').click().type("Review")
    })

    it("Rating dropdown", () => {
      cy.ratingsDropdown("Good")
      cy.ratingsDropdown("Excellent")
      cy.ratingsDropdown("Poor")
      cy.ratingsDropdown("Terrible")
      cy.ratingsDropdown("Average")
    })

    describe("Failing submissions", () => {

      it("Missing authors + review text", () => {
        cy.btnClick("Submit")
        cy.get(".MuiTypography-root").contains("Name is required").scrollIntoView()
        cy.get(".MuiTypography-root").contains("Review cannot be empty").scrollIntoView()
      })

      it("Missing only review text", () => {
        cy.get('input[id="author"]').click().type("Author")
        cy.btnClick("Submit")

        cy.missingReviewText()
      })

      it("Missing only author text", () => {
        cy.get('textarea[id="review"]').click().type(review)
        cy.btnClick("Submit")

        cy.missingAuthorText()
      })

      it("Review text is too short", () => {
        cy.get('input[id="author"]').click().type("Author")
        cy.get('textarea[id="review"]').click().type("Review")
        cy.btnClick("Submit")

        cy.shortReviewText()
      })

      it("Author name character limit", () => {
        cy.get('input[id="author"]').click().type(authorEdgeName)
        cy.get('input[id="author"]').should('not.contain', authorEdgeName)
      })
    })
  })
})