import React, { Fragment } from 'react'

const About = (props) => {
    console.log('about : ', props);
    return (
        <Fragment>
            <div className="content__title">
                <h1 className="heading-primary">
                    <span className="heading-primary--main heading-primary--main--white">Fernanda</span>
                    <span className="heading-primary--main heading-primary--main--black">Eisfeld</span>
                    <span className="heading-primary--sub">Arquiteta</span>
                </h1>
                <img src="./profile.jpg" alt="Profile" className="about__profile"/>
            </div>
        </Fragment>
    )
}

export default About;