import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import { Button, Pagination, Stack } from "@mui/material";

function MovieListPageTemplate({ movies, title, action, setPage, pages, currentPage }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [yearFilter, setYearFilter] = useState("")
  const [ratingFilter, setRatingFilter] = useState(4)
  const [sorting, setSorting] = useState(movies)
  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      return m.release_date.search(yearFilter) !== -1
    })
    .filter((m) => {
      return m.vote_average >= ratingFilter;
    })

    const sortDefault = () => {
      const sorted = displayedMovies
      setSorting(sorted)
    }

    const sortAtoZ = () => {
      const sorted = displayedMovies.sort((a,b) => (a.title > b.title ? 1 : -1))
      setSorting(sorted)
    }

    const sortZtoA = () => {
      const sorted = displayedMovies.sort((a,b) => (a.title > b.title ? -1 : 1))
      setSorting(sorted)
    }

    const sortLowestRated = () => {
      const sorted = displayedMovies.sort((a,b) => (a.vote_average - b.vote_average))
      setSorting(sorted)
    }

    const sortHighestRated = () => {
      const sorted = displayedMovies.sort((a,b) => (b.vote_average - a.vote_average))
      setSorting(sorted)
    }

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "year") setYearFilter(value)
    else if (type === "rating") setRatingFilter(value)
    else setGenreFilter(value);
  };

  const handleOnChange = (pages) =>{
    setPage(pages)
    window.scroll(0,0)
  }

  return (
    <Grid container sx={{ padding: '20px' }}>
      <Grid item xs={12}>
        <Header title={title} />
        <Button onClick={sortDefault}>Default</Button>
        <Button onClick={sortAtoZ}>A-Z</Button>
        <Button onClick={sortZtoA}>Z-A</Button>
        <Button onClick={sortLowestRated}>Lowest</Button>
        <Button onClick={sortHighestRated}>Highest</Button>
      </Grid>
      <Grid item container spacing={5}>
        <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            yearFilter={yearFilter}
            ratingFilter={ratingFilter}
          />
        </Grid>
        <MovieList action={action} movies={sorting}></MovieList>
      </Grid>
      <Stack spacing={5}>
      <Pagination 
        count={pages}
        color="primary"
        onChange = {(e)=> handleOnChange(e.target.textContent)}
        page={currentPage}
      />
    </Stack>
    </Grid>
  );
}
export default MovieListPageTemplate;
