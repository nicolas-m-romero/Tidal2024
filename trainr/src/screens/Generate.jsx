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

    const [workoutDescription, setWorkoutDescription] = useState('');

    // Click handler function
    const handleGenerateWorkout = async () => {
        const query = `${workoutDescription}`
        const url = `http://127.0.0.1:5000/retrieve?query=${encodeURIComponent(query)}`;
        console.log(url);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                <Navbar />
                <Header title="Workout Generation" description="Enter your desired workout below; the more detailed the better." />
                <div className="flex flex-row gap-5 py-5">
                    <Input label="Workout Title" placeholder="Workout Title e.g. (Sprints)" />
                    <IntensitySelect />
                    <DurationSelect />
                </div>
                <div className="flex flex-col gap-5">
                    <Textarea label="Workout Description" placeholder="Workout details here e.g. Basketball, fencing, rock climbing" 
                    onChange={(e) => setWorkoutDescription(e.target.value)}
                    />
                    <Button title="Generate Workout" onClick={handleGenerateWorkout}  />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Generate