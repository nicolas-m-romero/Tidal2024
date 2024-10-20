import React from 'react';
import Gif from '../assets/footergif.gif'; // Import your GIF here

const Footer = () => {
    return (
        <footer className="flex justify-between items-start min-h-full max-w-[80ch] px-4 mx-auto mb-4 rounded-lg w-full transition-all duration-300 ease-in-out pt-4">
            {/* Left Column */}
            <div className="flex flex-col items-start justify-center transition-all duration-300 ease-in-out">
                <p className="font-bold text-lg my-2">Thank you for stopping by!</p>
                {/* <p className="my-2 "> Hope you enjoyed the project (◕‿↼)</p> */}
                {/* <p className="my-2">Made by Nicolas Romero, Anish Karthik, Keshav Dharshan, and Annie Li :)</p> */}
            </div>

            {/* Right Column - Add the GIF */}
            <div className="flex items-center justify-center">
                <img src={Gif} alt="Footer GIF" className="w-[100px] h-auto" />
            </div>
        </footer>
    );
};

export default Footer;