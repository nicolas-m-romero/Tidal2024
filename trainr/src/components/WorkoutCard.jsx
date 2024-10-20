import React, { useState } from 'react';

const WorkoutCard = ({ workout, onClick }) => {
    // Parse the Response JSON string into a JavaScript object
    const workoutDetails = JSON.parse(workout.Response);
    const sources = workout.Sources;

    // State to manage if the card is starred
    const [isStarred, setIsStarred] = useState(false);

    // Toggle the starred state
    const handleStarClick = (e) => {
        e.stopPropagation(); // Prevent triggering the card click event
        setIsStarred(!isStarred);
    };

    return (
        <div
            className="bg-primary100 text-bg100 p-4 rounded-lg w-128 h-64 flex flex-col justify-between items-start font-sans 
                        shadow-lg cursor-pointer 
                        transform transition-transform duration-300 
                        hover:scale-105 hover:shadow-2xl"
            onClick={onClick}
        >
            {/* Display the title of the workout */}
            <h2 className="text-xl font-bold mb-2 flex justify-between w-full">
                {workout.title}
                {/* Star Icon */}
                <span onClick={handleStarClick} className="cursor-pointer">
                    {isStarred ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 .587l3.668 7.431 8.263 1.205-5.975 5.184 1.415 8.207L12 18.896l-7.371 3.872 1.415-8.207-5.975-5.184 8.263-1.205z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.668 7.431 8.263 1.205-5.975 5.184 1.415 8.207L12 18.896l-7.371 3.872 1.415-8.207-5.975-5.184 8.263-1.205z" />
                        </svg>
                    )}
                </span>
            </h2>

            {/* Display the first three exercises */}
            <div className="h-24 overflow-hidden"> {/* Set fixed height for the exercise container */}
                {workoutDetails && Object.values(workoutDetails).flat().length > 0 ? (
                    Object.values(workoutDetails).flat().slice(0, 6).map((exercise, idx) => ( // Get the first 6 exercises
                        <p key={idx} className="text-sm mb-1">
                            {exercise.exercise} - {exercise.sets}×{exercise.reps}
                        </p>
                    ))
                ) : (
                    <p>No exercises available.</p>
                )}
            </div>
        </div>
    );
};

export default WorkoutCard;
