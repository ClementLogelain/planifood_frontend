import React, { Fragment, useContext } from 'react';
import "../styles/Navbar.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Planifications from './Planifications';
import ProtectedRoutes from '../utils/ProtectedRoutes';
import Context from '../context/context';
import { Button, Nav, Navbar } from 'react-bootstrap';
import Meals from './Meals';
import UnknownPage from './UnknownPage';
import AuthedRoutes from '../utils/AuthedRoutes';
import MealDetail from './MealDetail';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MyCourses from './MyCourses';
import Suggestions from './Suggestions';


function NavBar() {

  const { user, setUser, setToken } = useContext(Context);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }

  return (
    <Router>
      <Fragment>

        <Navbar className='navigation'>
            <Navbar.Brand href="/"><RestaurantIcon></RestaurantIcon></Navbar.Brand>
              { user ? (
              <div className='links'>
                <Nav className="navig2" variant="tabs" defaultActiveKey="/">
                  <Link className="nav-link text-white" to="/">
                      Menu
                  </Link>
                  <Link className="nav-link text-white" to="/meals">
                      Mes repas
                  </Link>
                  <Link className="nav-link text-white" to="/planifications">
                      Mes Planifications
                  </Link>
                  <Link className="nav-link text-white" to="/myCourses">
                      Mes Courses
                  </Link>
                  <Link className="nav-link text-white" to="/suggestions">
                      Suggestions
                  </Link>
                </Nav>
              </div>
                ) : (
                <div className='links'>
                  <Nav className="navig2" variant="tabs" defaultActiveKey="/login">
                    <Link className="nav-link text-white" to="/register">
                        S'inscrire
                    </Link>
                    <Link className="nav-link text-white" to="/login">
                        Se connecter
                    </Link>
                  </Nav>
                </div>)}
                <div className='butn'>
                  { user ?
                  
                  <Button className="nav-link text-white" onClick={ logout }>
                    Se déconnecter
                  </Button> : null}
                </div>
                <div className='user-name text-white'>
                    { user ? user.username : null}
                </div>
        </Navbar>
      
        <Routes>
            <Route exact path="/register" element={<AuthedRoutes />}>
              <Route exact path="/register" element={<Register />}/>
            </Route>
            <Route exact path="/login" element={<AuthedRoutes />}>
              <Route exact path="/login" element={<Login />}/>
            </Route>

            <Route exact path="/" element={<ProtectedRoutes />}>
              <Route exact path="/" element={<Home/>}/>
            </Route> 
            <Route exact path="/meals" element={<ProtectedRoutes />}>
              <Route exact path="/meals" element={<Meals/>}/>
            </Route>
            <Route exact path="/meals" element={<ProtectedRoutes />}>
              <Route exact path="/meals/:id" element={<MealDetail/>} />
            </Route>
            <Route exact path="/planifications" element={<ProtectedRoutes />}>
              <Route exact path="/planifications" element={<Planifications/>} />
            </Route>
            <Route exact path="/myCourses" element={<ProtectedRoutes />}>
              <Route exact path="/myCourses" element={<MyCourses/>} />
            </Route>
            <Route exact path="/suggestions" element={<ProtectedRoutes />}>
              <Route exact path="/suggestions" element={<Suggestions/>} />
            </Route>
            <Route path="*" element={<UnknownPage/>}/>
        </Routes>
      </Fragment>
    </Router>
  );
}

export default NavBar;
