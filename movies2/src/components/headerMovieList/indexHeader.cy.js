import React from 'react'
import Header from './index'

describe('<Header />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Header />)

    cy.getByTestId("ArrowBackIcon").click()
    cy.getByTestId("ArrowForwardIcon").click()
  })
})