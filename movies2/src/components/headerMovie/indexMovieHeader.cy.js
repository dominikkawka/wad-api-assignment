import React from 'react'
import MovieHeader from './index'

describe('<MovieHeader />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<MovieHeader movie={3}/>)

    cy.getByTestId("ArrowBackIcon").click()
    cy.getByTestId("ArrowForwardIcon").click()
    cy.getByTestId("HomeIcon").click()
  })
})