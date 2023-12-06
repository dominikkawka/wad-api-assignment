import "../support/commands";
import { getRevenue } from "../support/e2e";

let movies;
let movie;

describe("Movie Details", () => {
   before(() => {
     // Get the discover movies from TMDB and store them locally.
     cy.request(
       `https://api.themoviedb.org/3/movie/top_rated?api_key=${Cypress.env( 
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

   describe("Movie Details page", () => {
      before(() => {
         cy.request(
           `https://api.themoviedb.org/3/movie/${
             movies[0].id
           }?api_key=${Cypress.env("TMDB_KEY")}`
         )
           .its("body")
           .then((movieDetails) => {
             movie = movieDetails;
           });
       });
      beforeEach(() => {
         cy.visit(`movies/${movies[0].id}`); //The Godfather
      });

      describe("Navigation to other pages", () => {
         it("Navigation between recommendations, similar, credits", () => {
            cy.goToPage("RECOMMENDATIONS", `/movies/${movies[0].id}/recommendations`)
            cy.get("h3").contains("Recommended Movies");
            cy.getByTestId('ArrowBackIcon').click();
            cy.url().should("not.include", `recommendations`);
   
            cy.goToPage("SIMILAR", `/movies/${movies[0].id}/similar`)
            cy.get("h3").contains("Similar Movies");
            cy.getByTestId('ArrowBackIcon').click();
            cy.url().should("not.include", `similar`);
   
            cy.goToPage("CREDITS", `/movies/${movies[0].id}/credits`)
            cy.get("h3").contains("Movie Cast");
            cy.getByTestId('ArrowBackIcon').click();
            cy.url().should("not.include", `credits`);
         })

         it("Navigation to review", () => {
            cy.getByTestId('NavigationIcon').click();
            cy.get(".MuiPaper-root").should("exist");
            cy.get('[id="fullReview"]').first().contains("Full Review").click();

            cy.get('h3').contains(`${movies[0].title}`)
            cy.get('h3').contains(`Review By:`)
            cy.getByTestId('ArrowBackIcon').click();
            cy.url().should("not.include", `reviews`);
         })
      })

      describe("Movie details contents", () => {
         it("Checking movie details contents", () => {
            cy.get('h3').contains(`${movies[0].title}`);
            cy.get('p').contains(`${movie.overview}`);
            
            cy.get('.MuiChip-label').contains("Genres")
            cy.get('.MuiChip-label').contains(`${movie.genres[0].name}`)

            cy.get('.MuiChip-label').contains(`${movie.runtime}`)
            let rev = getRevenue(`${movie.revenue}`)
            cy.get('.MuiChip-label').contains(`${rev}`)
            cy.get('.MuiChip-label').contains(`${movie.vote_average}`)
            cy.get('.MuiChip-label').contains(`${movie.vote_count}`)
            cy.get('.MuiChip-label').contains(`${movie.release_date}`)

            cy.get('.MuiChip-label').contains("Production Countries")
            cy.get('.MuiChip-label').contains(`${movie.production_countries[0].name}`)

            cy.get("button").contains("RECOMMENDATIONS")
            cy.get("button").contains("SIMILAR")
            cy.get("button").contains("CREDITS")
         })
      })
   })
}) 