# Assignment 2 - Web API.

Name: Dominik Kawka
(Demo Video)[https://youtu.be/24ychI0-MIM]

## Features.

A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** (or modifications to existing features)

 + `/tmdb/movie/:id`: Get movie by id
 + `/tmdb/movieImages/:id`: Get movie images
 + `/tmdb/movieReviews/:id`: Get movie reviews
 + `/tmdb/movie/:id/recommendations`: Get movie recommendations
 + `/tmdb/movie/:id/similar`: Get similar movie 
 + `/tmdb/discover/:page`: Gets discover page
 + `/tmdb/popular/:page`: Gets popular releases
 + `/tmdb/topRated/:page`: Gets top rated releases
 + `/tmdb/upcoming/:page`: Gets upcoming releases
 + `/tmdb/nowPlaying/:page`: Gets movies currently playing
 + `/tmdb/movie/:id/credits`: Get movie credits
 + `/tmdb/person/:id`: Get person id
 + `/tmdb/person/:id/credits`: Get person credits
 + `/tmdb/movie/:id/reviews`: get movie reviews from TMDB
 + `reviews`: get/post reviews from/to database
 + `reviews/:reviewId`: Delete certain review
 + `reviews/:movieId`: get reviews for certain movie

## Setup requirements.

[ Outline any non-standard setup steps necessary to run your app locally after cloning the repo.]

## API Configuration

Describe any configuration that needs to take place before running the API. For example, creating an `.env` file and what variables to put in it. Give an example of how this might be done.

REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB, just placeholders as indicated below:

______________________
NODEENV=development
PORT=8080
HOST=
mongoDB=YourMongoURL
seedDb=true
secret=YourJWTSecret
______________________

## API Design
The API routes fall under two categories
- *Local*: Data which is called from my mongoDB database
- *TMDB*: Data which is called from The Movie Database

### Movies
#### Local
- `localhost:8080/api/movies` | GET | Gets a list of local movies
- `localhost:8080/api/movies/:id` | GET | Gets information about a specific movie

#### TMDB
- `localhost:8080/api/movies/tmdb/discover/:page` | GET | gets page of the discover movies
- `localhost:8080/api/movies/tmdb/movie/:id` | GET | gets information about a specific movie
- `localhost:8080/api/movies/tmdb/genres` | GET | gets list of genres
- `localhost:8080/api/movies/tmdb/movieImages/:id` | GET | gets movie images for specific movie
- `localhost:8080/api/movies/tmdb/movie/:id/reviews` | GET | gets reviews for a specific movie
- `localhost:8080/api/movies/tmdb/upcoming/:page` | GET | gets page of the upcoming movies
- `localhost:8080/api/movies/tmdb/popular/:page` | GET | gets page of popular movies
- `localhost:8080/api/movies/tmdb/topRated/:page` | GET | gets page of top rated movies
- `localhost:8080/api/movies/tmdb/nowPlaying/:page` | GET | gets  page of movies now playing in cinema
- `localhost:8080/api/movies/tmdb/movie/:id/recommendations` | GET | get movie recommendations based on movie
- `localhost:8080/api/movies/tmdb/movie/:id/similar` | GET | get similar movies based on movie
- `localhost:8080/api/movies/tmdb/movie/:id/credits` | GET | get movie credits
- `localhost:8080/api/movies/tmdb/person/:id` | GET | get actor details
- `localhost:8080/api/movies/tmdb/person/:id/credits` | GET | get actor film discography 

### Users
#### Local
- `localhost:8080/api/users` | GET | Gets a list of local users
- `localhost:8080/api/users?action=register` | POST | creates and authenticates new user
- `localhost:8080/api/users/:id` | POST | Updates user information
- `localhost:8080/api/users/:userName` | POST | Updates favourite movies for user (WIP)
### Reviews
#### Local
- `localhost:8080/api/reviews` | GET | get all local movie reviews
- `localhost:8080/api/reviews?action=submit` | POST | post movie review to local database
- `localhost:8080/api/reviews/:reviewId` | DELETE | Delete movie review from database based on review Id
- `localhost:8080/api/reviews/:movieId` | GET | get all movie reviews for certain movie

The swagger layout may not be available by the time this is looked at, either my subscription will expire or you're not invited as a collaborator, as I set the documentation to private. The swagger documentation is showcased in the video, and is saved as `DOMINIKKAWKA2002-WAD2-1.0.0-resolved` in the movies-api directory. 

[Swaggerhub](https://app.swaggerhub.com/apis/DOMINIKKAWKA2002/WAD2/1.0.0).

## Security and Authentication

Give details of authentication/security implemented on the API (e.g. passport/sessions). Indicate which routes are protected.
Protected Routes:
+ `/movies/favorites`
+ `/movies/:id/recommendations`   
+ `/movies/:id/similar`
+ `/movies/:id/credits`
+ `/person/:id`
+ `/person/:id/credits`
+ `/reviews/:id`
+ `/reviews/form`

## Integrating with React App

Describe how you integrated your React app with the API. List the views that use your Web API instead of the TMDB API. Describe any other updates to the React app from Assignment One.

All movie related things (Details,lists,similar,recommendations,credits) are from the TMDB API since this information is updated daily.
Users can submit reviews, which then can be viewed with the review excerpt, or on the review page.  

Pages that use local API:
- `addMovieReviewPage.js`
- `loginPage.js`
- `movieReviewPage.js`
- `signUpPage.js`
- `siteHeader component`

## Independent learning (if relevant)

