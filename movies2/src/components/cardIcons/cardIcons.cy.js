import React from 'react'
import AddToFavoritesIcon from './addToFavorites'
import AddToWatchIcon from './addToWatch'
import RemoveFromFavoritesIcon from './removeFromFavorites'
import WriteReviewIcon from './writeReview'

describe('<AddToFavoritesIcon />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AddToFavoritesIcon />)
  })
})

describe('<AddToWatchIcon />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AddToWatchIcon />)
  })
})

describe('<RemoveFromFavoritesIcon />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<RemoveFromFavoritesIcon />)
  })
})

//This test will get an error, the solution for it is here.
//https://www.datainfinities.com/73/cannot-destructure-property-basename-usecontext
//While implementing this fix does make the component test pass, it'll break the app itself.
describe('<WriteReviewIcon />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<WriteReviewIcon movie={0}/>)
  })
})