import React from 'react'

import '../App.css'

// Import components
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { InputFile } from '../components/InputFile'
import { ActivitySelect } from '../components/ActivitySelect'
import Button from '../components/Button'

function FormCheck() {

    return (
        <div className="flex flex-col min-h-screen gap-5">
            <div className="flex-grow">
                <Navbar />
                <Header title="Form Check" description="Here you can upload a video of your workout for professional feedback." />
                <div className="flex flex-row gap-5">
                    <InputFile />
                    <ActivitySelect />
                </div>
                <div className="flex flex-col my-5 gap-5">
                    <Button title="Upload Video" />
                    <h2 className="font-bold ">You received a score of ...</h2>
                    <h1></h1>
                    <h2 className="font-bold">Here are some tips to improve your score</h2>
                    <ul>
                        <li>Tip 1</li>
                        <li>Tip 2</li>
                        <li>Tip 3</li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default FormCheck