  export const getMovies = async (page) => {
    return fetch(
      `http://localhost:8080/api/movies/tmdb/discover/${page}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
    });
  }; 
  
  export const getMovie = async (args) => {
    //console.log(args)
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
      `http://localhost:8080/api/movies/tmdb/movie/${id}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
  });
  };

  export const getGenres = async () => {
    return fetch(
      `http://localhost:8080/api/movies/tmdb/genres`
    ).then( (response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getMovieImages = async ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `http://localhost:8080/api/movies/tmdb/movieImages/${id}`
    ).then( (response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
  
    })
    .catch((error) => {
      throw error
   });
  };

  //http://localhost:8080/api/movies/tmdb/movieReviews/${id} fails/ doesn't display movies
  // it seems its because when this is called it puts it inside of an array. 
  export const getMovieReviews = async (id) => {
    return fetch(
      `http://localhost:8080/api/movies/tmdb/movieReviews/${id}`
    )
      .then((res) => res.json())
      .then((json) => {
        return json.results;
      });
  };

  export const getUpcomingReleases = async (page) => {
    return fetch(
      `http://localhost:8080/api/movies/tmdb/upcoming/${page}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
    });
  }

  export const getPopularReleases = async (page) => {
    return fetch(
      `http://localhost:8080/api/movies/tmdb/popular/${page}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
    });
  }

  export const getTopRatedReleases = async (page) => {
    return fetch(
      `http://localhost:8080/api/movies/tmdb/topRated/${page}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
    });
  }

  export const getNowPlaying = async (page) => {
    return fetch(
      `http://localhost:8080/api/movies/tmdb/nowPlaying/${page}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
    });
  }
  
  export const getMovieRecommendations = async (args) => {
    //console.log(args)
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
      `http://localhost:8080/api/movies/tmdb/movie/${id}/recommendations`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
    });
  };

  export const getMovieSimilar = (args) => {
    //console.log(args)
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
      `http://localhost:8080/api/movies/tmdb/movie/${id}/similar`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
    });
  };

  export const getMovieCredits = async (args) => {
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
      `http://localhost:8080/api/movies/tmdb/movie/${id}/credits`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
    });
  };

  export const getPerson = async (args) => {
    //console.log(args)
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
      `http://localhost:8080/api/movies/tmdb/person/${id}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
  });
  };

  export const getPersonCredits = async (args) => {
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
      `http://localhost:8080/api/movies/tmdb/person/${id}/credits`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
    });
  };