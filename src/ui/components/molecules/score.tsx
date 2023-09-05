import React, { useEffect, useState } from 'react';

const getBackgroundColor = (percentage: number) => {
  if (percentage < 50) return 'bg-red-600';
  if (percentage >= 50 && percentage <= 80) return 'bg-yellow-500';
  return 'bg-green-600';
};

const ScoreDisplay: React.FC<{ percentage: number }> = ({ percentage }) => {
  const [currentCount, setCurrentCount] = useState(0);
  const bgColorClass = getBackgroundColor(percentage);

  useEffect(() => {
    let start = percentage - 10;
    const end = percentage;
    const duration = 550;
    const stepTime = Math.abs(Math.floor(duration / (end - start)));
    
    const timer = setInterval(() => {
      start++;
      setCurrentCount(start);
      if (start === end) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [percentage]);

  return (
    <div className={`absolute top-3 right-3 w-10 h-10 z-20 rounded flex justify-center items-center text-2xl text-white ${bgColorClass}`}>
      <span>{currentCount}</span>
    </div>
  );
};

export default ScoreDisplay;
