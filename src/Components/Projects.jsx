import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios';


const Projects = () => {
    const [projects, setProjects] = useState();
    useEffect(() => {
        (async() => {
            const {data} = await axios.get('/fetchProjects');
            console.log('data from fectchProjects: ', data);

            setProjects(data.results);

        })();
    },[]);

    console.log('projects = ', projects);

    return (
        <Fragment>
            {projects && (
                <div className="project__container">
                    {projects.map(p => (
                        <div className="project__item" key={p.id}>
                            <div className="overlay">
                            </div>
                            <div className="project__title">{p.name}</div>
                            {p.images && (
                                <div className="project__content">
                                    {p.images.map(mainImg => (
                                        <Fragment
                                            key={mainImg.image}>
                                            {mainImg.main && (
                                                <img src={mainImg.image} alt={p.name} 
                                                className="project__image"/>
                                            )}

                                        </Fragment>
                                    ))}
                                </div>
                            )}
                            {!p.images && (
                                <div className="project__image">
                                    <img src="/no-image.png" alt="no project img" className="project__image"/>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </Fragment>
    )
}

export default Projects;