import React, { useEffect, useState } from 'react';

const getBackgroundColor = (percentage: number) => {
  if (!percentage) return 'bg-shadow';
  if (percentage < 50) return 'bg-red-600';
  if (percentage >= 50 && percentage <= 80) return 'bg-yellow-500';
  return 'bg-green-600';
};

const ScoreDisplay: React.FC<{ percentage: number }> = ({ percentage }) => {
  const [currentCount, setCurrentCount] = useState(0);
  const bgColorClass = getBackgroundColor(percentage);

  const getValidReview = (score: number)=>{
    if(score === 0 && !percentage)return 'TBA'
    return score
  }
  useEffect(() => {
    if(!percentage) return
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
    <div className={` w-6 h-6 z-20 rounded flex justify-center items-center text-md text-white font-semi-bold ${bgColorClass}`}>
      <span>{getValidReview(currentCount)}</span>
    </div>
  );
};

export default ScoreDisplay;
