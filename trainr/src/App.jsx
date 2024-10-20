// Import assets

//import App.css
import './App.css'

// Import for routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import screens
import Generate from './screens/Generate'
import Dashboard from './screens/Dashboard'
import FormCheck from './screens/FormCheck'


// Import components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HeroCard from './components/HeroCard'

function App() {

  return (
    <Router>

      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Navbar />

          {/* Define routes */}
          <Routes>
            {/* <Route path="/" element={<App />} /> */}
            <Route path="/screens/Generate" element={<Generate />} />
            <Route path="/screens/Dashboard" element={<Dashboard />} />
            <Route path="/screens/FormCheck" element={<FormCheck />} />
          </Routes>

          <HeroCard />
          <h1 className="text-4xl font-bold text-primary100 text-left my-8">The future of sports training...</h1>
          <h2 className="text-lg"> With <span className="font-bold">TrainR</span>, professional guidance is only <span className="font-bold">one query away</span>. 
              TrainR provides users with highly specific state-of-the-art 
              training plans around the clock and to any location. All you need is a connection to Wi-Fi.
          </h2>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
