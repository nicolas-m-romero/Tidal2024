import React from 'react';

const Modal = ({ isOpen, onClose, workout }) => {
    if (!isOpen) return null; // Don't render if not open

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3 max-h-[80%] overflow-auto"> {/* Set max height and overflow */}
                <h2 className="text-xl font-bold mb-4">{workout.title}</h2>
                <div>
                    {Object.entries(JSON.parse(workout.Response)).map(([day, exercises], index) => (
                        <div key={index} className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">{day}</h3>
                            <ul className="list-none">
                                {exercises.map((exercise, idx) => (
                                    <li key={idx} className="mb-1">
                                        {exercise.exercise} - {exercise.sets}×{exercise.reps} (Rest: {exercise.rest}, Weight: {exercise.weight})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Close</button>
            </div>
        </div>
    );
};

export default Modal;
