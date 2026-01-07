
import React from 'react';
import type { WeatherData } from '../types';
import WeatherIcon from './WeatherIcon';

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  return (
    <div className="bg-white/20 backdrop-blur-lg rounded-xl shadow-2xl p-6 md:p-8 text-white w-full transition-all duration-500 ease-in-out transform hover:scale-105">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold capitalize">{data.city}</h2>
        <p className="text-lg opacity-80">{data.condition}</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-around text-center">
        <div className="my-4 md:my-0">
           <WeatherIcon condition={data.condition} className="w-24 h-24" />
        </div>
        <div className="text-6xl font-extrabold my-4 md:my-0">
          {Math.round(data.temperature)}°<span className="text-4xl font-light">C</span>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-white/20 flex justify-around text-center">
        <div className="w-1/2">
          <p className="text-sm opacity-80">Độ ẩm</p>
          <p className="text-xl font-semibold">{data.humidity}%</p>
        </div>
        <div className="w-1/2 border-l border-white/20">
          <p className="text-sm opacity-80">Gió</p>
          <p className="text-xl font-semibold">{data.windSpeed} km/h</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
