import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ChartPie from '../components/ChartPie';
import goalsData from '../data/goals.json';
import './History.css';

const History = () => {
  const [completedGoals, setCompletedGoals] = useState([]);
  const [allGoals, setAllGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);

  useEffect(() => {
    setAllGoals(goalsData);
    const completed = goalsData.filter(goal => goal.status === 'completed');
    setCompletedGoals(completed);
    if (completed.length > 0) {
      setSelectedGoal(completed[0]);
    }
  }, []);

  const getTotalStats = () => {
    const totalSaved = allGoals.reduce((sum, goal) => sum + goal.current, 0);
    const totalTargeted = allGoals.reduce((sum, goal) => sum + goal.target, 0);
    const totalContributions = allGoals.reduce((sum, goal) => sum + goal.contributions.length, 0);
    
    return {
      totalSaved,
      totalTargeted,
      totalContributions,
      completedGoals: completedGoals.length,
      activeGoals: allGoals.filter(g => g.status === 'active').length
    };
  };

  const getContributionTimelineData = () => {
    if (!selectedGoal) return [];
    
    // Sort contributions by date and create cumulative data
    const sortedContributions = [...selectedGoal.contributions]
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    let cumulative = 0;
    return sortedContributions.map(contribution => {
      cumulative += contribution.amount;
      return {
        date: new Date(contribution.date).toLocaleDateString('en-ZA', { 
          month: 'short', 
          day: 'numeric' 
        }),
        amount: cumulative,
        contribution: contribution.amount,
        contributor: contribution.name
      };
    });
  };

  const getTopContributorsData = () => {
    if (!selectedGoal) return [];
    
    const contributorTotals = {};
    selectedGoal.contributions.forEach(contribution => {
      if (contributorTotals[contribution.name]) {
        contributorTotals[contribution.name] += contribution.amount;
      } else {
        contributorTotals[contribution.name] = contribution.amount;
      }
    });
    
    return Object.entries(contributorTotals).map(([name, value]) => ({
      name,
      value
    }));
  };

  const getAllTimeTopContributors = () => {
    const contributorTotals = {};
    allGoals.forEach(goal => {
      goal.contributions.forEach(contribution => {
        if (contributorTotals[contribution.name]) {
          contributorTotals[contribution.name] += contribution.amount;
        } else {
          contributorTotals[contribution.name] = contribution.amount;
        }
      });
    });
    
    return Object.entries(contributorTotals)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([name, value]) => ({ name, value }));
  };

  const exportToCSV = () => {
    let csvContent = "Goal Name,Target,Current,Status,Created Date,Completed Date,Participant,Contribution Amount,Contribution Date\n";
    
    allGoals.forEach(goal => {
      goal.contributions.forEach(contribution => {
        csvContent += `"${goal.name}",${goal.target},${goal.current},"${goal.status}","${goal.createdDate}","${goal.completedDate || ''}","${contribution.name}",${contribution.amount},"${contribution.date}"\n`;
      });
      
      // If no contributions, still add goal info
      if (goal.contributions.length === 0) {
        csvContent += `"${goal.name}",${goal.target},${goal.current},"${goal.status}","${goal.createdDate}","${goal.completedDate || ''}","","",""\n`;
      }
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `group-savings-history-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stats = getTotalStats();
  const timelineData = getContributionTimelineData();
  const topContributorsData = getTopContributorsData();
  const allTimeTopContributors = getAllTimeTopContributors();

  return (
    <div className="history">
      <div className="history-header">
        <h1>Savings History & Analytics</h1>
        <button onClick={exportToCSV} className="export-btn">
          📊 Export to CSV
        </button>
      </div>

      <div className="overall-stats">
        <div className="stat-card">
          <h3>Total Saved</h3>
          <p className="stat-value">R{stats.totalSaved.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <h3>Total Targeted</h3>
          <p className="stat-value">R{stats.totalTargeted.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <h3>Completed Goals</h3>
          <p className="stat-value">{stats.completedGoals}</p>
        </div>
        <div className="stat-card">
          <h3>Active Goals</h3>
          <p className="stat-value">{stats.activeGoals}</p>
        </div>
        <div className="stat-card">
          <h3>Total Contributions</h3>
          <p className="stat-value">{stats.totalContributions}</p>
        </div>
      </div>

      {allTimeTopContributors.length > 0 && (
        <div className="all-time-section">
          <h2>All-Time Top Contributors</h2>
          <div className="chart-container">
            <ChartPie 
              data={allTimeTopContributors}
              title="Total Contributions Across All Goals"
            />
          </div>
        </div>
      )}

      <div className="completed-goals-section">
        <h2>Completed Goals</h2>
        
        {completedGoals.length === 0 ? (
          <div className="no-completed-goals">
            <p>No completed goals yet. Keep saving to reach your targets!</p>
          </div>
        ) : (
          <>
            <div className="goal-selector">
              <label htmlFor="goalSelect">Select a goal to analyze:</label>
              <select
                id="goalSelect"
                value={selectedGoal?.id || ''}
                onChange={(e) => {
                  const goal = completedGoals.find(g => g.id === parseInt(e.target.value));
                  setSelectedGoal(goal);
                }}
              >
                {completedGoals.map(goal => (
                  <option key={goal.id} value={goal.id}>
                    {goal.name} - R{goal.target.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            {selectedGoal && (
              <div className="goal-analysis">
                <div className="goal-analysis-header">
                  <h3>{selectedGoal.name}</h3>
                  <div className="goal-analysis-meta">
                    <span>Target: R{selectedGoal.target.toLocaleString()}</span>
                    <span>Achieved: R{selectedGoal.current.toLocaleString()}</span>
                    <span>Completed: {new Date(selectedGoal.completedDate).toLocaleDateString()}</span>
                    <span>Duration: {Math.ceil((new Date(selectedGoal.completedDate) - new Date(selectedGoal.createdDate)) / (1000 * 60 * 60 * 24))} days</span>
                  </div>
                </div>

                <div className="analysis-charts">
                  <div className="chart-section">
                    <div className="timeline-chart">
                      <h4>Contribution Timeline</h4>
                      {timelineData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={timelineData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis 
                              tickFormatter={(value) => `R${value.toLocaleString()}`}
                            />
                            <Tooltip 
                              formatter={(value, name) => [
                                `R${value.toLocaleString()}`, 
                                name === 'amount' ? 'Cumulative Amount' : name
                              ]}
                              labelFormatter={(label) => `Date: ${label}`}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="amount" 
                              stroke="#4CAF50" 
                              strokeWidth={3}
                              dot={{ fill: '#4CAF50', strokeWidth: 2, r: 6 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="chart-placeholder">
                          <p>📈 No contribution data available for this goal</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="chart-section">
                    {topContributorsData.length > 0 ? (
                      <ChartPie 
                        data={topContributorsData}
                        title="Contributor Breakdown"
                      />
                    ) : (
                      <div className="chart-placeholder">
                        <h4>Contributor Breakdown</h4>
                        <p>👥 No contributor data available for this goal</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="contribution-details">
                  <h4>Contribution Details</h4>
                  <div className="contributions-table">
                    <div className="table-header">
                      <span>Contributor</span>
                      <span>Amount</span>
                      <span>Date</span>
                      <span>Percentage</span>
                    </div>
                    {selectedGoal.contributions
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .map(contribution => (
                        <div key={contribution.id} className="table-row">
                          <span>{contribution.name}</span>
                          <span>R{contribution.amount.toLocaleString()}</span>
                          <span>{new Date(contribution.date).toLocaleDateString()}</span>
                          <span>{((contribution.amount / selectedGoal.current) * 100).toFixed(1)}%</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="all-goals-list">
        <h2>All Goals Overview</h2>
        <div className="goals-grid">
          {allGoals.map(goal => (
            <div key={goal.id} className={`goal-overview-card ${goal.status}`}>
              <div className="goal-overview-header">
                <h4>{goal.name}</h4>
                <span className={`status-badge ${goal.status}`}>
                  {goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
                </span>
              </div>
              <div className="goal-overview-stats">
                <div className="stat">
                  <span>Target:</span>
                  <span>R{goal.target.toLocaleString()}</span>
                </div>
                <div className="stat">
                  <span>Current:</span>
                  <span>R{goal.current.toLocaleString()}</span>
                </div>
                <div className="stat">
                  <span>Progress:</span>
                  <span>{((goal.current / goal.target) * 100).toFixed(1)}%</span>
                </div>
                <div className="stat">
                  <span>Participants:</span>
                  <span>{goal.participants.length}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;