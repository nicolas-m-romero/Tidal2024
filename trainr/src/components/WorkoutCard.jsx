import React from 'react';

const WorkoutCard = ({ workout, onClick }) => {
    // Parse the Response JSON string into a JavaScript object
    const workoutDetails = JSON.parse(workout.Response);
    const sources = workout.Sources;
    return (
        <div
            className="bg-primary100 text-bg100 p-4 rounded-lg w-128 h-64 flex flex-col justify-between items-start font-sans 
                        shadow-lg cursor-pointer 
                        transform transition-transform duration-300 
                        hover:scale-105 hover:shadow-2xl"
            onClick={onClick}
        >
            {/* Display the title of the workout */}
            <h2 className="text-xl font-bold mb-2">{workout.title}</h2>

            {/* Display the first three exercises */}
            <div className="h-24 overflow-hidden"> {/* Set fixed height for the exercise container */}
                {workoutDetails && Object.values(workoutDetails).flat().length > 0 ? (
                    Object.values(workoutDetails).flat().slice(0, 6).map((exercise, idx) => ( // Get the first 3 exercises
                        <p key={idx} className="text-sm mb-1">
                            {exercise.exercise} - {exercise.sets}×{exercise.reps}
                        </p>
                    ))
                ) : (
                    <p>No exercises available.</p>
                )}
                {/* Display sources at the bottom */}
              <div className="mt-2 text-sm text-gray-600"> {/* Optional: Style the sources */}
                  <h4 className="font-semibold">Sources:</h4>
                  <ul className="list-disc pl-5">
                      {sources.map((source, index) => (
                          <li key={index}>{source}</li>
                      ))}
                  </ul>
              </div>
            </div>
        </div>
    );
};

export default WorkoutCard;
