import React from 'react'
import PeopleHeader from './index'

describe('<PeopleHeader />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<PeopleHeader people={3}/>)

    cy.getByTestId("ArrowBackIcon").click()
    cy.getByTestId("ArrowForwardIcon").click()
  })
})