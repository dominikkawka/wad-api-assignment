import React, {lazy, Suspense} from "react";
import { useParams } from 'react-router-dom';
import { getPersonCredits } from '../api/tmdb-api'
import { useQuery } from "react-query";

const PersonCreditsListPageTemplate = lazy(() => import("../components/templatePersonCreditsListPage"));
const Spinner = lazy(() => import("../components/spinner"));


const PersonCreditsPage = (props) => {
   const { id } = useParams();
  
   const { data, error, isLoading, isError } = useQuery(
     ["person", { id: id }, "movie_credits"],
     getPersonCredits
   );
 
   if (isLoading) {
     return <Spinner />;
   }
 
   if (isError) {
     return <h1>{error.message}</h1>;
   }
   //console.log(data)
   return (
     <>
     <Suspense fallback={<h1>Loading page</h1>}>
     <PersonCreditsListPageTemplate credits={data}></PersonCreditsListPageTemplate>
     </Suspense>
     </>
  );
};

export default PersonCreditsPage;