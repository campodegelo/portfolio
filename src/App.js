import React, {useEffect, useState} from 'react';
import './css/style.css'
import { BrowserRouter, Route } from "react-router-dom";
import About from './Components/About';
import Admin from './Components/Admin';
import Contact from './Components/Contact';
// import Login from './Components/Login';
import Menu from './Components/Menu';
import Projects from './Components/Projects';
import Publications from './Components/Publications';
// import ProjectEditor from './Components/ProjectEditor';
import axios from 'axios';

const App = () => {

  const [language, setLanguage] = useState('en');
    // const [otherLang, setOtherLang] = useState('pt');
    // const text = content.menu;

    useEffect(() => {
        (async () => {
            const {data} = await axios.get('/checkLang');
            // console.log('data from /checkLang = ', data);
            setLanguage(data.language);

            // if (data.language === 'en') {
            //     setOtherLang('pt');
            // } else {
            //     setOtherLang('en');
            // }
            
        })();

    }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Menu
            lang={language}
          ></Menu>
        </header>

        <div className="content">
          <Route path="/admin" component={Admin}></Route>
          {/* <Route exact path='/admin/project' component={ProjectEditor}></Route> */}
          <Route exact path="/about" component={About}></Route>
          <Route exact path="/contact" component={Contact}></Route>
          {/* <Route exact path='/login' component={Login}></Route> */}
          <Route exact path="/publications" component={Publications}></Route>
          <Route exact path='/' component={Projects}></Route>
          <Route exact path="/projects" component={Projects}></Route>
        </div>

      </div>
    </BrowserRouter>


  );
}

export default App;
