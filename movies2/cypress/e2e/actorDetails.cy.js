import "../support/commands";

let id = 3084
let person;

describe("Actor Details", () => {
   // TODO: GET PROPER API CALL... /person/${id} returns undefined, although it works fine in src/api/tmdb-api.js... 
   beforeEach(() => {
     cy.visit(`/person/${id}`);
   });
    
   describe("Looking at actor details", () => {

      it("General Actor information", () => {
         //cy.get('h3').contains(`${credits.cast[0].name}`);
         //cy.get('h3').contains(`${credits.cast[0].known_for_department}`);

         cy.get('.MuiChip-label').contains("Birthday")
         //cy.get('.MuiChip-label').contains(`${credits.cast[0].birthday}`)

         cy.get('.MuiChip-label').contains("Birthplace")
         //cy.get('.MuiChip-label').contains(`${credits.cast[0].place_of_birth}`)

         cy.get("button").contains("CREDITS")

      })
      it("Dead actor", () => {
         cy.get('.MuiChip-label').contains("Deathday").should('exist')
      })
      it("Actor actor", () => {
         cy.visit(`/person/3`) // Harrison Ford
         cy.get('.MuiChip-label').contains("Deathday").should('not.exist')
      })
   })
})