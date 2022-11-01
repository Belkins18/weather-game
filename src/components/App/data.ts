import candler_nc from '@/src/assets/images/states/NC/candler.jpeg'
import boiling_springs_sc from '@/src/assets/images/states/SC/boiling springs.jpeg'
import west_sacramento_ca from '@/src/assets/images/states/CA/west sacramento.jpeg'
import san_bernardino_ca from '@/src/assets/images/states/CA/san bernardino.jpeg'
import seattle_wa from '@/src/assets/images/states/WA/seattle.jpeg'
import vancouver_wa from '@/src/assets/images/states/WA/vancouver.jpeg'
import salt_lake_city_ut from '@/src/assets/images/states/UT/salt lake city.jpeg'

import { EStates, TStates } from '@/src/types'

export type TCity = {
  name: string
  images: string
  location?: {
    lat: number
    lon: number
  }
}

export type TState = {
  id: TStates
  name: string
  cities: TCity[]
}

export const stateList: TState[] = [
  {
    id: EStates.NC,
    name: 'North Carolina',
    cities: [
      {
        name: 'Candler',
        images: candler_nc,
      },
    ],
  },
  {
    id: EStates.SC,
    name: 'South Carolina',
    cities: [
      {
        name: 'Boiling Springs',
        images: boiling_springs_sc,
      },
    ],
  },
  {
    id: EStates.CA,
    name: 'California',
    cities: [
      {
        name: 'West Sacramento',
        images: west_sacramento_ca,
      },
      {
        name: 'San Bernardino',
        images: san_bernardino_ca,
      },
    ],
  },
  {
    id: EStates.WA,
    name: 'Washington',
    cities: [
      {
        name: 'Vancouver',
        images: vancouver_wa,
      },
      {
        name: 'Seattle',
        images: seattle_wa,
      },
    ],
  },
  {
    id: EStates.UT,
    name: 'Utah',
    cities: [
      {
        name: 'Salt Lake City',
        images: salt_lake_city_ut,
      },
    ],
  },
]
