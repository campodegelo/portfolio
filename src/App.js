import React, {useState} from 'react';
import './css/style.css'
import { BrowserRouter, Route } from "react-router-dom";
import About from './Components/About';
import Admin from './Components/Admin';
import Contact from './Components/Contact';
import Login from './Components/Login';
import Menu from './Components/Menu';
import Projects from './Components/Projects';
import Publications from './Components/Publications';
import {AuthContext} from './context/auth';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{authTokens, setAuthTokens: setTokens}}>
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <Menu></Menu>
          </header>

          <div className="content">
            <PrivateRoute exact path="/admin" component={Admin}></PrivateRoute>
            <Route exact path="/about" component={About}></Route>
            <Route exact path="/contact" component={Contact}></Route>
            <Route exact path='/login' component={Login}></Route>
            <Route exact path="/publications" component={Publications}></Route>
            <Route exact path='/' component={Projects}></Route>
            <Route exact path="/projects" component={Projects}></Route>
          </div>


        </div>
      </BrowserRouter>


    </AuthContext.Provider>
  );
}

export default App;
