import React from "react";
import Grid from "@mui/material/Grid";
import { getPerson } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner'
import PeopleHeader from "../headerPeople";

const TemplatePeoplePage = ({ person, children }) => {

  const { data , error, isLoading, isError } = useQuery(
    ["person", { id: person.id }],
    getPerson
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const info = data;

  return (
    <>
    <PeopleHeader people={person} />
      <Grid container spacing={5} sx={{ padding: "15px" }}>
        <Grid item xs={3}>
          <div sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}>
            <img src={`https://image.tmdb.org/t/p/w500/${info.profile_path}`} alt={`${info.profile_path}`} width={`90%`}></img>
          </div>
        </Grid>

        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplatePeoplePage;