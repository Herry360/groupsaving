import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Dashboard from './screens/Dashboard';
import CreateGoal from './screens/CreateGoal';
import GoalDetails from './screens/GoalDetails';
import Contribution from './screens/Contribution';
import History from './screens/History';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* GitHub showcase landing page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Core app functionality */}
          <Route path="/dashboard" element={<><Navbar /><main className="main-content"><Dashboard /></main></>} />
          <Route path="/create-goal" element={<><Navbar /><main className="main-content"><CreateGoal /></main></>} />
          <Route path="/goal/:id" element={<><Navbar /><main className="main-content"><GoalDetails /></main></>} />
          <Route path="/contribute/:id" element={<><Navbar /><main className="main-content"><Contribution /></main></>} />
          <Route path="/history" element={<><Navbar /><main className="main-content"><History /></main></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
