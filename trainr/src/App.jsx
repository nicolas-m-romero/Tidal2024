// Import assets

//import App.css
import './App.css'

// Import for routing
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// Import screens
import Landing from './screens/Landing'
import Generate from './screens/Generate'
import Dashboard from './screens/Dashboard'
import FormCheck from './screens/FormCheck'

function App() {

  return (
    <Router>
          {/* Define routes */}
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/generate" element={<Generate />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/formcheck" element={<FormCheck />} />
          </Routes>
    </Router>
  )
}

export default App
