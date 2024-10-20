import React from 'react'

import '../App.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Input } from '../components/Input'
import { Select } from '../components/Select'
import { Textarea } from '../components/TextArea'
import Button from '../components/Button'
import { DurationSelect } from '../components/DurationSelect'
import { IntensitySelect } from '../components/IntensitySelect'
import { useState } from 'react';

function Generate() {
    const [workoutTitle, setWorkoutTitle] = useState(''); // State for the workout title
    const [workoutDescription, setWorkoutDescription] = useState('');
    const [popupVisible, setPopupVisible] = useState(false); // State for the popup message

    const loadWorkouts = () => {
        const storedWorkouts = JSON.parse(localStorage.getItem('workouts')) || [];
        return storedWorkouts;
    };

    // Click handler function
    const handleGenerateWorkout = async () => {
        const query = `${workoutDescription} THe workout should have a high intensity and last for 60 minutes`
        const url = `http://127.0.0.1:5000/retrieve?query=${encodeURIComponent(query)}`;
        console.log(url);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            console.log(data.Response);
            console.log(data.Sources)

            // Save the generated workout to localStorage
            const existingWorkouts = loadWorkouts();
            console.log(existingWorkouts);
            existingWorkouts.push({ title: workoutTitle, ...data }); // Include the title in the workout object

            localStorage.setItem('workouts', JSON.stringify(existingWorkouts)); // Update localStorage

            setPopupVisible(true);
            setTimeout(() => {
                setPopupVisible(false); // Hide after 3 seconds
            }, 3000);
            // Optionally, you can trigger a refresh of the dashboard
            window.dispatchEvent(new Event('storage')); // This will trigger the storage event for other components
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                <Navbar />
                <Header title="Workout Generation" description="Enter your desired workout below; the more detailed the better." />
                
                {/* Popup message */}
                {popupVisible && (
                    <div className="fixed top-5 right-5 bg-green-500 text-white p-4 rounded shadow-md">
                        Card has been added!
                    </div>
                )}
                
                <div className="flex flex-row gap-5 py-5">
                    <Input label="Workout Title" placeholder="Workout Title e.g. (Sprints)" 
                    onChange={(e) => setWorkoutTitle(e.target.value)} // Update title state
                    />
                    <IntensitySelect />
                    <DurationSelect />
                </div>
                <div className="flex flex-col gap-5 py-5">
                    <Textarea label="Workout Description" placeholder="Workout details here e.g. Basketball, fencing, rock climbing" 
                    onChange={(e) => setWorkoutDescription(e.target.value)}
                    />
                    <Button title="Generate Workout" onClick={handleGenerateWorkout} className />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Generate