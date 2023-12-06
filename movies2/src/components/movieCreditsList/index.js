import React from "react";
import MovieCreditsCard from "../movieCreditsCard";
import Grid from "@mui/material/Grid";

const MovieCreditsList = ({credits}) => {
   //console.log(credits)
   let cast = credits.cast
  let movieCreditsCards = cast.map((c) => (
    <Grid key={c.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <MovieCreditsCard key={c.id} credit={c} />
    </Grid>
  ));
  return movieCreditsCards;
};

export default MovieCreditsList;