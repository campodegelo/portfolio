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
        </div>
    )
}

export default Menu;