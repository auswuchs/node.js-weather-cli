import chalk from 'chalk'
const { bgRed, bgGreen, bgCyan } = chalk

export const logError = (error = 'Something went wrong') => {
  const message = bgRed(`ERROR: ${error}`)
  console.log(message)
};

export const logSuccess = (msg) => {
  const message = bgGreen(`SUCCESS: ${msg}`)
  console.log(message)
};

export const logHelp = () => {
  const message = `
${bgCyan(`HELP`)}
No arguments - show weather.
-s [city] - set city
-t [api_key] - set weather api key
-h - show help
  `
  console.log(message);
}

export const logWeather = async (res) => {
  const message = `
${bgCyan(`Weather in ${res.name}`)} 
temperature: ${res.main.temp}. Feels like: ${res.main.feels_like} 
${res.weather[0].description}
wind speed: ${res.wind.speed}
`
  console.log(message);
}