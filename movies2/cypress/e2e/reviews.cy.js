import "../support/commands";

let movies;

describe("Review tests", () => {
   before(() => {
     // Get the discover movies from TMDB and store them locally.
     cy.request(
       `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env( 
         "TMDB_KEY"
       )}&language=en-US&include_adult=false&include_video=false&page=1`
     )
       .its("body") // Take the body of HTTP response from TMDB
       .then((response) => {
         movies = response.results;
       });
   });
   beforeEach(() => {
     cy.visit("/");
   });

   describe("Adding movies to favorites", () => {
      it("Checking favorites", () => {
        cy.get("button[aria-label='add to favorites']").eq(1).click();
        cy.goToPage("Favorites", "/favorites")
        cy.get(".MuiCardHeader-content").eq(0).find("p").contains(movies[1].title);
      })
      it("Removing from favorites", () => {
        cy.get("button[aria-label='add to favorites']").eq(1).click();
        cy.get("button[aria-label='add to favorites']").eq(3).click();
        cy.goToPage("Favorites", "/favorites")

        cy.getByTestId('DeleteIcon').eq(0).click()
        cy.get(".MuiCardHeader-content").contains(movies[1].title).should('exist')

        cy.goToPage("Home", "/")
        cy.wait(100)
        cy.goToPage("Favorites", "/favorites")
        cy.get(".MuiCardHeader-content").contains(movies[1].title).should('not.exist')
      })
   })

    describe("Writing a review", () => {
    let review = "This is a test review. Hope you enjoy this review!"
    let authorEdgeName = "This is a really long name of an author"

    beforeEach(() => {
      cy.get("button[aria-label='add to favorites']").eq(1).click();
      cy.goToPage("Favorites", "/favorites")
      cy.getByTestId('RateReviewIcon').click()
    })

    it("Resetting the form", () => {
      cy.get('input[id="author"]').click().type("Author")
      cy.get('textarea[id="review"]').click().type("Review")
      cy.btnClick("Reset")
      cy.get('input[id="author"]').should('be.empty')
      cy.get('textarea[id="review"]').should('be.empty')
    })

    it("Rating dropdown", () => {
      cy.ratingsDropdown("Good")
      cy.ratingsDropdown("Excellent")
      cy.ratingsDropdown("Poor")
      cy.ratingsDropdown("Terrible")
      cy.ratingsDropdown("Average")
    })

    it("Successful submission", () => {
      cy.get('input[id="author"]').click().type("Author")
      cy.get('textarea[id="review"]').click().type(review)
      cy.ratingsDropdown("Good")
      cy.btnClick("Submit")

      cy.get(".MuiAlert-message").contains("Thank you for submitting a review")
      cy.getByTestId('CloseIcon').click()
      cy.url().should("include", "/favorites");
    })

    describe("Failing submissions", () => {

      it("Missing authors + review text", () => {
        cy.btnClick("Submit")
        cy.get(".MuiTypography-root").contains("Name is required").scrollIntoView()
        cy.get(".MuiTypography-root").contains("Review cannot be empty").scrollIntoView()
      })

      it("Missing only review text", () => {
        cy.get('input[id="author"]').click().type("Author")
        cy.btnClick("Submit")

        cy.missingReviewText()
      })

      it("Missing only author text", () => {
        cy.get('textarea[id="review"]').click().type(review)
        cy.btnClick("Submit")

        cy.missingAuthorText()
      })

      it("Review text is too short", () => {
        cy.get('input[id="author"]').click().type("Author")
        cy.get('textarea[id="review"]').click().type("Review")
        cy.btnClick("Submit")

        cy.shortReviewText()
      })

      it("Author name character limit", () => {
        cy.get('input[id="author"]').click().type(authorEdgeName)
        cy.get('input[id="author"]').should('not.contain', authorEdgeName)
      })
    })
  })
})