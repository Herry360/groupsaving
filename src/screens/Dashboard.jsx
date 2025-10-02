import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import goalsData from '../data/goals.json';
import './Dashboard.css';

const Dashboard = () => {
  const [goals, setGoals] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    const activeGoals = goalsData.filter(goal => goal.status === 'active');
    setGoals(activeGoals);
    
    const total = activeGoals.reduce((sum, goal) => sum + goal.current, 0);
    setTotalBalance(total);
  }, []);

  const getUpcomingReminders = () => {
    const today = new Date();
    const reminders = goals.filter(goal => {
      const deadline = new Date(goal.deadline);
      const timeDiff = deadline - today;
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      return daysDiff <= 30 && daysDiff > 0;
    });
    return reminders;
  };

  const upcomingReminders = getUpcomingReminders();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <Link to="/create-goal" className="create-goal-btn">
          + Create New Goal
        </Link>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Balance</h3>
          <p className="stat-value">R{totalBalance.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <h3>Active Goals</h3>
          <p className="stat-value">{goals.length}</p>
        </div>
        <div className="stat-card">
          <h3>Upcoming Deadlines</h3>
          <p className="stat-value">{upcomingReminders.length}</p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="active-goals">
          <h2>Active Goals</h2>
          {goals.length === 0 ? (
            <div className="no-goals">
              <p>No active goals yet. Create your first savings goal!</p>
              <Link to="/create-goal" className="create-first-goal-btn">
                Create Goal
              </Link>
            </div>
          ) : (
            <div className="goals-overview-horizontal">
              {goals.map((goal, index) => {
                const progress = (goal.current / goal.target) * 100;
                const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24));
                const isUrgent = daysLeft <= 30;
                const isCompleted = progress >= 100;
                
                return (
                  <div key={goal.id} className={`wild-goal-card wild-card-${(index % 4) + 1} ${isUrgent ? 'urgent' : ''} ${isCompleted ? 'completed' : ''}`}>
                    <div className="wild-card-header">
                      <div className="goal-category">{goal.category || 'General'}</div>
                      <div className="goal-priority">{goal.priority || 'medium'}</div>
                    </div>
                    
                    <div className="wild-card-content">
                      <h3 className="wild-goal-title">{goal.name}</h3>
                      <div className="wild-goal-meta">
                        <span className="goal-avatar">{goal.participants[0]?.avatar || '👥'}</span>
                        <span className="participants-count">+{goal.participants.length} members</span>
                      </div>
                    </div>
                    
                    <div className="wild-progress-section">
                      <ProgressBar 
                        current={goal.current} 
                        target={goal.target} 
                        cardType={(index % 4) + 1}
                      />
                      <div className="progress-labels">
                        <span className="current-amount">R{goal.current.toLocaleString()}</span>
                        <span className="target-amount">R{goal.target.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="wild-card-footer">
                      <div className="time-info">
                        <span className={`days-left ${isUrgent ? 'urgent' : ''}`}>
                          {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue!'}
                        </span>
                      </div>
                      <div className="wild-actions">
                        <Link to={`/goal/${goal.id}`} className="wild-btn view-btn">
                          👁️ View
                        </Link>
                        <Link to={`/contribute/${goal.id}`} className="wild-btn contribute-btn">
                          💰 Add
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {/* Add new goal wild card */}
              <div className="wild-goal-card add-new-card">
                <div className="add-new-content">
                  <div className="add-icon">➕</div>
                  <h3>Create New Goal</h3>
                  <p>Start saving for something amazing!</p>
                  <Link to="/create-goal" className="wild-btn create-btn">
                    🚀 Create Goal
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {upcomingReminders.length > 0 && (
          <div className="reminders">
            <h2>Upcoming Deadlines</h2>
            <div className="reminder-list">
              {upcomingReminders.map(goal => {
                const deadline = new Date(goal.deadline);
                const today = new Date();
                const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
                
                return (
                  <div key={goal.id} className="reminder-item">
                    <div className="reminder-info">
                      <strong>{goal.name}</strong>
                      <span className={`days-left ${daysLeft <= 7 ? 'urgent' : ''}`}>
                        {daysLeft} days left
                      </span>
                    </div>
                    <div className="reminder-progress">
                      <ProgressBar 
                        current={goal.current} 
                        target={goal.target} 
                        showPercentage={false} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;