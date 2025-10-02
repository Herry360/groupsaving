import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>💰 GroupSavings</h2>
      </div>
      <div className="navbar-links">
        <Link 
          to="/dashboard" 
          className={location.pathname === '/dashboard' ? 'active' : ''}
        >
          Dashboard
        </Link>
        <Link 
          to="/create-goal" 
          className={location.pathname === '/create-goal' ? 'active' : ''}
        >
          Create Goal
        </Link>
        <Link 
          to="/history" 
          className={location.pathname === '/history' ? 'active' : ''}
        >
          History
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;