import React, { lazy, Suspense} from "react";
import { useParams } from 'react-router-dom';
import { getMovieCredits } from '../api/tmdb-api'
import { useQuery } from "react-query";

const MovieCreditsListPageTemplate = lazy(() => import("../components/templateMovieCreditsListPage"));
const Spinner = lazy(() => import("../components/spinner"));

const MovieCreditsPage = (props) => {
   const { id } = useParams();
  
   const { data, error, isLoading, isError } = useQuery(
     ["movie", { id: id }, "credits"],
     getMovieCredits
   );
 
   if (isLoading) {
     return <Spinner />;
   }
 
   if (isError) {
     return <h1>{error.message}</h1>;
   }

   return (
     <>
     <Suspense fallback={<h1>Loading page</h1>}>
     <MovieCreditsListPageTemplate credits={data}></MovieCreditsListPageTemplate>
     </Suspense>
     </>
  );
};

export default MovieCreditsPage;