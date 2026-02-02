interface DailyWeather {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  };
}

interface HourlyWeather {
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
}

export const dailyForecasts = (weather: DailyWeather) =>
  weather.daily.time.map((time, index) => {
    return {
      time: time,
      maxTemp: weather.daily.temperature_2m_max[index],
      minTemp: weather.daily.temperature_2m_min[index],
      code: weather.daily.weather_code[index],
    };
  });

export const allHours = (weather: HourlyWeather) =>
  weather.hourly.time.map((time, index) => {
    return {
      time: time,
      temp: weather.hourly.temperature_2m[index],
      code: weather.hourly.weather_code[index],
    };
  });
