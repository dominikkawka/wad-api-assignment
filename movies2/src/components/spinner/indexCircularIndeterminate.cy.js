import React from 'react'
import CircularIndeterminate from './index'

describe('<CircularIndeterminate />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CircularIndeterminate />)
    cy.get('.MuiCircularProgress-svg').should('exist')
  })
})