import { useEffect, useRef, useState } from 'react'
import './App.css'

import { ForecastCard } from './components/ForecastCard'
import { cities } from './data/cities'
import { getWeatherForecast } from './services/weather.service'

import type { City } from './types/city'
import type { DailyForecast } from './types/weather'

function App() {
  const [selectedCity, setSelectedCity] = useState<City>(cities[0])
  const [forecast, setForecast] = useState<DailyForecast[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  const forecastSectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let isCancelled = false

    const fetchForecast = async () => {
      try {
        const data = await getWeatherForecast(selectedCity)

        if (!isCancelled) {
          setForecast(data)
          setError(null)
        }
      } catch (err) {
        console.error(err)

        if (!isCancelled) {
          setForecast([])
          setError(
            'No pudimos obtener el pronóstico. Verifica tu conexión e inténtalo nuevamente.',
          )
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }

    void fetchForecast()

    return () => {
      isCancelled = true
    }
  }, [selectedCity, retryCount])

  const handleCitySelect = (city: City) => {
    if (city.id === selectedCity.id) {
      return
    }

    setSelectedCity(city)
    setForecast([])
    setError(null)
    setIsLoading(true)

    if (window.matchMedia('(max-width: 720px)').matches) {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      window.setTimeout(() => {
        forecastSectionRef.current?.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start',
        })
      }, 100)
    }
  }

  const handleRetry = () => {
    setForecast([])
    setError(null)
    setIsLoading(true)
    setRetryCount((currentCount) => currentCount + 1)
  }

  return (
    <main className="app">
      <header className="app-header">
        <p className="app-header__eyebrow">Pronóstico meteorológico</p>

        <h1>Clima Bolivia</h1>

        <p>
          Consulta el pronóstico de los próximos 7 días en las nueve
          capitales departamentales de Bolivia.
        </p>
      </header>

      <section className="city-section" aria-labelledby="city-title">
        <h2 id="city-title">Selecciona una ciudad</h2>

        <div className="city-list">
          {cities.map((city) => (
            <button
              key={city.id}
              type="button"
              className={`city-button ${
                selectedCity.id === city.id ? 'city-button--active' : ''
              }`}
              onClick={() => handleCitySelect(city)}
              aria-pressed={selectedCity.id === city.id}
            >
              <strong>{city.name}</strong>
              <span>{city.department}</span>
            </button>
          ))}
        </div>
      </section>

      <section
        ref={forecastSectionRef}
        className="forecast-section"
        aria-live="polite"
      >
        <div className="forecast-heading">
          <div>
            <p>Pronóstico de 7 días</p>
            <h2>{selectedCity.name}</h2>
          </div>

          <span className="forecast-heading__department">
            {selectedCity.department}
          </span>
        </div>

        {isLoading && (
          <div className="status-message">
            <div className="loader" aria-hidden="true" />
            <p>Cargando pronóstico...</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="status-message status-message--error">
            <span aria-hidden="true">⚠️</span>

            <p>{error}</p>

            <button type="button" onClick={handleRetry}>
              Reintentar
            </button>
          </div>
        )}

        {!isLoading && !error && (
          <div className="forecast-grid">
            {forecast.map((day) => (
              <ForecastCard key={day.date} forecast={day} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default App