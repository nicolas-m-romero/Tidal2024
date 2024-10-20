import React from 'react'
import Button from './Button'
import { ReactComponent as Logo } from '../assets/react.svg';

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center py-4 px-6">
        {/* Left Side (Logo) */}
        {/* <div className="flex items-center">
            <Logo />
        </div>
     */}
        {/* Right Side (Buttons) */}
        <div className="flex space-x-6">
            <Button title="Generate" onClick={() => setCount((c) => c - 1)}></Button>
            <Button title="Dashboard" onClick={() => setCount((c) => c - 1)}></Button>
            <Button title="Form Check" onClick={() => setCount((c) => c - 1)}></Button>
        </div>
    </nav>
    )
}

export default Navbar