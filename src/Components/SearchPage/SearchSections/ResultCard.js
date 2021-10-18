import React, { useState } from "react";
import '../../../Styles/SearchPage/ResultCard/ResultCard.css'
import { Link, useHistory } from "react-router-dom";


const ResultCard = ({movie , history, movieFavorite}) => {
    const [isFavorite, setIsFavorite] = useState(movieFavorite)
    
    const token = localStorage.getItem("token");
    const logged = Boolean(token);
    
    let movieObj={};
    const addToFavoriteHandler = async (e)=>{
        e.preventDefault();
        const user=JSON.parse(localStorage.getItem("user"))  
        movieObj={
            movieId:movie.id,
            title: movie.title,
            imgUrl: movie.poster_path,
            year: movie.release_date,
            userId:user._id
        }
        
        const response = await fetch('http://localhost:5000/api/movies/favorites/add',{
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify(movieObj)
        })
        const data = await response.json() 
        console.log(data);
        if(data){
            setIsFavorite(true)
            user.movies = data;
            localStorage.setItem('user', JSON.stringify(user))
        } 
    }

    const removeFromFavoriteHandler = async (e)=>{
        e.preventDefault();
        console.log(isFavorite );
        const user=JSON.parse(localStorage.getItem("user"))   
        movieObj={
            movieId:movie.id,
            title: movie.title,
            imgUrl: movie.poster_path,
            year: movie.release_date,
            userId:user._id
        }
        
        const response = await fetch('http://localhost:5000/api/movies/favorites/remove',{
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify(movieObj)
        })
        const data = await response.json()  
        if(data){
            setIsFavorite(false)
            user.movies = data;
            localStorage.setItem('user', JSON.stringify(user))
        } 
    }
    
    const redirectDetails = (e, movieId) => {
        history.push(`/movie/details/${movieId}`, {
            isFavorite
        });
    }

    const AddRemoveFavoriteBtn = ({addToFavoriteHandler, removeFromFavoriteHandler}) => {
        if(logged){
            if(!isFavorite){
                return (<button className="favoritesBtn" onClick={addToFavoriteHandler}>Add</button> )
            } else {
                return (<button className="removeFavoritesBtn" onClick={removeFromFavoriteHandler}>Remove</button>)
            }
        }
    }

    
    return (
        <div key={movie.id} id={movie.id} className="card_style">
            <div className="image">
                <div className="wrapper">
                    <div className="image">
                        <div className="poster">
                        <a className="image" href={`/movie/details/${movie.id}`}>
                            <img 
                            className="poster"
                            loading="lazy"
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt="poster" />
                        </a>
                        </div>
                    </div>
                <div className="details">
                    <div className="wrapper">
                        <div className="title">
                            <div>
                                <a onClick={(e) => redirectDetails(e, movie.id)}>
                                    <h2>{movie.title} ({movie.release_date.slice(0,movie.release_date.indexOf('-'))})</h2>
                                </a>
                            </div>
                        </div>
                    <div className="overview">
                        <p>{movie.overview}</p>
                    </div>
                    <div className="more">
                        <div onClick={(e) => redirectDetails(e, movie.id)}>Visit for more details</div>
                    </div>
                    {logged ? (             <AddRemoveFavoriteBtn 
                    addToFavoriteHandler={addToFavoriteHandler}
                    removeFromFavoriteHandler={removeFromFavoriteHandler}
                    />) : null}
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}
 
export default ResultCard;