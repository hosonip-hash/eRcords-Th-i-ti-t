
import { GoogleGenAI, Type } from "@google/genai";
import type { WeatherData } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY is not defined in environment variables");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const weatherSchema = {
  type: Type.OBJECT,
  properties: {
    city: { type: Type.STRING, description: "Tên thành phố, bao gồm cả quốc gia nếu cần." },
    temperature: { type: Type.NUMBER, description: "Nhiệt độ hiện tại theo độ C." },
    condition: { type: Type.STRING, description: "Mô tả ngắn gọn về tình hình thời tiết (ví dụ: Nắng, Mây rải rác, Mưa)." },
    humidity: { type: Type.NUMBER, description: "Độ ẩm theo phần trăm." },
    windSpeed: { type: Type.NUMBER, description: "Tốc độ gió theo km/h." },
  },
  required: ["city", "temperature", "condition", "humidity", "windSpeed"],
};

export const getWeatherForCity = async (city: string): Promise<WeatherData> => {
  try {
    const prompt = `Cung cấp dữ liệu thời tiết hiện tại cho thành phố: ${city}.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: weatherSchema,
      },
    });

    if (!response.text) {
      throw new Error("Phản hồi từ API không có nội dung.");
    }
    
    // Trim and clean potential markdown code block fences
    const jsonText = response.text.trim().replace(/^```json\n|```$/g, '');

    const weatherData = JSON.parse(jsonText) as WeatherData;
    
    // Sometimes the model returns the city name in the schema, we can override it
    // with the user's input for consistency in display.
    weatherData.city = city;

    return weatherData;
  } catch (error) {
    console.error("Lỗi khi gọi Gemini API:", error);
    throw new Error("Không thể lấy dữ liệu thời tiết từ Gemini API.");
  }
};
