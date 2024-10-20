import React from 'react';

const Footer = () => {
    return (
        <footer className="flex flex-col justify-end items-start min-h-full max-w-[80ch] px-4 mx-auto mb-4 rounded-lg w-full transition-all duration-300 ease-in-out">
            {/* Left Column */}
            <div className="flex flex-col items-start justify-center transition-all duration-300 ease-in-out">
                <p className="font-bold text-lg my-2">Thank you for stopping by!</p>
                {/* <p className="my-2 "> Hope you enjoyed the project (◕‿↼)</p> */}
                {/* <p className="my-2">Made by Nicolas Romero, Anish Karthik, Keshav Dharshan, and Annie Li :)</p> */}
            </div>
        </footer>
    );
};

export default Footer;
