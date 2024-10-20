import React from 'react'

const Header = ({title, description}) => {
    return (
        <div className="my-16">
            <h1 className="text-5xl font-bold my-4">{title}</h1>
            <p className="text-xl">{description}</p>
        </div>
    )
}

export default Header