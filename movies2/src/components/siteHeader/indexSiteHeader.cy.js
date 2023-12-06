import React from 'react'
import SiteHeader from './index'

import "../../../cypress/support/commands"
import "../../../cypress/support/component"

describe('<SiteHeader />', () => {
  it('renders with dropdown', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SiteHeader />)
    cy.getByTestId("MenuIcon").click()

    cy.get(".MuiButtonBase-root").contains("Home").click()
    cy.get(".MuiButtonBase-root").contains("Favorites").click()
    cy.get(".MuiButtonBase-root").contains("Upcoming").click()
    cy.get(".MuiButtonBase-root").contains("Now Playing").click()
    cy.get(".MuiButtonBase-root").contains("Top Rated").click()
    cy.get(".MuiButtonBase-root").contains("Popular").click()
    cy.get(".MuiButtonBase-root").contains("Log in").click()
  })

  it('renders with buttons', () => {
    cy.viewport(1200, 100)
    cy.mount(<SiteHeader />)

    cy.btnClick("Home")
    cy.btnClick("Favorites")
    cy.btnClick("Upcoming")
    cy.btnClick("Now Playing")
    cy.btnClick("Top Rated")
    cy.btnClick("Popular")
    cy.btnClick("Log in")
  })
})