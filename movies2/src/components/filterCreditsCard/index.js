import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg'

import React from "react";

const formControl = 
  {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)"
  };

export default function FilterCreditsCard(props) {

    let arr = [{"id":0,"name":"Crew"},{"id":1,"name":"Cast"}]
 
  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); // NEW
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "involved", e.target.value);
  };


  return (
    <Card 
      sx={{
        maxWidth: 345,
        backgroundColor: "rgb(204, 204, 0)"
      }} 
      variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter Credits.
        </Typography>
           <TextField
           sx={{...formControl}}
           id="filled-search"
           label="Search field"
           type="search"
           variant="filled"
           value={props.nameFilter}
           onChange={handleTextChange}
    />
        <FormControl sx={{...formControl}}>
          <InputLabel id="involved-label">Involved</InputLabel>
          <Select
    labelId="involved-label"
    id="involved-select"
    defaultValue=""
    value={props.involvedPeopleFilter}
    onChange={handleGenreChange}
  >
            {arr.map((involve) => {
              return (
                <MenuItem key={involve.id} value={involve.id}>
                  {involve.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </CardContent>
      <CardMedia
        sx={{ height: 300 }}
        image={img}
        title="Filter"
      />
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the credits.
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
}