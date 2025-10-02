import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateGoal.css';

const CreateGoal = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    target: '',
    deadline: '',
    participants: [''],
    contributionMethod: 'equal'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleParticipantChange = (index, value) => {
    const newParticipants = [...formData.participants];
    newParticipants[index] = value;
    setFormData(prev => ({
      ...prev,
      participants: newParticipants
    }));
  };

  const addParticipant = () => {
    setFormData(prev => ({
      ...prev,
      participants: [...prev.participants, '']
    }));
  };

  const removeParticipant = (index) => {
    if (formData.participants.length > 1) {
      const newParticipants = formData.participants.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        participants: newParticipants
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.target || !formData.deadline) {
      alert('Please fill in all required fields');
      return;
    }

    if (formData.participants.some(p => p.trim() === '')) {
      alert('Please fill in all participant names');
      return;
    }

    // In a real app, this would save to backend/database
    // For now, we'll just simulate success and redirect
    const newGoal = {
      id: Date.now(), // Simple ID generation
      name: formData.name,
      target: parseFloat(formData.target),
      current: 0,
      deadline: formData.deadline,
      status: 'active',
      participants: formData.participants.filter(p => p.trim() !== ''),
      contributions: [],
      createdDate: new Date().toISOString().split('T')[0]
    };

    console.log('New goal created:', newGoal);
    
    // Show success message and redirect
    alert('Goal created successfully!');
    navigate('/');
  };

  return (
    <div className="create-goal">
      <div className="create-goal-container">
        <h1>Create New Savings Goal</h1>
        
        <form onSubmit={handleSubmit} className="goal-form">
          <div className="form-group">
            <label htmlFor="name">Goal Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Holiday Trip, Emergency Fund"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="target">Target Amount (R) *</label>
            <input
              type="number"
              id="target"
              name="target"
              value={formData.target}
              onChange={handleInputChange}
              placeholder="10000"
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="deadline">Deadline *</label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="form-group">
            <label>Participants *</label>
            <div className="participants-list">
              {formData.participants.map((participant, index) => (
                <div key={index} className="participant-input">
                  <input
                    type="text"
                    value={participant}
                    onChange={(e) => handleParticipantChange(index, e.target.value)}
                    placeholder={`Participant ${index + 1} name`}
                    required
                  />
                  {formData.participants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeParticipant(index)}
                      className="remove-participant-btn"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addParticipant}
                className="add-participant-btn"
              >
                + Add Participant
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="contributionMethod">Contribution Method</label>
            <select
              id="contributionMethod"
              name="contributionMethod"
              value={formData.contributionMethod}
              onChange={handleInputChange}
            >
              <option value="equal">Equal contributions</option>
              <option value="custom">Custom contributions</option>
            </select>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Create Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGoal;