import React from 'react'

import '../App.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroCard from '../components/HeroCard'

function Generate() {

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                <Navbar />
            <HeroCard />
        </div>
        <Footer />
        </div>
    )
}

export default Generate