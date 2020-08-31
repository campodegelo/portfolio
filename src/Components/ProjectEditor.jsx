import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import { useAuthSubmit } from "../context/useAuthSubmit";
import { useStatefulFields } from "../context/useStatefulFields";
import Dropzone from './Dropzone';

const ProjectEditor = () => {

    const [values, handleChange] = useStatefulFields();
    const [error, setError] = useState();
    const [loading, setLoading] = useState();
    const [currentProject, setCurrentProject] = useState();
    // const [error, loading, handleSubmit] = useAuthSubmit("/addProject", values);
    const path = window.location.pathname;

    const [change, setChange] = useState(false);
    const [added, setAdded] = useState(false);
    const [main, setMain] = useState(false);

    const handleSubmit = () => {
        console.log('values = ', values);
        setLoading(true);
        axios.post('/addProject', values)
        .then(({ data }) => {
            setLoading(false);
            console.log(data);
            if (!data.success) {
                setError(true);
            } else {
                console.log('deu certo');
                console.log('data = ', data.data[0]);
                setCurrentProject(data.data[0]);
                setAdded(true);
            }
        })
        .catch(err => {
            setLoading(false);
            console.log("error in submit: ", err);
            setError(true);
        });
    }



    //fetch all projects
    useEffect(() => {
        if (path === '/admin/changeProject'){
            console.log('fetching the existing projects');
            setChange(true);

            (async () => {
                const {data} = await axios.get('/fetchProjects');
                console.log('data from fectchProjects: ', data);
                
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
                <div className="content__title">
                    <h1 className="heading-primary">
                        <span className="heading-primary--sub heading-primary--black">Change Project</span>
                    </h1>
                </div>
            )}

            {!change && !added && !main && (
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


                    <input type="hidden" name="_csrf" value="<%= csrfToken %>"/>
                    <button className="btn btn--black btn--animated" 
                        onClick={() => handleSubmit()}>add project
                    </button>

                </div>
            )}

            {added && (
                <div className="project__uploader">
                    <h1 className="heading-secondary">{currentProject.name}</h1>
                    <Dropzone
                        handleSubmit={() => {
                            setAdded(false);
                            setMain(true);
                        }}
                        currentProject={currentProject}
                    ></Dropzone>
                </div>

            )}

            {main && (
                <div className="project__image--container">
                    
                </div>
            )}

        </Fragment>
    )
}

export default ProjectEditor
