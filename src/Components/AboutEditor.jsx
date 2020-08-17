import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Uploader from './Uploader';
// import { useStatefulFields } from "../context/useStatefulFields";
import { useAuthSubmit } from "../context/useAuthSubmit";
// import Register from './Register';

const AboutEditor = () => {
    const [infoUser, setInfoUser] = useState();
    // const [allowEdition, setAllowEdition] = useState(false);
    const [uploaderOnScreen, setUploaderOnScreen] = useState(false);
    // const [values, handleChange] = useStatefulFields();
    // const [error, loading, handleSubmit] = useAuthSubmit("/updateAbout", values);

    const handleChange = (e) => {
        console.log('infoUser = ', infoUser);
        e.persist();
        setInfoUser(prevState => {
            return {...prevState, [e.target.name]: e.target.value}
        })

    }
    
    const handleSubmit = () => {
        console.log('gonna submit');

        console.log('values = ', infoUser);
        // setLoading(true);
        (async () => {
            const {data} = await axios.post('/updateAbout', infoUser);
            console.log('data from /updateAbout = ', data);
        })();
    }

    const changeUrl = () => {
        (async () => {
            const {data} = await axios.get('/getUserInfo');
            console.log('data from /getInfoUser = ', data);

            setInfoUser(data.data);
        })();
    }


    useEffect(() => {
        (async () => {
            const {data} = await axios.get('/getUserInfo');
            console.log('data from /getInfoUser = ', data);

            setInfoUser(data.data);
        })();
    }, []);

    return (
        <div>
            {/* <Register></Register> */}
            {infoUser && (
                <div>
                    <div className="form__group">
                        <input
                                type="text"
                                name="first"
                                className="form__input"
                                autoComplete="off"
                                placeholder={infoUser.first}
                                value={infoUser.first}
                                // readOnly={!allowEdition}
                                onChange={e => handleChange(e)}
                        />
                    </div>
                    
                    <div className="form__group">
                        <input
                                type="text"
                                name="inforUser.last"
                                className="form__input"
                                autoComplete="off"
                                placeholder={infoUser.last}
                                value={infoUser.last}
                                // readOnly={!allowEdition}
                                onChange={e => handleChange(e)}
                        />
                    </div>

                    <div className="form__group">
                        <textarea
                            name="description"
                            id="bio-text"
                            rows="10"
                            cols="50"
                            value={infoUser.description}
                            onChange={e => handleChange(e)}
                        ></textarea>
                    </div>


                    <input type="hidden" name="_csrf" value="<%= csrfToken %>"/>
                    <button className="btn btn--white btn--animated" onClick={() => handleSubmit()}>update</button>

                    <img 
                        className="about__profile"
                        src={infoUser.image || '/default.png'} alt="profile pic"
                        onClick={() => setUploaderOnScreen(true)}
                    ></img>

                    {uploaderOnScreen && (
                        <Uploader
                            setImageUrl={url => {
                                setUploaderOnScreen(false);
                                changeUrl();
                            }}
                            closeModal={() => setUploaderOnScreen(false)}
                        ></Uploader>
                    )}

                </div>
            )}
        </div>
    )
}

export default AboutEditor
