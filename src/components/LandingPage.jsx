import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: "🎯",
      title: "Set Group Goals",
      description: "Create savings goals with friends, family, or colleagues"
    },
    {
      icon: "📊",
      title: "Track Progress",
      description: "Visual progress bars and real-time contribution tracking"
    },
    {
      icon: "💰",
      title: "Easy Contributions",
      description: "Simple contribution entry with smart amount suggestions"
    },
    {
      icon: "📈",
      title: "Detailed Analytics",
      description: "Charts, reports, and insights on your savings journey"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            💰 <span className="gradient-text">GroupSavings</span>
          </h1>
          <p className="hero-subtitle">
            The smart way to save money together with friends, family, and colleagues
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">3</span>
              <span className="stat-label">Sample Goals</span>
            </div>
            <div className="stat">
              <span className="stat-number">R35K</span>
              <span className="stat-label">Total Saved</span>
            </div>
            <div className="stat">
              <span className="stat-number">7</span>
              <span className="stat-label">Contributors</span>
            </div>
          </div>
          <div className="hero-actions">
            <button 
              onClick={() => navigate('/dashboard')} 
              className="cta-primary"
            >
              Try Demo
            </button>
            <button 
              onClick={() => navigate('/create-goal')} 
              className="cta-secondary"
            >
              Create Goal
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="feature-showcase">
            <div className="feature-card active">
              <div className="feature-icon">{features[currentFeature].icon}</div>
              <h3>{features[currentFeature].title}</h3>
              <p>{features[currentFeature].description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h2>See It In Action</h2>
        <div className="demo-grid">
          <div className="demo-card" onClick={() => navigate('/dashboard')}>
            <h3>📊 Dashboard</h3>
            <p>Overview of all your savings goals and progress</p>
          </div>
          <div className="demo-card" onClick={() => navigate('/history')}>
            <h3>📈 Analytics</h3>
            <p>Detailed charts and contribution history</p>
          </div>
          <div className="demo-card" onClick={() => navigate('/create-goal')}>
            <h3>➕ Create Goal</h3>
            <p>Set up new group savings goals easily</p>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2>Why Choose GroupSavings?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;