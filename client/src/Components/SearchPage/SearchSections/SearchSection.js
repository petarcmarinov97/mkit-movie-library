import "../../../Styles/SearchPage/SearchSection/SearchSection.css";
import React from "react";
import { useState } from "react";
import ResultSection from "./ResultSection";


const SearchSection = ({history}) => {

    const [results, setResults] = useState([]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&query=${e.currentTarget.search.value}&page=1&include_adult=false`)
            .then(res => res.json())
            .then(data => {
                if (!data.errors) {
                    setResults(data.results);
                } else {
                    setResults([]);
                }
            });
    };

        


    return (
        <section className="searchSection">
            <div className="title">
                <h2>Search</h2>
            </div>
            <form onSubmit={onSubmitHandler} className="search">
                    <label>
                    <input
                    className="search" 
                    type="text" 
                    name="search"
                    placeholder="Search by movie title..."
                    />
                    </label>
                    <button className="searchBtn">Search</button>
            </form>
                    <ResultSection history={history} results={results}/>
        </section>
                
                );
}
 
export default SearchSection;