import React from "react";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import DetailsCard from "./DetailsCard";

const Details = () => {
    const [isFavorite, setIsFavorite] = useState(false)

    const { id } = useParams();

    const user=localStorage.getItem("user");
    let userId;
        if(user){
            userId=JSON.parse(user)._id;  
        }else{
            userId=null;
        }

    const [movieData, setMovieData] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
            fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`)
                .then(res => res.json())
                .then(data =>{
                    if(!data.errors){
                        setMovieData(data);

                        fetch(`http://localhost:5000/api/movies/favorites/${userId}`, {
                            credentials: "include",
                        })
                        .then(res => res.json())
                        .then(data => {
                         if (!data.errors) {
                             if(data.movies){
                                const userMovieData = data.movies.find(x => x.movieId===id);
                                setIsFavorite(Boolean(userMovieData));
                                }
                             }
                         });
                        setGenres(data.genres);
                    }else{
                        setMovieData([]);
                        setGenres([]);
                    }
                })
    }, [id]);

    return (
        <section id="details" className="detailsPage">
            {movieData
            ? (<DetailsCard
                movie={movieData}
                isFavorite={isFavorite}
                setIsFavorite={setIsFavorite}
                genres={genres}/>)
            :( <div>Loading...</div> )}
        </section>
    );
}
 
export default Details;