import React from "react";
import "../Styles/NavBar/Navbar.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";

const Navbar = () => {

    const history=useHistory();
    
    const [isLogged, setLogged] = useState({});

    useEffect(() => {
        setInterval(() => {
            const token = localStorage.getItem("token");
            const logged = Boolean(token)
            setLogged(logged);
            }, 1)
    }, []);

    const logout = async () => {
        const response = await fetch('http://localhost:5000/api/logout',{
            method: 'POST',
            credentials: "include",
        })
        localStorage.removeItem("token");   
        localStorage.removeItem("user");
        history.push('/login');
    }

    return (
        <header>
            <div className="content">
            <div className="sub_media">
                <div className="nav_wrapperLeft">
                    <Link className="title" to="/">My Movie Collection</Link>
                </div>
                <div className="nav_wrapperRight">
                    {isLogged
                    ? (<ul className="users">
                        <li>
                            <Link to="/favorites">Favorites</Link>
                        </li>
                        <li>
                            <Link to="/" onClick={logout}>Logout</Link>
                        </li>
                      </ul>)
                    : (<ul className="guests">
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>          
                    </ul>)
                    }   
                </div>
            </div>
        </div>
    </header>
    );
}
 
export default Navbar;