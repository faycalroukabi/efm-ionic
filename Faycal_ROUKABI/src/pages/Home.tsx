import { IonButton, IonCard, IonCardContent, IonCardTitle, IonContent, IonFabButton, IonGrid, IonHeader, IonInput, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import Rating from '@material-ui/lab/Rating';
import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import { useStyles } from './Home.styles'
import { Link } from 'react-router-dom'

import FavoriteIcon from '@material-ui/icons/Favorite'
import SearchIcon from '@material-ui/icons/Search'

import { Button, Grid, IconButton, Input, InputBase, Paper } from '@material-ui/core';

type Movies = { Title: string, Poster: string, Year: string, imdbID: string }[]
const Home: React.FC = () => {
  const [movies, setMovies] = useState([] as Movies)
  const classes = useStyles()

  const getMovie = async (e: any) => {
    const API_KEY = "5de342f"
    const movieName = e.target.elements.movieName.value;
    e.preventDefault()
    axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${movieName}&type=movie`).catch(err => err)
      .then(res => {
        const retrievedmovies = res.data.Search;
        console.log(retrievedmovies)
        setMovies([...retrievedmovies]);
      });
  }

  const trimtitle = (string : string) => {
    if(string.length > 16){
      return string.substring(0,23)+'...';
    } else { 
      return string;
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Movies</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Paper component="form" onSubmit={getMovie} className={classes.root}>
          <InputBase
            placeholder="Search Movie"
            inputProps={{ 'aria-label': 'search movie' }}
            name="movieName"
            className={classes.input}
          />
          <IconButton type="submit" aria-label="search" className={classes.iconButton}>
            <SearchIcon />
          </IconButton>
        </Paper>

        <Grid container>
          {movies.map(
            (movie, i) => {
              return (
                <Grid item key={i} xs={6} sm={4}>
                  
                    <IonCard>
                    <Button>
                      <Link to={{
                        pathname: `/movie/${movie.imdbID}`

                      }}>
                        <img src={movie.Poster} />
                      </Link>
                      </Button>
                      <IonCardContent>
                        <IonCardTitle>
                            {trimtitle(movie.Title)}
                        </IonCardTitle>

                        <Rating key={i} value={Math.floor(Math.random() * 5)} icon={<FavoriteIcon />} name={movie.Title} readOnly={true} classes={{ iconFilled: `myiconfilled`, iconEmpty: `myiconempty` }} />
                        <p>{movie.Year}</p>
                      </IonCardContent>
                    </IonCard>

                  

                </Grid>
              )
            }
          )}

        </Grid>

      </IonContent>
    </IonPage>
  );
};

export default Home;
