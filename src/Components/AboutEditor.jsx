import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Uploader from './Uploader';
import { useStatefulFields } from "../context/useStatefulFields";
import { useAuthSubmit } from "../context/useAuthSubmit";
// import Register from './Register';

const AboutEditor = () => {
    const [infoUser, setInfoUser] = useState();
    const [allowEdition, setAllowEdition] = useState(false);
    const [uploaderOnScreen, setUploaderOnScreen] = useState(false);
    const [values, handleChange] = useStatefulFields();
    const [error, loading, handleSubmit] = useAuthSubmit("/updateAbout", values);

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
                    <input
                            type="text"
                            name="first"
                            className="form__input"
                            autoComplete="off"
                            placeholder={infoUser.first}
                            // value={infoUser.first}
                            // readOnly={!allowEdition}
                            onChange={e => handleChange(e)}
                    />
                    
                    <input
                            type="text"
                            name="last"
                            className="form__input"
                            autoComplete="off"
                            placeholder={infoUser.last}
                            // value={infoUser.last}
                            // readOnly={!allowEdition}
                            onChange={e => handleChange(e)}
                    />

                    <textarea
                        name="description"
                        id="bio-text"
                        rows="10"
                        cols="50"
                        value={infoUser.description}
                        onChange={e => handleChange(e)}
                    ></textarea>

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
