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
            
        } else if (path === '/admin/newProject') {
            setChange(false);
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
                <div>
                    <h1 className="heading-primary">
                        <span className="heading-primary--sub heading-primary--black">Change Project</span>
                    </h1>
                </div>
            )}

            {!change && (
                <div>
                    <h1 className="heading-primary">
                        <span className="heading-primary--sub heading-primary--black">New Project</span>
                    </h1>
                    
                    <div className="form__group">
                        
                    </div>

                </div>
            )}
        </Fragment>
    )
}

export default ProjectEditor
