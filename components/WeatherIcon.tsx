
import React from 'react';

interface WeatherIconProps {
  condition: string;
  className?: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, className = 'w-16 h-16' }) => {
  const getIcon = () => {
    const lowerCaseCondition = condition.toLowerCase();
    
    if (lowerCaseCondition.includes('mưa') || lowerCaseCondition.includes('rain')) {
      return <i className="fas fa-cloud-showers-heavy"></i>;
    }
    if (lowerCaseCondition.includes('dông') || lowerCaseCondition.includes('thunderstorm')) {
      return <i className="fas fa-bolt"></i>;
    }
    if (lowerCaseCondition.includes('tuyết') || lowerCaseCondition.includes('snow')) {
      return <i className="fas fa-snowflake"></i>;
    }
    if (lowerCaseCondition.includes('sương mù') || lowerCaseCondition.includes('mist') || lowerCaseCondition.includes('fog')) {
      return <i className="fas fa-smog"></i>;
    }
    if (lowerCaseCondition.includes('mây') || lowerCaseCondition.includes('cloud')) {
      return <i className="fas fa-cloud"></i>;
    }
    if (lowerCaseCondition.includes('nắng') || lowerCaseCondition.includes('sunny') || lowerCaseCondition.includes('quang')) {
      return <i className="fas fa-sun"></i>;
    }
    
    return <i className="fas fa-cloud-sun"></i>; // Default icon
  };

  return (
    <div className={`text-5xl ${className}`}>
      {getIcon()}
    </div>
  );
};

export default WeatherIcon;
