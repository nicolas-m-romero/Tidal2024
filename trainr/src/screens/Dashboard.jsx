import React from 'react'

import '../App.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Header from '../components/Header'

function Dashboard() {

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                <Navbar />
                <Header title="Dashboard" description="Welcome to your dashboard. Here you can view your saved workouts." />
            </div>
            <Footer />
        </div>
    )
}

export default Dashboard