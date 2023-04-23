#!usr/bin/env node
import { getArgs } from "./lib/helpers.js"
import { logHelp, logSuccess, logError, logWeather } from "./services/log.service.js";
import { saveKeyValue, getKeyValue } from "./services/storage.service.js";
import { getWeather } from "./services/api.service.js";

export const ARGS_ENUM = {
  token: 'token',
  city: 'city'
}

const setToken = async (token) => {
  if (!token.length) {
    logError('Token not given')
    return
  }

  try {
    await saveKeyValue(ARGS_ENUM.token, token)
    logSuccess('Token saved successfully!')
  } catch (e) {
    logError(e.message)
  }
}

const setCity = async (city) => {
  if (!city.length) {
    logError('City not given')
    return
  }

  try {
    await saveKeyValue(ARGS_ENUM.city, city)
    logSuccess('City saved successfully!')
  } catch (e) {
    logError(e.message)
  }
}

const processWeather = async () => {
  let response
  try {
    // 57b405894a7f56eb90ddd29e7829ccac
    const city = await getKeyValue(ARGS_ENUM.city)
    response = await getWeather(city)
  } catch (e) {
    logError(e.message)
  }
  const [data, err, statusCode] = response || []
  if (err) {
    logError(err)
  }
  if (data) {
    logWeather(data)
  }
  if (statusCode === 404) {
    logError('City not found')
    return
  }
  if (statusCode === 401) {
    logError('Token is not valid')
    return
  }
  if (statusCode === 401) {
    logError('City not given')
    return
  }

}

const init = async () => {
  debugger
  const args = getArgs(process.argv)

  const { h: help, s: saveCity, t: saveToken } = args || {}

  if (help) {
    return logHelp()
  }

  if (saveToken) {
    return await setToken(saveToken)
  }

  if (saveCity) {
    return await setCity(saveCity)
  }


  processWeather()
}

init()