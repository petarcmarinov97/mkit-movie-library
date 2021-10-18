import React from "react";
import FavoriteCard from "./FavoriteCard";
import { useState, useEffect } from "react";
import '../../Styles/Favorites/FavoriteMainPage/FavoriteMain.css';

const Favorites = ({user}) => {
        const [data, setData] = useState([]);
        let id;
        
        useEffect(async() => {  
                id=JSON.parse(localStorage.getItem('user'))._id;  
                if(id){  
           await fetch(`http://localhost:5000/api/movies/favorites/${id}`, {
                credentials: "include",
            })
                .then(res => res.json())
                .then(data => {
                    if(data){
                        setData(data.movies);
                    } else {
                        setData([]);
                    }
                });
            }
    }, []);


    return (
    <section className="BottomSection">
        {data && data.length>0 && (<div className="column_wrapper">
            <div className="content_wrapper">
                <div className="column">
                    <div className="column_header">
                     <h2>Your Favorites</h2>
                     </div>
                <div className="media">
                    <div className="results">
                        {data.length>0 && (
                    <div className="pageNumber">
                        {data.map(movie=> (
                        <FavoriteCard key={movie._id} movie={movie} />
                        ))}
                    </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>)
    }    
</section>
    );
}
 
export default Favorites;