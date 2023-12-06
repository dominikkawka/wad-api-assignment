import React from 'react'
import MovieReview from './index'

describe('<MovieReview />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<MovieReview review={2}/>)
  })
})