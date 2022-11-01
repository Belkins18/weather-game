import {
  OPEN_WEATHER_GEO_ENDPOINT,
  OPEN_WEATHER_DATA_ENDPOINT,
  API_KEY,
} from './endpoints'
import { TOpenWeatherEndpointType, EOpenWeatherEndpointType } from './types'

export * from './types'
export * from './endpoints'

export const openWeatherGETRequest = async (
  endpointType: TOpenWeatherEndpointType,
  params = {}
) => {
  let url = ''
  let endpoint = ''
  const options: RequestInit = {
    method: 'GET',
  }

  Object.assign(params, {appid: API_KEY}) 
  
  switch (endpointType) {
    case EOpenWeatherEndpointType.geo:
      endpoint = OPEN_WEATHER_GEO_ENDPOINT
      break
    case EOpenWeatherEndpointType.data:
      endpoint = OPEN_WEATHER_DATA_ENDPOINT
      break
  }

  url = endpoint += '?' + new URLSearchParams(params).toString()
  console.log(url)
  try {
    const response = await fetch(url, options)

    if (response && response.status === 200) {
      return await response.json()
    } else {
      throw new Error(
        `Request endpoint ${endpointType} was failed! ${response.status}: ${response.statusText}`
      )
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message)
  }
}
