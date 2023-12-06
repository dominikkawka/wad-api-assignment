import React from 'react'
import FilterCreditsCard from './index'

import "../../../cypress/support/commands"
import "../../../cypress/support/component"

describe('<FilterCreditsCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<FilterCreditsCard />)

    //cy.get("#filled-search").clear().type("m")

    cy.get("#involved-select").click();
    //cy.get("li").contains("Cast").click();
  })
})