import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import ContributionCard from '../components/ContributionCard';
import goalsData from '../data/goals.json';
import './GoalDetails.css';

const GoalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [goal, setGoal] = useState(null);
  const [remainingBalance, setRemainingBalance] = useState(0);

  useEffect(() => {
    const foundGoal = goalsData.find(g => g.id === parseInt(id));
    if (foundGoal) {
      setGoal(foundGoal);
      setRemainingBalance(foundGoal.target - foundGoal.current);
    }
  }, [id]);

  if (!goal) {
    return (
      <div className="goal-details">
        <div className="goal-not-found">
          <h2>Goal not found</h2>
          <p>The goal you're looking for doesn't exist.</p>
          <Link to="/" className="back-to-dashboard-btn">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntilDeadline = () => {
    const deadline = new Date(goal.deadline);
    const today = new Date();
    const timeDiff = deadline - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
  };

  const daysLeft = getDaysUntilDeadline();
  const isOverdue = daysLeft < 0;
  const isUrgent = daysLeft <= 7 && daysLeft >= 0;

  const getContributionStats = () => {
    const totalContributors = goal.participants.length;
    const activeContributors = new Set(goal.contributions.map(c => c.name)).size;
    const avgContribution = goal.contributions.length > 0 
      ? goal.current / goal.contributions.length 
      : 0;
    
    return {
      totalContributors,
      activeContributors,
      avgContribution
    };
  };

  const stats = getContributionStats();

  return (
    <div className="goal-details">
      <div className="goal-details-container">
        <div className="goal-header">
          <div className="header-left">
            <h1>{goal.name}</h1>
            <div className="goal-meta">
              <span className="created-date">
                Created: {formatDate(goal.createdDate)}
              </span>
              <span className={`deadline ${isOverdue ? 'overdue' : isUrgent ? 'urgent' : ''}`}>
                {isOverdue 
                  ? `Overdue by ${Math.abs(daysLeft)} days`
                  : `${daysLeft} days remaining`
                }
              </span>
              <span className={`status ${goal.status}`}>
                {goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
              </span>
            </div>
          </div>
          <div className="header-actions">
            <Link to={`/contribute/${goal.id}`} className="contribute-btn">
              Add Contribution
            </Link>
            <button onClick={() => navigate('/')} className="back-btn">
              Back to Dashboard
            </button>
          </div>
        </div>

        <div className="goal-progress-section">
          <div className="progress-card">
            <ProgressBar current={goal.current} target={goal.target} />
            <div className="progress-details">
              <div className="detail-item">
                <span className="label">Current Amount:</span>
                <span className="value current">R{goal.current.toLocaleString()}</span>
              </div>
              <div className="detail-item">
                <span className="label">Target Amount:</span>
                <span className="value target">R{goal.target.toLocaleString()}</span>
              </div>
              <div className="detail-item">
                <span className="label">Remaining:</span>
                <span className="value remaining">R{remainingBalance.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="goal-stats">
          <div className="stat-item">
            <h3>Total Participants</h3>
            <p>{stats.totalContributors}</p>
          </div>
          <div className="stat-item">
            <h3>Active Contributors</h3>
            <p>{stats.activeContributors}</p>
          </div>
          <div className="stat-item">
            <h3>Average Contribution</h3>
            <p>R{stats.avgContribution.toLocaleString()}</p>
          </div>
          <div className="stat-item">
            <h3>Total Contributions</h3>
            <p>{goal.contributions.length}</p>
          </div>
        </div>

        <div className="participants-section">
          <h2>Participants</h2>
          <div className="participants-list">
            {goal.participants.map((participant, index) => {
              const participantContributions = goal.contributions.filter(c => c.name === participant.name);
              const totalContributed = participantContributions.reduce((sum, c) => sum + c.amount, 0);
              const hasContributed = participantContributions.length > 0;
              
              return (
                <div key={index} className={`participant-card ${hasContributed ? 'has-contributed' : 'pending'}`}>
                  <div className="participant-info">
                    <div className="participant-header">
                      <span className="participant-avatar">{participant.avatar}</span>
                      <h4>{participant.name}</h4>
                      <span className="participant-role">{participant.role}</span>
                    </div>
                    <p>Total: R{totalContributed.toLocaleString()}</p>
                    <p>Contributions: {participantContributions.length}</p>
                  </div>
                  <div className="participant-status">
                    {hasContributed ? (
                      <span className="status-badge contributed">✓ Contributed</span>
                    ) : (
                      <span className="status-badge pending">⏳ Pending</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="contributions-section">
          <div className="contributions-header">
            <h2>Contribution History</h2>
            <Link to={`/contribute/${goal.id}`} className="add-contribution-btn">
              + Add Contribution
            </Link>
          </div>
          
          {goal.contributions.length === 0 ? (
            <div className="no-contributions">
              <p>No contributions yet. Be the first to contribute!</p>
              <Link to={`/contribute/${goal.id}`} className="first-contribution-btn">
                Make First Contribution
              </Link>
            </div>
          ) : (
            <div className="contributions-list">
              {goal.contributions
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map(contribution => (
                  <ContributionCard 
                    key={contribution.id} 
                    contribution={contribution}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalDetails;