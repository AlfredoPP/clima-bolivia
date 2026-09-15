export interface WeatherCondition {
  label: string
  icon: string
}

export function getWeatherCondition(code: number): WeatherCondition {
  if (code === 0) {
    return { label: 'Despejado', icon: '☀️' }
  }

  if (code === 1) {
    return { label: 'Mayormente despejado', icon: '🌤️' }
  }

  if (code === 2) {
    return { label: 'Parcialmente nublado', icon: '⛅' }
  }

  if (code === 3) {
    return { label: 'Nublado', icon: '☁️' }
  }

  if (code === 45 || code === 48) {
    return { label: 'Niebla', icon: '🌫️' }
  }

  if (code === 51 || code === 53 || code === 55) {
    return { label: 'Llovizna', icon: '🌦️' }
  }

  if (code === 56 || code === 57) {
    return { label: 'Llovizna helada', icon: '🌧️' }
  }

  if (code === 61) {
    return { label: 'Lluvia ligera', icon: '🌧️' }
  }

  if (code === 63) {
    return { label: 'Lluvia moderada', icon: '🌧️' }
  }

  if (code === 65) {
    return { label: 'Lluvia intensa', icon: '🌧️' }
  }

  if (code === 66 || code === 67) {
    return { label: 'Lluvia helada', icon: '🌧️' }
  }

  if (code === 71 || code === 73 || code === 75 || code === 77) {
    return { label: 'Nieve', icon: '❄️' }
  }

  if (code === 80 || code === 81 || code === 82) {
    return { label: 'Chubascos', icon: '🌦️' }
  }

  if (code === 85 || code === 86) {
    return { label: 'Chubascos de nieve', icon: '🌨️' }
  }

  if (code === 95 || code === 96 || code === 99) {
    return { label: 'Tormenta', icon: '⛈️' }
  }

  return { label: 'Condición desconocida', icon: '🌡️' }
}