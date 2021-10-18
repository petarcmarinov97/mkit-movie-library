import React from "react";
import { Link } from "react-router-dom";
import '../../Styles/Favorites/FavoriteCard.css';
const FavoriteCard = ({movie}) => {

    const token = localStorage.getItem("token");
    const logged = Boolean(token);

    return (
        <div className="favcard_style">
            <div className="image">
                <div className="wrapper">
                    <Link className="image" to={`/movie/details/${movie.movieId}`}>
                        <img 
                        className="poster"
                        loading="lazy"
                        src={`https://image.tmdb.org/t/p/w200${movie.imgUrl}`}
                        alt="poster" />
                    </Link>
                </div>
            </div>
            <div className="content">
                <h2>
                    <Link to={`/$movie/details/${movie.movieId}`}>{movie.title}</Link>  
                </h2>
                     <p>{movie.year}</p>
            </div>
            <div className="hover"></div>
        </div>
    );
}
 
export default FavoriteCard;