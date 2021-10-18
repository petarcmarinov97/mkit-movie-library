import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard'
import Navbar from './Components/Navbar';
import Search from './Components/SearchPage/Search';
import Details from './Components/DetailsPage/Details';
import Favorites from './Components/FavoritesPage/Favorites';
import PrivateRoute from './Components/PrivateRoute';
import { useHistory } from 'react-router-dom';

function App() {
  const history = useHistory();
  
  return (
    <div className="container">
        <Navbar />
      <Switch>
        <Route path="/" exact component={Dashboard}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/register" exact component={Register} />
        <Route path="/search" exact history={history} component={Search}/>
        <PrivateRoute path="/movie/details/:id" exact  history={history} component={Details}/>
        <PrivateRoute path="/favorites" exact component={Favorites}/>
      </Switch>
    </div>
  );
}

export default App;
