import "../support/commands";

let movies;
let movie;

describe("Movie Similar", () => {
   before(() => {
     // Get the discover movies from TMDB and store them locally.
     cy.request(
       `https://api.themoviedb.org/3/movie/popular?api_key=${Cypress.env( 
         "TMDB_KEY"
       )}&language=en-US&include_adult=false&include_video=false&page=1`
     )
       .its("body") // Take the body of HTTP response from TMDB
       .then((response) => {
         movies = response.results;
       });
   });
   beforeEach(() => {
     cy.visit("/movies/popular");
   });

   describe("Movie Similar Page", () => {
      before(() => {
         cy.request(
           `https://api.themoviedb.org/3/movie/${
            movies[0].id
           }/similar?api_key=${Cypress.env("TMDB_KEY")}`
         )
            .its("body")
            .then((movieDetails) => {
            movie = movieDetails;
           });
       });
      beforeEach(() => {
         cy.visit(`movies/${movies[0].id}/similar`); 
      })

      it("Check Movie similar", () => {
         cy.get("h3").contains("Similar Movies");
         cy.get(".MuiCardHeader-root").should("have.length", (movie.results).length);

         cy.get(".MuiCardHeader-content").each(($card, index) => {
            cy.wrap($card).find("p").contains(movie.results[index].title);
         });
      })
      
      it("Check if Movie similar lead to another movie details page", () => {
         let m1 = Math.ceil((movie.results).length/2)
         let m2 = Math.ceil((movie.results).length/3)

         cy.getByTestId("goToMovieDetails").eq(m1).scrollIntoView().click()
         cy.url().should("include", `${movie.results[m1].id}`);
         cy.getByTestId('ArrowBackIcon').click();
         cy.url().should("not.include", `${movie.results[m1].id}`);

         cy.getByTestId("goToMovieDetails").eq(m2).scrollIntoView().click()
         cy.url().should("include", `${movie.results[m2].id}`);
         cy.getByTestId('ArrowBackIcon').click();
         cy.url().should("not.include", `${movie.results[m2].id}`);
      })
   })
})