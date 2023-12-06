import { 
  filterByGenre, filterByTitle, filterByYear, filterByRating, 
  sortDefault, sortAtoZ, sortZtoA, sortHighestRated, sortLowestRated
} from "../support/e2e";
import "../support/commands";

let movies; // List of Discover movies from TMDB


describe("Filtering and Sorting", () => {
  before(() => {
    // Get movies from TMDB and store them locally.
    cy.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body")
      .then((response) => {
        movies = response.results;
      });
  });
  beforeEach(() => {
    cy.visit("/");
  });

  describe("movie filters", () => {
    describe("filter by title", () => {
      it("filter with part of title", () => {
        cy.get("#filled-search").clear().type("m")
        cy.btnClick("Default")

        let result = filterByTitle(movies, "m")
        cy.get(".MuiCardHeader-content").should("have.length",result.length);
      })
      it("filter with specific title", () => {
        cy.get("#filled-search").clear().type(movies[0].title)
        cy.btnClick("Default")

        cy.get(".MuiCardHeader-content").should("have.length",1)

      })
      it("filter with no result", () => {
        cy.get("#filled-search").clear().type("A movie that doesn't exist.");
        cy.btnClick("Default")

        cy.get(".MuiCardHeader-content").should("have.length", 0);
      })
    });
    it("filter by genre", () => {
      let selectedGenreId = 18;
      let selectedGenreText = "Drama";
      let result = filterByGenre(movies, selectedGenreId);
      cy.get("#genre-select").click();
      cy.get("li").contains(selectedGenreText).click();
      cy.btnClick("Default")

      cy.get(".MuiCardHeader-content").should("have.length",result.length);
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(result[index].title);
      });
    });
    describe("filter by date/year", () => {
      it("filter by year", () => {
        cy.get("#filled-year-search").click().type("2023")
        cy.btnClick("Default")

        let result = filterByYear(movies, "2023")
        cy.get(".MuiCardHeader-content").should("have.length",result.length);
        cy.get(".MuiCardHeader-content").each(($card, index) => {
          cy.wrap($card).find("p").contains(result[index].title);
        });

      })
      it("filter by specific date", () => {
        cy.get("#filled-year-search").click().type(movies[0].release_date)
        cy.btnClick("Default")

        cy.get(".MuiCardHeader-content").should("have.length", 1);
        cy.get(".MuiCardHeader-content").contains(movies[0].title);
      })
      it("filter by non-existant date", () => {
        cy.get("#filled-year-search").click().type("2034")
        cy.btnClick("Default")

        cy.get(".MuiCardHeader-content").should("have.length", 0);
      })
    });
    it("filter by rating", () => {
      cy.get('[id=ratings-slider]').click(175, 20) // 7.5* rating
      cy.btnClick("Default")
      let result = filterByRating(movies, 7.5)
      cy.get(".MuiCardHeader-content").should("have.length", result.length);

      cy.get('[id=ratings-slider]').click(75, 20) // 3.5* rating
      cy.btnClick("Default")
      let result2 = filterByRating(movies, 3.5)
      cy.get(".MuiCardHeader-content").should("have.length", result2.length);
    });
    it("filter by rating edge cases", () => {
      cy.get('[id=ratings-slider]').click(250, 20) // 10* rating
      cy.btnClick("Default")
      let result = filterByRating(movies, 10)
      cy.get(".MuiCardHeader-content").should("have.length", result.length);

      cy.get('[id=ratings-slider]').click(0, 20) // 0* rating
      cy.btnClick("Default")
      let result2 = filterByRating(movies, 0)
      cy.get(".MuiCardHeader-content").should("have.length", result2.length);
    })
    it("using multiple filters at once", () => {
      cy.get("#filled-search").clear().type("m")
      cy.get("#genre-select").click();
      cy.get("li").contains("Action").click();
      cy.get("#filled-year-search").click().type("2023")
      cy.get('[id=ratings-slider]').click(125, 20) // 5.5* rating
      cy.btnClick("Default").scrollIntoView()

      let res1 = filterByTitle(movies, "m")
      let res2 = filterByGenre(res1, 28)
      let res3 = filterByYear(res2, "2023")
      let res4 = filterByRating(res3, 5.5)

      cy.get(".MuiCardHeader-content").should("have.length", res4.length);
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(res4[index].title);
      });
    });
  });

  describe("movie sorting", () => {
    it("Default filtering", () => {
      cy.btnClick("Default").scrollIntoView()
      let sorted = sortDefault(movies)
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(sorted[index].title);
      });
    })
    it("Lowest->Highest filtering", () => {
      cy.btnClick("Lowest").scrollIntoView()
      let sorted = sortLowestRated(movies)
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(sorted[index].title);
      });
    });
    it("Highest->Lowest filtering", () => {
      cy.btnClick("Highest").scrollIntoView()
      let sorted = sortHighestRated(movies)
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(sorted[index].title);
      });
    });
    it("A to Z filtering", () => {
      cy.btnClick("A-Z").scrollIntoView()
      let sorted = sortAtoZ(movies)
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(sorted[index].title);
      });
    });
    it("Z to A filtering", () => {
      cy.btnClick("Z-A").scrollIntoView()
      let sorted = sortZtoA(movies)
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(sorted[index].title);
      });
    });
  });

  describe("combining sorting and filter options", () => {
    it("combining sorting and filter options", () => {
      cy.get("#filled-search").clear().type("m")
      cy.get("#genre-select").click();
      cy.get("li").contains("Action").click();
      cy.get("#filled-year-search").click().type("2023")
      cy.get('[id=ratings-slider]').click(125, 20) // 5.5* rating
      cy.btnClick("Z-A").scrollIntoView()
  
      let res1 = filterByTitle(movies, "m")
      let res2 = filterByGenre(res1, 28)
      let res3 = filterByYear(res2, "2023")
      let res4 = filterByRating(res3, 5.5)
      let res5 = sortZtoA(res4)
  
      cy.get(".MuiCardHeader-content").should("have.length", res4.length);
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(res5[index].title);
      });
    })
  });
});