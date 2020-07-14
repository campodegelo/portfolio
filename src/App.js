import React from 'react';
import './css/style.css'
import { BrowserRouter, Route } from "react-router-dom";
import About from './Components/About';
import Contact from './Components/Contact';
import Menu from './Components/Menu';
import Projects from './Components/Projects';
import Publications from './Components/Publications';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Menu></Menu>
        </header>

        <Route exact path="/about" component={About}></Route>
        <Route exact path="/contact" component={Contact}></Route>
        <Route exact path="/publications" component={Publications}></Route>
        <Route exact path="/projects" component={Projects}></Route>

      </div>
    </BrowserRouter>
  );
}

export default App;
