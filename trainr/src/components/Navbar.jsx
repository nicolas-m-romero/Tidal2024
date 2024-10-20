import React from 'react'
import Button from './Button'
import Logo from '../assets/react.svg';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="font-h1 flex justify-between items-center py-4 px-6">
        {/* Left Side (Logo) */}
        <div className="flex items-center">
            <img src={Logo} />
        </div>
    
        {/* Right Side (Buttons) */}
        <div className="flex space-x-6">
            <Button title="Generate" onClick={() => navigate('/generate')}></Button>
            <Button title="Dashboard" onClick={() => navigate('/dashboard')}></Button>
            <Button title="Form Check" onClick={() => navigate('/')}></Button>
        </div>
    </nav>
    )
}

export default Navbar