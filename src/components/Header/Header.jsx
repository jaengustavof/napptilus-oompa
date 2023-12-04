import React from 'react';
import './header.scss';
import Navigation from './Navigation/Navigation';

const Header = () => {
    return (
        <header>
            <div className='app-container'>
                <Navigation/>
            </div>
        </header>
    );
}

export default Header;
