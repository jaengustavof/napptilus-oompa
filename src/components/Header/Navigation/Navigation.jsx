import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navigation.scss'
import Logo from '../../../assets/imgs/icons/logo-umpa-loompa.png';

const Navigation = () => {
    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate('/'); // Navigate to the home route
    };


    return (
        <nav>
            <div className='logo-container' onClick={handleLogoClick}> 
                <img src={Logo} alt='Oompa Loompa logo' height='30px'/>
                <h5 className='app-logo'>Oompa Loompa's Crew</h5>
            </div>
        </nav>
    );
}

export default Navigation;
