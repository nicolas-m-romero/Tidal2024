// import React from 'react';

// const WorkoutCard = ({ workout }) => {
//   // Parse the Response JSON string into a JavaScript object
//   const workoutDetails = JSON.parse(workout.Response);
//   const sources = workout.Sources;

//   return (
//     <div className="bg-primary100 text-bg100 p-6 rounded-lg w-96 font-sans shadow-lg"> {/* Updated to shadow-lg for a stronger shadow */}
//       {/* Display the title of the workout */}
//       <h2 className="text-xl font-h1 mb-4">{workout.title}</h2>

//       {/* Render workout details */}
//       {Object.entries(workoutDetails).map(([day, exercises], index) => (
//         <div key={index} className="mb-4">
//           <h3 className="text-lg font-semibold mb-2">{day}</h3>
//           <ul className="list-none">
//             {exercises.map((exercise, idx) => (
//               <li key={idx} className="mb-1">
//                 {/* Display exercise details */}
//                 {exercise.exercise} - {exercise.sets}×{exercise.reps} (Rest: {exercise.rest}, Weight: {exercise.weight})
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}

//       {/* Render sources */}
//       <div className="mt-4">
//         <h4 className="text-lg font-semibold">Sources:</h4>
//         <ul className="list-disc pl-5">
//           {sources.map((source, idx) => (
//             <li key={idx}>{source}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default WorkoutCard;
import React from 'react';

const WorkoutCard = ({ workout, onClick }) => {
    // Parse the Response JSON string into a JavaScript object
    const workoutDetails = JSON.parse(workout.Response);
    const sources = workout.Sources;

    return (
        <div className="bg-primary100 text-bg100 p-4 rounded-lg w-64 h-64 flex flex-col justify-between items-start font-sans shadow-lg cursor-pointer" onClick={onClick}>
            {/* Display the title of the workout */}
            <h2 className="text-xl font-bold mb-2">{workout.title}</h2>

            {/* Display a snippet of the first exercise or text */}
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                {workoutDetails && Object.values(workoutDetails).flat().length > 0 ? (
                    <p>{workoutDetails[Object.keys(workoutDetails)[0]][0].exercise} - {workoutDetails[Object.keys(workoutDetails)[0]][0].sets}×{workoutDetails[Object.keys(workoutDetails)[0]][0].reps}</p>
                ) : (
                    <p>No exercises available.</p>
                )}
            </div>
        </div>
    );
};

export default WorkoutCard;

