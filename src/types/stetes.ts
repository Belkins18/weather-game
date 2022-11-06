export enum EStates {
  NC = 'NC',
  SC = 'SC',
  CA = 'CA',
  WA = 'WA',
  UT = 'UT',
}

export type TStates = EStates

export type TCity = {
  id: string | number
  parentId: TStates
  name: string
  images: string
  location?: {
    lat: number
    lon: number
  }
  isSelected: boolean
}

export type TState = {
  id: TStates
  name: string
  cities: TCity[]
}