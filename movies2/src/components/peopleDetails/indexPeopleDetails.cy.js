import React from 'react'
import PeopleDetails from './index'

let credits;

//This test will get an error, the solution for it is here.
//https://www.datainfinities.com/73/cannot-destructure-property-basename-usecontext
//While implementing this fix does make the component test pass, it'll break the app itself.

describe('<PeopleDetails />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<PeopleDetails person={1}/>)

    cy.get('.MuiChip-label').contains("Birthday")
    cy.get('.MuiChip-label').contains("Birthplace")
    cy.get("button").contains("CREDITS")
    cy.get('.MuiChip-label').contains("Deathday").should('not.exist')
  })
})