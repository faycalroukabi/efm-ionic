import { IonBackButton, IonButton, IonCard, IonCardContent, IonCardTitle, IonContent, IonFabButton, IonGrid, IonHeader, IonInput, IonLabel, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import Rating from '@material-ui/lab/Rating';
import React, { useEffect, useState } from 'react';
import './MovieDetails.css'
import axios from 'axios';
import { useParams } from 'react-router-dom'

import FavoriteIcon from '@material-ui/icons/Favorite'
import SearchIcon from '@material-ui/icons/Search'

import { Button, Card, Grid, Icon, IconButton, Input, InputBase, Paper } from '@material-ui/core';
type Rating = {
    Source: string,
    Value: string,
}|any
type Movie = { Title: string,
    Poster: string,
    Year: string,
    imdbID: string,
    Rated: string,
    Runtime: string,
    Genre: string,
    Director: string,
    Writer: string,
    Actors: string,
    Plot: string,
    Language: string,
    Country: string,
    Ratings: Rating[],
    imdbVotes: string,
 } | any
type Param = {
    id: string
}
const MovieDetails: React.FC = () => {
    const [movie, setMovie] = useState({} as Movie);
    const params = useParams<Param>();
    useEffect(() => {
        console.log(params)
        const {id} = params;
        const API_KEY = "5de342f";
        axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`).catch(err => err)
            .then(res => {
                const retrievedmovie = res.data;
                console.log(retrievedmovie)
                setMovie(retrievedmovie);
            });
    }
     ,[]);
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonFabButton slot='start' color='transparent'>
                    <IonBackButton defaultHref='/' />
                </IonFabButton>
                    <IonTitle>{movie.Title}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonCard>
                    <img src={movie.Poster} width='100%' />
                    <div>Genres: <strong>{movie.Genre}</strong></div>
                    <Grid container>
                        {!!movie.Ratings && movie.Ratings.map((rating) => {
                            return rating.Source == "Internet Movie Database" && (<Grid  xs={5} sm={11}><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/IMDb_Logo_Square.svg/1200px-IMDb_Logo_Square.svg.png' width='40px'/><strong>{rating.Value}</strong></Grid>)
                            || rating.Source == "Rotten Tomatoes" && (<Grid  xs={5} sm={11}><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Rotten_Tomatoes_logo.svg/1200px-Rotten_Tomatoes_logo.svg.png' width='60px'/><strong>{rating.Value}</strong></Grid>);
                        })}
                    </Grid>
                    
                </IonCard>
                <IonLabel>Directed By: <strong>{movie.Director}</strong></IonLabel>
                <br></br>
                <IonLabel>Written By: <strong>{movie.Writer}</strong></IonLabel>
                <h2>Synapsis:</h2>
                <p>{movie.Plot}</p>
                

            </IonContent>
        </IonPage>
    );
};

export default MovieDetails;
