import React from 'react'

import '../App.css'

// Import components
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Header from '../components/Header'

function FormCheck() {

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                <Navbar />
                <Header title="Form Check" description="Here you can upload a video of your workout for professional feedback." />
            </div>
            <div className="flex flex-col gap-5">
                
            </div>
            <Footer />
        </div>
    )
}

export default FormCheck