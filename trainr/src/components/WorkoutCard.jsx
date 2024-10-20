import React from 'react';

const WorkoutCard = ({ workout }) => {
  return (
    <div className="bg-primary100 text-bg100 p-6 rounded-lg w-80 font-sans shadow-md">
      <h2 className="text-xl font-bold mb-4">{workout.title}</h2>
      {workout.days.map((day, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-lg font-semibold mb-2">{day.day}</h3>
          <ul className="list-none">
            {day.exercises.map((exercise, idx) => (
              <li key={idx} className="mb-1">
                {exercise.name} {exercise.sets}×
                {exercise.reps ? exercise.reps : exercise.duration}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default WorkoutCard;