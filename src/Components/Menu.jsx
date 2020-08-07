import React from 'react';
import { Link } from "react-router-dom";

const Menu = () => {

    return(
        <div className="menu">
            <img src='./logo.jpg' alt='logo' className="menu__logo"></img>
            <Link to='/about' className="menu__link">About</Link>
            <Link to='/contact' className="menu__link">Contact</Link>
            <Link to='/publications' className="menu__link">Publications</Link>
            <Link to='/projects' className="menu__link">Projects</Link>

            <div className="menu__social-container">
                <a href="https://www.facebook.com/fer.eisfeld" target="__blank">
                    <img src="./facebook.png" alt="Facebook" className="menu__social-item"></img>
                </a>
                <a href="https://www.instagram.com/fer.eisfeld" target="__blank">
                    <img src="./instagram.png" alt="Instagram" className="menu__social-item"></img>
                </a>
                <a href="https://www.linkedin.com/in/fernanda-eisfeld/" target="__blank">
                    <img src="./linkedin.png" alt="Linkedin" className="menu__social-item"></img>
                </a>
            </div>
        </div>
    )
}

export default Menu;