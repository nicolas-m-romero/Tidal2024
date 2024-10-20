import React from 'react';

const WorkoutCard = ({ workout }) => {
  // Parse the Response JSON string into a JavaScript object
  const workoutDetails = JSON.parse(workout.Response);
  const sources = workout.Sources;

  return (
    <div className="bg-primary100 text-bg100 p-6 rounded-lg w-96 font-sans shadow-md"> {/* Adjusted width here */}
      {/* Display the title of the workout */}
      <h2 className="text-xl font-bold mb-4">{workout.title}</h2>

      {/* Render workout details */}
      {Object.entries(workoutDetails).map(([day, exercises], index) => (
        <div key={index} className="mb-4">
          <h3 className="text-lg font-semibold mb-2">{day}</h3>
          <ul className="list-none">
            {exercises.map((exercise, idx) => (
              <li key={idx} className="mb-1">
                {/* Display exercise details */}
                {exercise.exercise} - {exercise.sets}×{exercise.reps} (Rest: {exercise.rest}, Weight: {exercise.weight})
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Render sources */}
      <div className="mt-4">
        <h4 className="text-lg font-semibold">Sources:</h4>
        <ul className="list-disc pl-5">
          {sources.map((source, idx) => (
            <li key={idx}>{source}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkoutCard;
