// Import components
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroCard from '../components/HeroCard'

function Landing() {

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                <Navbar />
                <HeroCard />
                <h1 className="text-4xl font-h1 text-primary100 text-left my-8">The future of sports training...</h1>
                <h2 className="text-lg"> With <span className="font-bold">TrainR</span>, professional guidance is only <span className="font-bold">one query away</span>. 
                    TrainR provides users with highly specific state-of-the-art 
                    training plans around the clock and to any location. All you need is a connection to Wi-Fi.
                </h2>
            </div>
            <Footer />
        </div>
    )
}

export default Landing
