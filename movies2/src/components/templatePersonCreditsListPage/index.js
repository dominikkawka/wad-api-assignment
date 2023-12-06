import React from "react";
import PersonCreditsList from "../personCreditsList";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";

function PersonCreditsListPageTemplate({ credits }) {

  return (
   
    <Grid container sx={{ padding: '20px', backgroundColor: "rgba(0,0,0,0.1)" } }>
      <Grid item xs={12}>
        <Header title={`Movies starred in`} />
      </Grid>
      <Grid item container spacing={5} >
        <PersonCreditsList credits={credits}></PersonCreditsList>
      </Grid>
    </Grid>
  );
}
export default PersonCreditsListPageTemplate;