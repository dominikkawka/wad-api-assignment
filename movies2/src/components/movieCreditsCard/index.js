import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import { Button } from "@mui/material";

export default function MovieCreditsCard({credit}) {
   return (
     
      <Card sx={{ maxWidth: 345 }}>
      <CardHeader title={ <Typography variant="h5" component="p"> {credit.character} </Typography>}/>
       <CardMedia
         sx={{ height: 500 }}
         image={
             credit.profile_path
             ? `https://image.tmdb.org/t/p/w500/${credit.profile_path}`
             : img
         }
       />
       <CardContent>
         <Grid container>
           <Grid item xs={7}>
             <Typography variant="h6" component="p">
               {credit.name}
             </Typography>
           </Grid>
           <Grid item xs={6}>
             <Typography variant="h6" component="p">
               {credit.known_for_department}
             </Typography>
           </Grid>
           <Grid item xs={6}>
              <Button href={`../../person/${credit.id}`} data-testid="goToPersonDetails">
                View more...
              </Button>
           </Grid>
         </Grid>
       </CardContent>
     </Card>
   );
 }