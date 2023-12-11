/*
* LOCAL USER API
*/
export const login = async (username, password) => {
   const response = await fetch('http://localhost:8080/api/users', {
       headers: {
           'Content-Type': 'application/json'
       },
       method: 'post',
       body: JSON.stringify({ username: username, password: password })
   });
   return response.json();
};

export const signup = async (username, password) => {
   const response = await fetch('http://localhost:8080/api/users?action=register', {
       headers: {
           'Content-Type': 'application/json'
       },
       method: 'post',
       body: JSON.stringify({ username: username, password: password })
   });
   return response.json();
};

export const favourites = async (userName, favourites) => {
    const response = await fetch(`http://localhost:8080/api/users/${userName}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'patch',
        body: JSON.stringify({ favourites: favourites })
    });
    return response.json();
 };

/*
* LOCAL MOVIE REVIEWS API
*/

export const getLocalMovieReviews = async (movieId) => {
    const response = await fetch(`http://localhost:8080/api/reviews/${movieId}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
    });
    return response.json();
 };

 export const postLocalMovieReview = async (movieId, reviewId, author, content, rating) => {
    const response = await fetch('http://localhost:8080/api/reviews?action=submit', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ 
            movieId: movieId, 
            reviewId: reviewId,
            author: author,
            content: content,
            rating: rating
        })
    });
    return response.json();
 };