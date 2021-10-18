import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import Favorites from './FavoritesPage/Favorites'
import '../Styles/Dashboard/Dashboard.css';

const Dashboard = () => {
    const history = useHistory();

    const user=localStorage.getItem("user");
    const [isLogged, setLogged] = useState({});
    
    useEffect(() => {
        { /*
            setInterval was used in order to refresh the page constantly
            in order to have the "logout" button show immediately in place of
            "login", as soon as user logs out.
        */}
        
        const token = localStorage.getItem("token");
        const logged = Boolean(token)
        setLogged(logged);
        
    }, []);

    return (
        <main>
        <section className="inner_content">
            <div className="media_v4">
                <div className="column_wrapper">
                    <div className="content_wrapper">
                        <div className="title">
                            <h2>Welcome</h2>
                            <h3>Millions of movies. Explore now</h3>
                        </div>

                        <div className="search">
                            <button onClick={()=>history.push('/search')}>Search</button>
                        </div>

                    </div>
                </div>
            </div>
        </section>
        <Favorites user={user} />
        </main>
        
    );
}
 
export default Dashboard;