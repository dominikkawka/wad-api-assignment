import "../support/commands";

let topRated;
let topRated2;
let topRated3;

describe("Page Pagination", () => {
   before(() => {
     cy.request(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${Cypress.env( 
         "TMDB_KEY"
       )}&language=en-US&include_adult=false&include_video=false&page=1`
      )
       .its("body")
       .then((response) => {
         topRated = response.results;
       });

      cy.request(
         `https://api.themoviedb.org/3/movie/top_rated?api_key=${Cypress.env( 
            "TMDB_KEY"
          )}&language=en-US&include_adult=false&include_video=false&page=2`
      )
      .its("body")
      .then((response) => {
         topRated2 = response.results;
      });

      cy.request(
         `https://api.themoviedb.org/3/movie/top_rated?api_key=${Cypress.env( 
            "TMDB_KEY"
          )}&language=en-US&include_adult=false&include_video=false&page=3`
         )
         .its("body")
         .then((response) => {
            topRated3 = response.results;
         });
   });
   beforeEach(() => {
     cy.visit("/movies/top_rated");
   })

   it("Switch to another page", () => {
      cy.get(".MuiCardHeader-content").each(($card, index) => {
         cy.wrap($card).find("p").contains(topRated[index].title);
      });

      cy.get("[aria-label='Go to page 2']").click().scrollIntoView()
      cy.wait(100)
      cy.btnClick("Default")

      cy.get(".MuiCardHeader-content").each(($card, index) => {
         cy.wrap($card).find("p").contains(topRated2[index].title);
      });

      cy.get("[aria-label='Go to page 3']").click().scrollIntoView()
      cy.wait(100)
      cy.btnClick("Default")

      cy.get(".MuiCardHeader-content").each(($card, index) => {
         cy.wrap($card).find("p").contains(topRated3[index].title);
      });
   })
})