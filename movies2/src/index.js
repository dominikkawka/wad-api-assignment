import React, { lazy, Suspense} from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import SiteHeader from './components/siteHeader'
import MoviesContextProvider from "./contexts/moviesContext";

const HomePage = lazy(() => import("./pages/homePage"));
const MoviePage = lazy(() => import("./pages/movieDetailsPage"));
const FavoriteMoviesPage = lazy(() => import("./pages/favoriteMoviesPage"));
const MovieReviewPage = lazy(() => import("./pages/movieReviewPage"));
const UpcomingPage = lazy(() => import("./pages/upcomingPage"));
const AddMovieReviewPage = lazy(() => import('./pages/addMovieReviewPage'));
const PopularPage = lazy(() => import("./pages/popularPage"));
const TopRatedPage = lazy(() => import("./pages/topRatedPage"));
const NowPlayingPage = lazy(() => import("./pages/nowPlayingPage"));
const MovieRecommendationsPage = lazy(() => import("./pages/movieRecommendedPage"));
const MovieCreditsPage = lazy(() => import("./pages/movieCreditsPage"));
const MovieSimilarPage = lazy(() => import("./pages/movieSimilarPage"));

const PersonPage = lazy(() => import("./pages/personDetailsPage"));
const PersonCreditsPage = lazy(() => import("./pages/personCreditsPage"));

const LoginPage = lazy(() => import("./pages/loginPage"));
const CreateAccountPage = lazy(() => import("./pages/createAccountPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <SiteHeader />
      <MoviesContextProvider>
      <Suspense fallback={<h1>Loading page</h1>}>
      <Routes>
        <Route exact path="/movies/favorites" element={<FavoriteMoviesPage />} />
        <Route exact path="/movies/upcoming" element={<UpcomingPage />} />
        <Route exact path="/movies/popular" element={<PopularPage />} />
        <Route exact path="/movies/top_rated" element={<TopRatedPage />} />
        <Route exact path="/movies/now_playing" element={<NowPlayingPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/movies/:id/recommendations" element={<MovieRecommendationsPage/>} />
        <Route path="/movies/:id/similar" element={<MovieSimilarPage/>} />
        <Route path="/movies/:id/credits" element={<MovieCreditsPage/>} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={ <Navigate to="/" /> } />
        <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
        <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
        
        <Route path="/person/:id" element={ <PersonPage /> } />
        <Route path="/person/:id/credits" element={ <PersonCreditsPage /> } />

        <Route path="/login" element={ <LoginPage /> } />
        <Route path="/signup" element={ <CreateAccountPage /> } />
      </Routes>
      </Suspense>
      </MoviesContextProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);