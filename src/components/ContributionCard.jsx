import './ContributionCard.css';

const ContributionCard = ({ contribution, onEdit, onDelete, showActions = false }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="contribution-card">
      <div className="contribution-info">
        <div className="contributor-name">{contribution.name}</div>
        <div className="contribution-amount">R{contribution.amount.toLocaleString()}</div>
        <div className="contribution-date">{formatDate(contribution.date)}</div>
      </div>
      {showActions && (
        <div className="contribution-actions">
          <button onClick={() => onEdit(contribution)} className="edit-btn">
            Edit
          </button>
          <button onClick={() => onDelete(contribution.id)} className="delete-btn">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ContributionCard;