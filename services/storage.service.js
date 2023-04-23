import { join, dirname } from 'path'
import { promises } from 'fs'

const filePath = join(dirname('weather.js'), 'weather-data.json')

export const saveKeyValue = async (key, value) => {
  let data = await readFile()

  data[key] = value
  await promises.writeFile(filePath, JSON.stringify(data))
}

export const getKeyValue = async (key) => {
  const data = await readFile()
  return data[key]
}

const readFile = async () => {
  if (!await isExist(filePath)) return {}

  const file = await promises.readFile(filePath)
  return JSON.parse(file)
}

const isExist = async (path) => {
  try {
    await promises.stat(path)
    return true
  } catch (e) {
    return false
  }
}
