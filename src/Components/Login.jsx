import React, {useState} from 'react';
// import {useAuthSubmit} from '../context/useAuthSubmit';
import {useStatefulFields} from '../context/useStatefulFields';
import axios from 'axios';

const Login = () => {
    const [values, handleChange] = useStatefulFields();
    const [error, setError] = useState();
    // const [loading, setLoading] = useState();
    // const [error, loading, handleSubmit] = useAuthSubmit('/login', values);

    const handleSubmit = () => {
        // setLoading(true);
        axios
          .post('/login', values)
          .then(({ data }) => {
            // setLoading(false);
            if (!data.success) {
              setError(true);
            } else {
              window.location.replace("/admin");
            }
          })
          .catch(err => {
            // setLoading(false);
            console.log("error in submit: ", err);
            setError(true);
          });
      };

    return (
        <div className="form">
            {error && (
                <div className="form__error">
                    You do NOT have permission for that!
                </div>
            )}
            
            <div className="form__group">
                <input
                    type="email"
                    name="email"
                    placeholder="email address"
                    className="form__input"
                    autoComplete="off"
                    onChange={e => handleChange(e)}
                ></input>
                <label htmlFor="email" className="form__label">Email Address</label>
            </div>

            <div className="form__group">
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="form__input"
                    autoComplete="off"
                  onChange={e => handleChange(e)}
                ></input>
                <label htmlFor="password" className="form__label">Password</label>
            </div>

            <button className="btn btn--white btn--animated" onClick={() => handleSubmit()}>login</button>
        </div>
    )
}

export default Login;
