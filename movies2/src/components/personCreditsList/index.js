import React from "react";
import PersonCreditsCard from "../personCreditsCard";
import Grid from "@mui/material/Grid";

const PersonCreditsList = ({credits}) => {
   let cast = credits.cast
   //console.log(cast)
  let personCreditsCards = cast.map((c) => (
    <Grid key={c.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <PersonCreditsCard key={c.id} credit={c} />
    </Grid>
  ));
  return personCreditsCards;
};

export default PersonCreditsList;