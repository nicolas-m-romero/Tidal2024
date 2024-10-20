import React from 'react'

import '../App.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Header from '../components/Header'
import WorkoutCard from '../components/WorkoutCard'
import { useState, useEffect } from 'react';

function Dashboard() {
    const [workouts, setWorkouts] = useState([]); // Initialize workouts state

    // Load workouts from localStorage
    const loadWorkouts = () => {
        const storedWorkouts = JSON.parse(localStorage.getItem('workouts')) || [];
        return storedWorkouts;
    };
    useEffect(() => {
        setWorkouts(loadWorkouts());
        
        // Listen for changes in localStorage
        const handleStorageChange = () => {
            setWorkouts(loadWorkouts());
        };

        window.addEventListener('storage', handleStorageChange);

        // Clean up the event listener
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleClearWorkouts = () => {
        localStorage.removeItem('workouts'); // Remove the workouts from local storage
        setWorkouts([]); // Clear the workouts state
        alert('Workouts cleared from local storage!'); // Optional: Alert the user
    };
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                <Navbar />
                <Header title="Dashboard" description="Welcome to your dashboard. Here you can view your saved workouts." />
                <button onClick={handleClearWorkouts} className="bg-red-500 text-white p-2 rounded mb-4">
                    Clear 
                </button>
                <div className="flex flex-wrap gap-5 p-5">
                    {/* Render workouts in reverse order */}
                    {workouts.slice().reverse().map((workout, index) => ( // Use slice to avoid mutating the original array
                        <WorkoutCard key={index} workout={workout} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Dashboard