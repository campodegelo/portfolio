import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import { useAuthSubmit } from "../context/useAuthSubmit";
import { useStatefulFields } from "../context/useStatefulFields";
import Dropzone from './Dropzone';

const ProjectEditor = () => {

    const [values, handleChange] = useStatefulFields();
    const [error, loading, handleSubmit] = useAuthSubmit("/addProject", values);

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
                        <input
                            type="text"
                            name="name"
                            className="form__input"
                            autoComplete="off"
                            placeholder="Project Name"
                            // readOnly={!allowEdition}
                            onChange={e => handleChange(e)}
                        />
                    </div>

                    <div className="form__group">
                        <textarea
                            id="description"
                            name="description"
                            className="form__input"
                            placeholder="Project Description"
                            // readOnly={!allowEdition}
                            onChange={e => handleChange(e)}
                        />
                    </div>

                    <div className="form__group">
                        <input
                            type="text"
                            name="location"
                            className="form__input"
                            autoComplete="off"
                            placeholder="Location"
                            // readOnly={!allowEdition}
                            onChange={e => handleChange(e)}
                        />
                    </div>

                    <div className="form__group">
                        <input
                            type="text"
                            name="area"
                            className="form__input"
                            autoComplete="off"
                            placeholder="Area"
                            // readOnly={!allowEdition}
                            onChange={e => handleChange(e)}
                        />
                    </div>

                    <div className="form__group">
                        <input
                            type="text"
                            name="yearStart"
                            className="form__input"
                            autoComplete="off"
                            placeholder="Year of Start"
                            // readOnly={!allowEdition}
                            onChange={e => handleChange(e)}
                        />
                    </div>

                    <div className="form__group">
                        <input
                            type="text"
                            name="yearConclusion"
                            className="form__input"
                            autoComplete="off"
                            placeholder="Year of Conclusion"
                            // readOnly={!allowEdition}
                            onChange={e => handleChange(e)}
                        />
                    </div>

                    <Dropzone></Dropzone>

                    <input type="hidden" name="_csrf" value="<%= csrfToken %>"/>
                    <button className="btn btn--white btn--animated" onClick={() => handleSubmit()}>add project</button>

                </div>
            )}
        </Fragment>
    )
}

export default ProjectEditor
