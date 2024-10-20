import React from 'react'

import '../App.css'

// Import components
import Navbar from '../components/Navbar'

function FormCheck() {

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                <Navbar />
            </div>
        </div>
    )
}

export default FormCheck