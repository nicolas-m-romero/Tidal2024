import React from 'react'
import Button from './Button'
import Logo from '../assets/logo.png';
import LogoGif from '../assets/logogif.gif'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate('/'); // Navigate to the landing page
    };
    return (
        <nav className="font-h1 flex justify-between items-center py-4 px-6">
        {/* Left Side (Logo) */}
        <div className="flex items-center">
                <img 
                    src={Logo} 
                    className="w-[70px] h-auto cursor-pointer" // Added cursor-pointer for better UX
                    alt="Logo"
                    onMouseOver={(e) => e.currentTarget.src = LogoGif} // Change to GIF on hover
                    onMouseOut={(e) => e.currentTarget.src = Logo} // Change back to static on mouse out
                    onClick={handleLogoClick} // Navigate on logo click
                />
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