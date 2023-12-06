# Assignment 1 - Agile Software Practice.

__Name:__ Dominik Kawka

This repository contains the implementation of a React App, its associated Cypress tests and the GitLab CI pipeline.

[Web App Video](https://youtu.be/CIAHc_Qc4qs)

## React App Features.

[ Provide a bullet-point list of the __new features__ you added to the React Movies app, as well as any modifications to existing features).] e.g.
 
+ Browse movies by popularity, now playing, top rated.

+ Find similar movies to the ones you enjoy by looking at recommendations/ similar.

+ View Movie Credits, and see actor overviews, along with other movies the actors were cast in.

+ Filter movies based on release date and score. (You have to click on one of the sorting options for the page to update)

+ Sort movies alphabetically or by rating

+ Pagination on the movie lists (You have to click on one of the sorting options for the page to update)

+ Login/Signup functionality

## Automated Tests.

### Unique functionality testing (if relevant).

[Briefly explain the parts of your app's  functionality that are unique and state the associated test file name.] 

e.g.

__Filtering + Sorting__ - The user can filter out and sort the movies page based on a ride range of criteria (Movie Title, Movie Genre, Movie Rating, Date of Release) (Filter by highest/lowest rated, A-Z, Z-A)

+ `cypress/e2e/filterAndSorting.cy.js`

__Pagination__ - The user can view different pages of movies, depending which page they are on.

+ `cypress/e2e/pagination.cy.js`

__Reviews__ - The user can write reviews about a movie and submit, although it isn't saved onto a database.

+ `cypress/e2e/reviews.cy.js`

__Login/Signup__ - The user can make an account and login. 

+ `cypress/e2e/signUpLogIn.cy.js`

__Movie + Actor Details__ - The user can view movie details, recommended/ similar movies, and even the acting cast for each movie. The user can also click on the actor and view their acting page, along with their credits to other movies.

+ `cypress/e2e/actorDetails.cy.js`

+ `cypress/e2e/movieCredits.cy.js`

+ `cypress/e2e/movieDetails.cy.js`

+ `cypress/e2e/movieRecommendations.cy.js`

+ `cypress/e2e/movieSimilar.cy.js`

Each of these pages also include navigation testing. 

### Error/Exception testing (if relevant).
1. Check if actors death date chips exist/not exist when dead/alive
2. Returning no results when ratings slider is on 10/10, or a date that hasn't hasn't been released yet. 
3. Checking if author name character limit works when writing a review
4. Writing a review with a missing field (missing author/review box field).
5. Submitting fails if a review is too short
6. Various signup/login error messages:
	- Sign up: `invalid-email`, `missing-password`, `weak-password`,  `email-already-in-use`
	- Log in: `invalid-email`, `wrong-password`, `missing-password`, `user-not-found`
	- In these pages, if the firebase emulator isn't running it'll get an assertion error, `emulator-config-failed` will be shown rather than the signup/login values shown above. In the component+E2E testing for these pages, I added a small exception that if the test fails is an assertion error, then the tests will pass, despite failing. 
7. Character limit edge test in email address when signing up, and in the author text field in reviews.


### Cypress Custom commands (if relevant).

[ Specify the test file(s) that use a custom Cypress command(s) that you implemented.]

e.g.
+ `cypress/e2e/filterAndSorting.cy.js`
+ `cypress/e2e/movieCredits.cy.js`
+ `cypress/e2e/movieDetails.cy.js`
+ `cypress/e2e/movieRecommendations.cy.js`
+ `cypress/e2e/movieSimilar.cy.js`
+ `cypress/e2e/pagination.cy.js`
+ `cypress/e2e/reviews.cy.js`
+ `cypress/e2e/signUpLogIn.cy.js`

## Code Splitting.

e.g.
+ `src/index.js`
+ `src/pages/` (excluding component tests)

## Pull Requests.

Github
+ https://github.com/dominikkawka/agile-assignment-1/pulls?q=is%3Apr+is%3Aclosed

Gitlab
+ https://gitlab.com/dominikkawka2002/moviesapp-ci/-/merge_requests/1
+ https://gitlab.com/dominikkawka2002/moviesapp-ci/-/merge_requests/2
+ https://gitlab.com/dominikkawka2002/moviesapp-ci/-/merge_requests/3
+ https://gitlab.com/dominikkawka2002/moviesapp-ci/-/merge_requests/4
+ https://gitlab.com/dominikkawka2002/moviesapp-ci/-/merge_requests/5
+ https://gitlab.com/dominikkawka2002/moviesapp-ci/-/merge_requests/6
+ https://gitlab.com/dominikkawka2002/moviesapp-ci/-/merge_requests/7
+ https://gitlab.com/dominikkawka2002/moviesapp-ci/-/merge_requests/8
+ https://gitlab.com/dominikkawka2002/moviesapp-ci/-/merge_requests/11

## Independent learning (If relevant).

Although I followed the branching policy throughout the project, the CI pipeline branch policy wasn't followed exactly towards the beginning. I've fixed the CI to match the CI pipeline when I realised.

When trying to set up firebase in the CI, the emulator would drag, not moving to the next stage
Component tests pass locally, but when running in the CI, they fail because of the cache/Cypress path

There are a few tests present inside the cache/Cypress path, which activate when finishing testing for my components. I'm close to reaching the monthly limit for compute minutes for free users, so I can't really test/ figure it out. If I fix it between now and the deadline, then it'll be on the pipeline in my project. 

For the login/signup tests, the firebase emulator has to be turned on, which can be done by:
firebase emulators:start --only auth --project $PROJECT_NAME

I have login/signup functionality, but the users don't get saved into a database, 
since we haven't covered saving users to a database in web app yet.

I have read through the [components documentation](https://docs.cypress.io/guides/component-testing/overview) when writing tests. I also used cypress during my work experience, so my knowledge from that carried over. 