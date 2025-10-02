import './ProgressBar.css';

const ProgressBar = ({ current, target, showPercentage = true, cardType = null }) => {
  const percentage = Math.min((current / target) * 100, 100);

  return (
    <div className="progress-container">
      <div className={`progress-bar ${cardType ? `card-${cardType}` : ''}`}>
        <div 
          className="progress-fill" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="progress-info">
        <span className="progress-amount">
          R{current.toLocaleString()} of R{target.toLocaleString()}
        </span>
        {showPercentage && (
          <span className="progress-percentage">
            {percentage.toFixed(1)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;