const apiEndpoint = process.env.REACT_APP_API_OPEN_WEATHER_ENDPOINT

export const API_KEY = process.env.REACT_APP_API_OPEN_WEATHER_KEY as string
export const OPEN_WEATHER_GEO_ENDPOINT = `${apiEndpoint}geo/1.0/direct`
export const OPEN_WEATHER_DATA_ENDPOINT = `${apiEndpoint}data/2.5/weather`
