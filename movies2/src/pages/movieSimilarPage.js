import React, {lazy, Suspense} from "react";
import { useParams } from 'react-router-dom';
import { getMovieSimilar } from '../api/tmdb-api'
import { useQuery } from "react-query";

const PageTemplate = lazy(() => import("../components/templateMovieListPage"));
const Spinner = lazy(() => import("../components/spinner"));
const AddToWatchIcon = lazy(() => import("../components/cardIcons/addToWatch"));

const MovieSimilarPage = (props) => {
   const { id } = useParams();
  
   const { data, error, isLoading, isError } = useQuery(
     ["movie", { id: id }, "similar"],
     getMovieSimilar
   );
 
   if (isLoading) {
     return <Spinner />;
   }
 
   if (isError) {
     return <h1>{error.message}</h1>;
   }
   const movies = data.results;
 
   // Redundant, but necessary to avoid app crashing.
   const favorites = movies.filter(m => m.favorite)
   localStorage.setItem('favorites', JSON.stringify(favorites))

   return (
    <Suspense fallback={<h1>Loading page</h1>}>
     <PageTemplate
      title= {`Similar Movies`}
      movies={movies}
      action={(movie) => {
         return <AddToWatchIcon movie={movie} />
      }}
    />
    </Suspense>
  );
};

export default MovieSimilarPage;