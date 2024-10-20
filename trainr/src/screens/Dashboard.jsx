import React, { useEffect, useState } from 'react';
import '../App.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Header from '../components/Header';
import WorkoutCard from '../components/WorkoutCard'; // Import WorkoutCard
import Modal from '../components/Modal'; // Import Modal

function Dashboard() {
    const [workouts, setWorkouts] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const loadWorkouts = () => {
        const storedWorkouts = JSON.parse(localStorage.getItem('workouts')) || [];
        return storedWorkouts;
    };

    useEffect(() => {
        setWorkouts(loadWorkouts());
    }, []);

    const handleClearWorkouts = () => {
        localStorage.removeItem('workouts'); // Remove the workouts from local storage
        setWorkouts([]); // Clear the workouts state
        alert('Workouts cleared from local storage!'); // Optional: Alert the user
    };

    const handleCardClick = (workout) => {
        setSelectedWorkout(workout);
        setIsModalOpen(true); // Open the modal
    };

    const closeModal = () => {
        setIsModalOpen(false); // Close the modal
        setSelectedWorkout(null); // Reset selected workout
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                <Navbar />
                <Header title="Dashboard" description="Welcome to your dashboard. Here you can view your saved workouts." />
                
                <button onClick={handleClearWorkouts} className="bg-red-500 text-white p-2 rounded mb-4 pl-4 pr-4">
                    Clear Workouts
                </button>

                <div className="flex flex-wrap gap-5 justify-center p-5">
                    {/* Render workouts in reverse order */}
                    {workouts.slice().reverse().map((workout, index) => (
                        <div className="w-1/3 flex-grow" key={index}> {/* Use w-1/3 for equal width */}
                            <WorkoutCard workout={workout} onClick={() => handleCardClick(workout)} />
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
            <Modal isOpen={isModalOpen} onClose={closeModal} workout={selectedWorkout} /> {/* Render the modal */}
        </div>
    );
}

export default Dashboard;
