import React from 'react'
import Button from './Button'
import Logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="font-h1 flex justify-between items-center py-4 px-6">
        {/* Left Side (Logo) */}
        <div className="flex items-center">
            <a onClick={() => navigate('/')}>
            <img 
                src={Logo} 
                className="w-[70px] h-auto" 
                alt="Logo"
            />
            </a>
        </div>
    
        {/* Right Side (Buttons) */}
        <div className="flex space-x-6">
            <Button title="Generate" onClick={() => navigate('/generate')}></Button>
            <Button title="Dashboard" onClick={() => navigate('/dashboard')}></Button>
            <Button title="Form Check" onClick={() => navigate('/formcheck')}></Button>
        </div>
    </nav>
    )
}

export default Navbar