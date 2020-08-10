import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import ProjectEditor from './ProjectEditor';

const Admin = () => {
    const path = window.location.pathname;
    console.log('path = ', path);
    return (
        <BrowserRouter>
            {/* <Route exact path='/admin/project' component={ProjectEditor}></Route> */}
            <a href="/admin/newProject">Add Project</a>
            <button>Change Project</button>
            <button>Add Publication</button>
            <button>Change Publication</button>
            <button>Change About</button>
            <button>Change Contact</button>
        </BrowserRouter>
    )
}

export default Admin;
