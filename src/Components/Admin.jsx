import React, {useState, useEffect, Fragment} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import ProjectEditor from './ProjectEditor';
import PublicationEditor from './PublicationEditor';
import AboutEditor from './AboutEditor';
import ContactEditor from './ContactEditor';
import Login from './Login';
import axios from 'axios';

const Admin = () => {
    const path = window.location.pathname;
    const [isLogged, setIsLogged] = useState(false);
    console.log('path = ', path);

    useEffect(() => {
        (async() => {
            const {data} = await axios.get('/getUserInfo');
            console.log('data from /getUserInfo: ', data);
            if (data.success) {
                setIsLogged(true);
            } else {
                setIsLogged(false);
            }
        })();
    }, []);

    return (
        <BrowserRouter>

            {!isLogged && (
                <Login
                    logUser={() => setIsLogged(true)}
                ></Login>
            )}

            {isLogged && (
                <Fragment>
                    <a className="admin__btn" href="/admin/newProject">Add Project</a>
                    <a className="admin__btn" href="/admin/changeProject">Change Project</a>
                    <a className="admin__btn" href="/admin/newPublication">Add Publication</a>
                    <a className="admin__btn" href="/admin/changePublication">Change Publication</a>
                    <a className="admin__btn" href="/admin/changeAbout">Change About</a>
                    <a className="admin__btn" href="/admin/changeContact">Change Contact</a>
        
                    <Route path="/admin/newProject" component={ProjectEditor}></Route>
                    <Route path="/admin/changeProject" component={ProjectEditor}></Route>
                    <Route path="/admin/newPublication" component={PublicationEditor}></Route>
                    <Route path="/admin/changePublication" component={PublicationEditor}></Route>
                    <Route path="/admin/changeAbout" component={AboutEditor}></Route>
                    <Route path="/admin/changeContact" component={ContactEditor}></Route>
                </Fragment>
            )}
        </BrowserRouter>
    )
}

export default Admin;
