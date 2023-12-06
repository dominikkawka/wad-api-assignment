import React from 'react'
import MovieCreditsCard from './index'

let credits;

describe('<MovieCreditsCard />', () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/movie/
       111
      /credits?api_key=${Cypress.env("TMDB_KEY")}`
    )
       .its("body")
       .then((creditDetails) => {
       credits = creditDetails;
      });
  });
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<MovieCreditsCard credit={credits.cast[0]}/>)

    cy.get(".MuiTypography-root").contains(credits.cast[0].character)
    cy.get(".MuiTypography-root").contains(credits.cast[0].name)
    cy.get(".MuiTypography-root").contains(credits.cast[0].known_for_department)
  })
})