import React from 'react';
import Hero from '../assets/Hero.png';

const HeroCard = ({ heightClass = "h-96" }) => {
    return (
        <div 
            className={`w-full bg-cover bg-center shadow-lg rounded-lg text-center flex flex-col justify-center items-center my-16 ${heightClass}`}
            style={{ backgroundImage: `url(${Hero})` }}
        >
            <h1 className="text-8xl font-bold mt-4 text-white">TrainR</h1>
        </div>
    );
};

export default HeroCard;