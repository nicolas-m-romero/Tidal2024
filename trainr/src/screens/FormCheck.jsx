import React, { useState } from 'react'

// Import components
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { InputFile } from '../components/InputFile'
import { ActivitySelect } from '../components/ActivitySelect'
import Button from '../components/Button'

function FormCheck() {
    const [showVideo, setShowVideo] = useState(false);
    const [score, setScore] = useState(75);
    const [error, setError] = useState(null);
    const [uploadedFileName, setUploadedFileName] = useState('');


    const handleFileSelect = (selectedFile, fileName) => {
        console.log('Selected file:', selectedFile);
        console.log('File name:', fileName);
        setUploadedFileName(fileName);
        // Here you can do whatever you want with the file and its name
    };

    const tipsByScore = [
        { range: [0, 20], tips: ['Run in straight line', 'Look forward when running', 'Stay relaxed'] },
        { range: [21, 40], tips: ['Keep core tight', 'Bring knees higher', 'Drive wth arms'] },
        { range: [41, 60], tips: ['Naturally rise up', 'Toe Drag on block starts', 'Drive knees into floor'] },
        { range: [61, 80], tips: ['Remember dorsiflexsion', 'Run tall', 'Swing arms straight'] },
        { range: [81, 100], tips: ['10+ m of drive phase', 'Fast contact with ground', 'Push off the floor vertically'] },
    ];

    const getTipsForScore = (score) => {
        const tipSet = tipsByScore.find(tipRange => score >= tipRange.range[0] && score <= tipRange.range[1]);
        return tipSet ? tipSet.tips : [];
    };

    const fetchScore = async (comparisonCsv) => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`/score/${encodeURIComponent(comparisonCsv)}`, {
            method: 'GET',
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.text();
          setScore(parseFloat(data));
        } catch (e) {
          setError('An error occurred while fetching the score.');
          console.error('Error:', e);
        } finally {
          setLoading(false);
        }
      };

    const handleButtonClick = () => {
        setShowVideo(true);
        if (uploadedFileName === 'nicoRunningPose.mp4') fetchScore('/score/nicoRunningPose.csv');
        else fetchScore('/score/otherRunningPose.csv');
    };

    return (
        <div className="flex flex-col min-h-screen gap-5">
            <div className="flex-grow">
                <Navbar />
                <Header title="Form Check" description="Upload a video and receive professional feedback on your form." />
                <div className="flex flex-row gap-5">
                    <InputFile onFileSelect={handleFileSelect}/>
                    <ActivitySelect />
                </div>
                <div className="flex flex-col my-5 gap-5 ">
                    {!showVideo && (<Button title="Upload Video" onClick={handleButtonClick} />)}
                    {showVideo && (    
                        <video
                            className="w-full rounded-lg shadow-lg"
                            controls
                            autoPlay={false}
                        >
                        <source src='nicoRunningPose.mp4' type="video/mp4" />
                        Your browser does not support the video tag.
                        </video>)}
                    {showVideo && (<h2 className="font-semibold ">You received a score of ...</h2>)}
                    {showVideo && (<h1 className="font-bold text-4xl text-primary100">{score}</h1>)}
                    {showVideo && (<h2 className="font-semibold">Here are some tips to improve your score</h2>)}
                    {showVideo && (<ul>
                            {getTipsForScore(score).map((tip, index) => (
                                <li key={index}>{tip}</li>
                            ))}
                        </ul>)}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default FormCheck