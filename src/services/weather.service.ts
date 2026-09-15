import type { City } from '../types/city'
import type {
  DailyForecast,
  OpenMeteoDailyResponse,
} from '../types/weather'

const BASE_URL = 'https://api.open-meteo.com/v1/forecast'


//Prueba de Error en la API//
//const BASE_URL = 'https://api.open-meteo.com/v1/forecast-error-test'//

export async function getWeatherForecast(
  city: City,
): Promise<DailyForecast[]> {
  const params = new URLSearchParams({
    latitude: city.latitude.toString(),
    longitude: city.longitude.toString(),
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    timezone: 'America/La_Paz',
    forecast_days: '7',
  })

  const response = await fetch(`${BASE_URL}?${params.toString()}`)

  if (!response.ok) {
    throw new Error(
      `No se pudo obtener el pronóstico para ${city.name}`,
    )
  }

  const data: OpenMeteoDailyResponse = await response.json()

  if (
    !data.daily ||
    !Array.isArray(data.daily.time) ||
    !Array.isArray(data.daily.temperature_2m_max) ||
    !Array.isArray(data.daily.temperature_2m_min) ||
    !Array.isArray(data.daily.weather_code)
  ) {
    throw new Error('La API devolvió información meteorológica inválida')
  }

  return data.daily.time.map((date, index) => ({
    date,
    temperatureMax: data.daily.temperature_2m_max[index],
    temperatureMin: data.daily.temperature_2m_min[index],
    weatherCode: data.daily.weather_code[index],
  }))
}