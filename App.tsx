
import React, { useState, useCallback } from 'react';
import type { WeatherData } from './types';
import { getWeatherForCity } from './services/geminiService';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (city: string) => {
    if (!city) {
      setError("Vui lòng nhập tên thành phố.");
      return;
    }
    setLoading(true);
    setWeatherData(null);
    setError(null);
    try {
      const data = await getWeatherForCity(city);
      setWeatherData(data);
    } catch (err) {
      setError("Không thể lấy dữ liệu thời tiết. Vui lòng thử lại.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-cyan-500 to-blue-700 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white shadow-lg">Thời tiết Gemini</h1>
          <p className="text-white/80 mt-2">Nhập tên thành phố để xem thời tiết hiện tại</p>
        </header>

        <main>
          <SearchBar onSearch={handleSearch} loading={loading} />
          
          <div className="mt-8 min-h-[300px] flex items-center justify-center">
            {loading && <LoadingSpinner />}
            {error && <p className="text-red-300 bg-red-900/50 p-4 rounded-lg text-center">{error}</p>}
            {weatherData && <WeatherCard data={weatherData} />}
            {!loading && !error && !weatherData && (
                 <div className="text-center text-white/70">
                    <i className="fas fa-cloud-sun text-6xl mb-4"></i>
                    <p>Sẵn sàng khám phá thời tiết</p>
                </div>
            )}
          </div>
        </main>
      </div>
       <footer className="absolute bottom-4 text-center text-white/60 text-sm">
        <p>Phát triển bởi Kỹ sư React với API Gemini</p>
      </footer>
    </div>
  );
};

export default App;
