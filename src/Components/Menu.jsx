import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import content from '../content.json';
import axios from 'axios';

const Menu = (props) => {
    const [language, setLanguage] = useState(props.lang);
    let other;
    if (props.lang === 'en') {
        other = 'pt'
    } else {
        other = 'en'
    }
    const [otherLang, setOtherLang] = useState(other);
    const text = content.menu;

    // useEffect(() => {
    //     (async () => {
    //         const {data} = await axios.get('/checkLang');
    //         // console.log('data from /checkLang = ', data);
    //         setLanguage(data.language);

    //         if (data.language === 'en') {
    //             setOtherLang('pt');
    //         } else {
    //             setOtherLang('en');
    //         }
            
    //     })();

    // }, []);

    const changeLanguage = () => {
        (async () => {
            const {data} = await axios.get('/changeLang');
            console.log('data from /changeLang = ', data);
            setLanguage(data.language);

            if (data.language === 'en') {
                setOtherLang('pt');
            } else {
                setOtherLang('en');
            }
        })();
    };
    // console.log(content.menu);

    return(
        <div className="menu">
            <Link to='/'>
                <img src='/logo.jpg' alt='logo' className="menu__logo"></img>
            </Link>
            <Link to={{
                pathname: '/about',
                state: {
                    aboutProps: {
                        name: 'testing about',
                    }
                }
            }} className="menu__link">{text[language].about}</Link>
            <Link to='/contact' className="menu__link">{text[language].contact}</Link>
            <Link to='/publications' className="menu__link">{text[language].publications}</Link>
            <Link to='/projects' className="menu__link">{text[language].projects}</Link>

            <div className="menu__language-container">
                {/* <a href="https://www.facebook.com/fer.eisfeld" target="__blank">
                    <img src="./facebook.png" alt="Facebook" className="menu__social-item"></img>
                </a>
                <a href="https://www.instagram.com/fer.eisfeld" target="__blank">
                    <img src="./instagram.png" alt="Instagram" className="menu__social-item"></img>
                </a>
                <a href="https://www.linkedin.com/in/fernanda-eisfeld/" target="__blank">
                    <img src="./linkedin.png" alt="Linkedin" className="menu__social-item"></img>
                </a> */}
                <img src={`/${otherLang}.png`} alt={`${otherLang}`} className="menu__language-flag" onClick={() => changeLanguage()}/>
                {/* <img src="./en.png" alt="Brasil" className="menu__language-flag" onClick={() => changeLanguage()}/> */}
            </div>
        </div>
    )
}

export default Menu;