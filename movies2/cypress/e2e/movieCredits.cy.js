import "../support/commands";

let movies;
let credits;

describe("Movie Credits", () => {
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

   describe("Movie Credits Page", () => {
      before(() => {
         cy.request(
           `https://api.themoviedb.org/3/movie/${
            movies[0].id
           }/credits?api_key=${Cypress.env("TMDB_KEY")}`
         )
            .its("body")
            .then((creditDetails) => {
            credits = creditDetails;
           });
       });
      beforeEach(() => {
         cy.visit(`movies/${movies[0].id}/credits`); 
      })

      it("Check Movie Credits", () => {
         cy.get("h3").contains("Movie Cast");
         cy.get(".MuiCardHeader-root").should("have.length", (credits.cast).length);

         cy.get(".MuiCardHeader-content").each(($card, index) => {
            cy.wrap($card).find("p").contains(credits.cast[index].character);
         });
      })
      
      it("Check if Movie credits lead to an actors page", () => {
         let c1 = Math.ceil((credits.cast).length/2)
         let c2 = Math.ceil((credits.cast).length/3)

         cy.getByTestId("goToPersonDetails").eq(c1).scrollIntoView().click()
         cy.url().should("include", `${credits.cast[c1].id}`);
         cy.getByTestId('ArrowBackIcon').click();
         cy.url().should("not.include", `${credits.cast[c1].id}`);

         cy.getByTestId("goToPersonDetails").eq(c2).scrollIntoView().click()
         cy.url().should("include", `${credits.cast[c2].id}`);
         cy.getByTestId('ArrowBackIcon').click();
         cy.url().should("not.include", `${credits.cast[c2].id}`);
      })
   })
})