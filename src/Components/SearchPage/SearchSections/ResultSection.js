import '../../../Styles/SearchPage/ResultSection/ResultSection.css';
import React, { useEffect, useState } from "react";
import ResultCard from './ResultCard';
import { useHistory } from 'react-router';

const ResultSection = ({results}) => {
    const history = useHistory();
    const [userMovies, setUserMovies]= useState([]);

    useEffect(()=>{
        const user = localStorage.getItem("user");
        if(user){
            setUserMovies(JSON.parse(user).movies || []);
        }
    },[])

    console.log(results);

    return (
        <section className="ResultSection">
            <div className="results">
           {results && results.length>0 && (
               <div className="pageNumber">
                {results.map(movie=>
                    {   
                        const movieFavorite = Boolean(userMovies.find(x => {
                            return Number(x.movieId) == movie.id
                        }));
                        return (movie.poster_path && (movie.title || movie.name) && (movie.release_date || movie.first_air_date))&&
                        (
                                <ResultCard history={history} movieFavorite={movieFavorite} key={movie.id} movie={movie} />
                        )
                    })}
                </div>
           )}
            </div>
        </section>
    );
}
 
export default ResultSection;