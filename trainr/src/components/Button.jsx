import React from 'react';

const Button = ({title, onClick}) => {
    return (
        <button class="rounded-lg 
                        border 
                        border-transparent 
                        px-4 py-2 text-base font-medium 
                        bg-[#1a1a1a] cursor-pointer transition-colors duration-200
                        hover:border-[#646cff] focus:outline focus:outline-4 focus:outline-webkit-focus-ring-color"
                onClick={onClick}>
            {title}
        </button>
    )
}

export default Button