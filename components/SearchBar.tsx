
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(city);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center rounded-full bg-white/20 shadow-lg backdrop-blur-md overflow-hidden">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="VD: Hà Nội, London..."
        className="w-full bg-transparent text-white placeholder-white/60 px-6 py-4 focus:outline-none"
        disabled={loading}
      />
      <button 
        type="submit"
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold p-4 rounded-full m-1 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
        disabled={loading || !city}
      >
        <i className="fas fa-search"></i>
      </button>
    </form>
  );
};

export default SearchBar;
