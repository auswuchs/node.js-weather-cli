import https from 'https'
import { getKeyValue } from './storage.service.js'
import { logError } from './log.service.js'
import { ARGS_ENUM } from '../weather.js'

export const getWeather = async (city = process.env.CITY) => {
  const token = process.env.TOKEN ?? await getKeyValue(ARGS_ENUM.token)
  if (!token) {
    throw new Error('API token is not provided')
  }

  const url = new URL('https://api.openweathermap.org/data/2.5/weather')
  url.searchParams.set('q', city)
  url.searchParams.set('appid', token)
  url.searchParams.set('units', 'metric')

  return new Promise((res, rej) => {
    https.get(url, (response) => {
      let data = [];

      response.on('data', (chunk) => {
        data.push(chunk)
      })

      response.on('end', () => {
        try {
          const resultedData = JSON.parse(data.join(''))
          const parsedData = resultedData.cod === 200 ? resultedData : null

          res([parsedData, null, response.statusCode]);
        } catch (e) {
          rej([null, e.message, response.statusCode]);
        }
      })

      response.on('error', (e) => {
        rej([null, e.message, response.statusCode]);
      })
    })

  })
}