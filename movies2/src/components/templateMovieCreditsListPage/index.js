import React from "react";
import MovieCreditsList from "../movieCreditsList";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";

function MovieCreditsListPageTemplate({ credits }) {

  return (
   
    <Grid container sx={{ padding: '20px', backgroundColor: "rgba(0,0,0,0.1)" } }>
      <Grid item xs={12}>
        <Header title={`Movie Cast`} />
      </Grid>
      <Grid item container spacing={5} >
        <MovieCreditsList credits={credits}></MovieCreditsList>
      </Grid>
    </Grid>
  );
}
export default MovieCreditsListPageTemplate;