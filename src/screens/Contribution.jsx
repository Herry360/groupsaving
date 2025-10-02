import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import goalsData from '../data/goals.json';
import './Contribution.css';

const Contribution = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [goal, setGoal] = useState(null);
  const [formData, setFormData] = useState({
    contributorName: '',
    amount: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const foundGoal = goalsData.find(g => g.id === parseInt(id));
    if (foundGoal) {
      setGoal(foundGoal);
      // Set first participant as default if no previous contributions
      if (foundGoal.contributions.length === 0 && foundGoal.participants.length > 0) {
        setFormData(prev => ({
          ...prev,
          contributorName: foundGoal.participants[0].name
        }));
      }
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateSuggestedAmount = () => {
    if (!goal) return 0;
    
    const remainingAmount = goal.target - goal.current;
    const remainingParticipants = goal.participants.filter(participant => {
      return !goal.contributions.some(contribution => contribution.name === participant);
    }).length;
    
    if (remainingParticipants === 0) return remainingAmount;
    return Math.ceil(remainingAmount / remainingParticipants);
  };

  const getContributorHistory = (contributorName) => {
    if (!goal || !contributorName) return [];
    return goal.contributions.filter(c => c.name === contributorName);
  };

  const calculateContributorTotal = (contributorName) => {
    const history = getContributorHistory(contributorName);
    return history.reduce((sum, c) => sum + c.amount, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.contributorName || !formData.amount || !formData.date) {
      alert('Please fill in all fields');
      return;
    }

    const amount = parseFloat(formData.amount);
    if (amount <= 0) {
      alert('Please enter a valid amount greater than 0');
      return;
    }

    if (amount > (goal.target - goal.current)) {
      const remaining = goal.target - goal.current;
      alert(`Amount exceeds remaining target. Maximum amount: R${remaining.toLocaleString()}`);
      return;
    }

    // In a real app, this would save to backend/database
    const newContribution = {
      id: Date.now(), // Simple ID generation
      name: formData.contributorName,
      amount: amount,
      date: formData.date
    };

    console.log('New contribution:', newContribution);
    
    // Show success message and redirect
    alert(`Contribution of R${amount.toLocaleString()} by ${formData.contributorName} added successfully!`);
    navigate(`/goal/${goal.id}`);
  };

  if (!goal) {
    return (
      <div className="contribution">
        <div className="contribution-container">
          <h2>Goal not found</h2>
          <p>The goal you're trying to contribute to doesn't exist.</p>
          <button onClick={() => navigate('/')} className="back-btn">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const suggestedAmount = calculateSuggestedAmount();
  const remainingAmount = goal.target - goal.current;
  const selectedContributorHistory = getContributorHistory(formData.contributorName);
  const selectedContributorTotal = calculateContributorTotal(formData.contributorName);

  return (
    <div className="contribution">
      <div className="contribution-container">
        <div className="contribution-header">
          <h1>Add Contribution</h1>
          <div className="goal-info">
            <h2>{goal.name}</h2>
            <div className="goal-summary">
              <span>Current: R{goal.current.toLocaleString()}</span>
              <span>Target: R{goal.target.toLocaleString()}</span>
              <span className="remaining">Remaining: R{remainingAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contribution-form">
          <div className="form-group">
            <label htmlFor="contributorName">Contributor *</label>
            <select
              id="contributorName"
              name="contributorName"
              value={formData.contributorName}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a participant</option>
              {goal.participants.map((participant, index) => (
                <option key={index} value={participant.name}>
                  {participant.name}
                </option>
              ))}
            </select>
          </div>

          {formData.contributorName && (
            <div className="contributor-info">
              <h3>Contributor History</h3>
              <div className="contributor-stats">
                <div className="stat">
                  <span className="label">Previous Contributions:</span>
                  <span className="value">{selectedContributorHistory.length}</span>
                </div>
                <div className="stat">
                  <span className="label">Total Contributed:</span>
                  <span className="value">R{selectedContributorTotal.toLocaleString()}</span>
                </div>
              </div>
              
              {selectedContributorHistory.length > 0 && (
                <div className="contribution-history">
                  <h4>Recent Contributions:</h4>
                  <div className="history-list">
                    {selectedContributorHistory
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .slice(0, 3)
                      .map(contribution => (
                        <div key={contribution.id} className="history-item">
                          <span>R{contribution.amount.toLocaleString()}</span>
                          <span>{new Date(contribution.date).toLocaleDateString()}</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="amount">Amount (R) *</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="0.00"
              min="0.01"
              max={remainingAmount}
              step="0.01"
              required
            />
            <div className="amount-suggestions">
              <span className="suggestion-label">Suggestions:</span>
              <div className="suggestion-buttons">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, amount: suggestedAmount.toString() }))}
                  className="suggestion-btn"
                >
                  Suggested: R{suggestedAmount.toLocaleString()}
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, amount: (remainingAmount / 2).toString() }))}
                  className="suggestion-btn"
                >
                  Half: R{(remainingAmount / 2).toLocaleString()}
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, amount: remainingAmount.toString() }))}
                  className="suggestion-btn"
                >
                  Complete: R{remainingAmount.toLocaleString()}
                </button>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="date">Contribution Date *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              max={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          {formData.amount && parseFloat(formData.amount) > 0 && (
            <div className="contribution-preview">
              <h3>Contribution Preview</h3>
              <div className="preview-details">
                <div className="preview-item">
                  <span>Contributor:</span>
                  <span>{formData.contributorName}</span>
                </div>
                <div className="preview-item">
                  <span>Amount:</span>
                  <span className="amount">R{parseFloat(formData.amount).toLocaleString()}</span>
                </div>
                <div className="preview-item">
                  <span>New Total:</span>
                  <span className="new-total">R{(goal.current + parseFloat(formData.amount)).toLocaleString()}</span>
                </div>
                <div className="preview-item">
                  <span>Remaining After:</span>
                  <span className="remaining-after">R{(remainingAmount - parseFloat(formData.amount)).toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate(`/goal/${goal.id}`)}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Add Contribution
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contribution;