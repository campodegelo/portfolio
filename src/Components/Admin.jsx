import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import ProjectEditor from './ProjectEditor';
import PublicationEditor from './PublicationEditor';
import AboutEditor from './AboutEditor';
import ContactEditor from './ContactEditor';

const Admin = () => {
    const path = window.location.pathname;
    console.log('path = ', path);
    return (
        <BrowserRouter>
            {/* <Route exact path='/admin/project' component={ProjectEditor}></Route> */}
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
        </BrowserRouter>
    )
}

export default Admin;
