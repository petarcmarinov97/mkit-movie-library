import React, { useEffect, useState } from "react";
import '../../Styles/DetailsPage/DetailsCard.css';
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router";



const DetailsCard = ({movie, genres, isFavorite, setIsFavorite}) => {
    //Comments
    const [ comments, setComments ] =  useState('');
    const [ stars, setStars ]= useState(0);
    const currentMovieId = useParams().id;

    useEffect(async ()=>{
        const user = localStorage.getItem('user');
        let userId;
        if(user){
            userId = JSON.parse(user)._id
        }
        let currentMovie;
        await fetch(`http://localhost:5000/api/movies/movie-posts/${userId}`, {
            credentials: "include",
        }).then(res => res.json())
        .then(data => {
            currentMovie = data.find(x => x.movieId == currentMovieId);
        })
        .catch(err => console.log(err))
        if(!!currentMovie){
            setComments(currentMovie.notes);
            setStars(currentMovie.rating);
        }
    }, [])

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

    const updateMovieRating = async (rating) => {
        const user=JSON.parse(localStorage.getItem("user"))  
        movieObj={
            movieId:movie.id,
            rating: rating,
            userId: user._id
        }
        const response = await fetch('http://localhost:5000/api/movies/movie/rating',{
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify(movieObj)
        })
        const data = await response.json()
        if(data){
            return true;
        } else {
            return false;
        }
    }

    const updateMovieNotes = async (notes) => {
        const user=JSON.parse(localStorage.getItem("user"))  
        movieObj={
            movieId:movie.id,
            notes: notes,
            userId: user._id
        }
        const response = await fetch('http://localhost:5000/api/movies/movie/notes',{
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify(movieObj)
        })
        const data = await response.json()
        if(data){
            return true;
        } else {
            return false;
        }
    }

    const ratingChangeHandler = newValue => {
        if(updateMovieRating(newValue)){
            setStars(newValue);
        }
    }

    const textAreaHandler = (e) =>{
        updateMovieNotes(e.target.value);
        setComments(e.target.value)
    }

    const rating = {
        size: 40,
        count: 5,
        isHalf: false,
        value: stars,
        color: "blue",
        activeColor: "red",
    };

    return (
        <section>
        <div
        style={{
            backgroundImage: `url("https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path}")` 
        }}
        className="header_large_border_first">
            <div className="keyboard_s">
                <div className="single_column">
                    <section id="original_header" className="images_inner">
                        <div className="poster_wrapper">
                            <div className="poster">
                                <div className="image_content">
                                    <img 
                                    className="poster_lazy_load"
                                    loading="lazy"
                                    src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}
                                    alt="img_poster" />
                                </div>
                            </div>
                        </div>
                        <div className="header_poster_wrapper">
                            <section className="header_poster">
                                <div className="title" dir="auto">
                                    <h2 className="16">
                                    <Link to={`/movie/details/${movie.id}`} title={movie.title}>{movie.title}</Link>
                                    </h2>
                                    <div className="facts">
                                        <span className="release">{movie.release_date}</span>
                                        <span className="genres">
                                            {genres.map(genre=>(
                                                <Link key={genre.id} to={`/movie/details/${movie.id}`}>| {genre.name} </Link>
                                            ))}
                                        </span>
                                        <span className="runtime"> | {movie.runtime} m</span>
                                    </div>
                                </div>
                                <ul className="auto_actions">
                                    {!isFavorite 
                                    ? <button className="favoritesBtn" onClick={addToFavoriteHandler}>Add</button>
                                    :<button className="favoritesBtn" onClick={removeFromFavoriteHandler}>Remove</button>
                                    }                                    
                                </ul>
                                <div className="header_info">
                                    <h3 className="tagline">{movie.tagline}</h3>
                                    <h3 dir="auto">Overview</h3> 
                                    <div className="overview" div="auto">
                                        <p>{movie.overview}</p>
                                    </div>                 
                                </div>
                            </section>
                        </div>
                    </section>
                </div>
            </div>
        </div>

         <div className="ratings">
        <form>
        <h2>Your Review</h2>
        <ReactStars name="stars" {...rating} onChange={ratingChangeHandler}/>
        <textarea className="note" name="textNote" id="note" value={comments || ''} onChange={textAreaHandler} placeholder="Your private notes and comments about the movie...">  
        </textarea>
        </form>
        </div>

    </section>
    );
}
 
export default DetailsCard;