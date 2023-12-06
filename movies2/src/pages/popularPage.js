import React, { useEffect, useState, lazy, Suspense } from "react";
import { getPopularReleases } from "../api/tmdb-api";
import { useQuery } from 'react-query';

const PageTemplate = lazy(() => import("../components/templateMovieListPage"));
const Spinner = lazy(() => import("../components/spinner"));
const AddToWatchIcon = lazy(() => import("../components/cardIcons/addToWatch"));


const PopularPage = (props) => {
  const [page,setPage] = useState(1)

  const { data, error, isLoading, isError, refetch }  = useQuery('popular', () => getPopularReleases(page), {enabled: true})

  useEffect(() => { 
    refetch()
    // eslint-disable-next-line
   }, [page]);
   //console.log(page)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;
  const currentPage = data.page;
  const totalPages = data.total_pages

  let pagesUsed = 0
  if (totalPages > 20) {
    pagesUsed = 20
  } else {
    pagesUsed = totalPages
  }

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  return (
    <Suspense fallback={<h1>Loading page</h1>}>
    <PageTemplate
      title='Popular Movies'
      movies={movies}
      setPage={setPage}
      currentPage={currentPage}
      pages={pagesUsed}
      action={(movie) => {
        return <AddToWatchIcon movie={movie} />
      }}
    />
    </Suspense>
  );
};

export default PopularPage;