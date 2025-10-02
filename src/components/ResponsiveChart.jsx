import { useEffect, useState } from 'react';

const ResponsiveChart = ({ children, minWidth = 300 }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      const container = document.querySelector('.chart-container');
      if (container) {
        const rect = container.getBoundingClientRect();
        setDimensions({
          width: Math.max(rect.width, minWidth),
          height: Math.max(rect.height, 200)
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [minWidth]);

  return (
    <div className="chart-container" style={{ width: '100%', overflow: 'auto' }}>
      {children}
    </div>
  );
};

export default ResponsiveChart;