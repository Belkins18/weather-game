import { Iso3166Alpha2Code } from 'iso-3166-ts'

export enum EOpenWeatherDataUnits {
  standard = 'standard',
  metric = 'metric',
  imperial = 'imperial',
}
export enum EOpenWeatherEndpointType {
  geo = 'geo',
  data = 'data',
}

export type TOpenWeatherDataUnits = EOpenWeatherDataUnits
export type TOpenWeatherEndpointType = EOpenWeatherEndpointType

export type TOpenWeatherGeoParams = {
  q: [cityName: string, countryCode?: Iso3166Alpha2Code]
  appid?: string
}

export type TOpenWeatherDataParams = {
  lat: string | number
  lon: string | number
  appid?: string
  units?: TOpenWeatherDataUnits
}
