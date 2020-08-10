import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';

const ProjectEditor = () => {

    const path = window.location.pathname;
    const [change, setChange] = useState(false);


    //fetch all projects
    useEffect(() => {
        if (path === '/admin/changeProject'){
            console.log('fetching the existing projects');
            setChange(true);

            (async () => {
                const {data} = await axios.get('/fetchProjects');
                
            })();
            
            }
    },[path]); 

    return (
        <Fragment>
            <div className="content__title">
                <h1 className="heading-primary">
                    <span className="heading-primary--main heading-primary--main--white">Project Editor</span>
                </h1>
            </div>
            
            {change && (
                <div></div>
            )}

            {!change && (
                <div></div>
            )}
        </Fragment>
    )
}

export default ProjectEditor
