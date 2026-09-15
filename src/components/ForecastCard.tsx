import type { DailyForecast } from '../types/weather'
import { getWeatherCondition } from '../utils/weatherCode'

interface ForecastCardProps {
  forecast: DailyForecast
}

function formatForecastDate(date: string): {
  weekday: string
  date: string
} {
  const parsedDate = new Date(`${date}T12:00:00`)

  const weekday = new Intl.DateTimeFormat('es-BO', {
    weekday: 'long',
  }).format(parsedDate)

  const formattedDate = new Intl.DateTimeFormat('es-BO', {
    day: 'numeric',
    month: 'short',
  }).format(parsedDate)

  return {
    weekday: weekday.charAt(0).toUpperCase() + weekday.slice(1),
    date: formattedDate,
  }
}

export function ForecastCard({ forecast }: ForecastCardProps) {
  const condition = getWeatherCondition(forecast.weatherCode)
  const formattedDate = formatForecastDate(forecast.date)

  return (
    <article className="forecast-card">
      <div className="forecast-card__date">
        <strong>{formattedDate.weekday}</strong>
        <span>{formattedDate.date}</span>
      </div>

      <div
        className="forecast-card__icon"
        role="img"
        aria-label={condition.label}
      >
        {condition.icon}
      </div>

      <p className="forecast-card__condition">{condition.label}</p>

      <div className="forecast-card__temperatures">
        <span>
          <strong>{Math.round(forecast.temperatureMax)}°</strong>
          <small>Máx.</small>
        </span>

        <span>
          <strong>{Math.round(forecast.temperatureMin)}°</strong>
          <small>Mín.</small>
        </span>
      </div>
    </article>
  )
}