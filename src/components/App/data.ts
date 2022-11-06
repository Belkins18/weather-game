import candler_nc from '@/src/assets/images/states/NC/candler.jpeg'
import boiling_springs_sc from '@/src/assets/images/states/SC/boiling springs.jpeg'
import west_sacramento_ca from '@/src/assets/images/states/CA/west sacramento.jpeg'
import san_bernardino_ca from '@/src/assets/images/states/CA/san bernardino.jpeg'
import seattle_wa from '@/src/assets/images/states/WA/seattle.jpeg'
import vancouver_wa from '@/src/assets/images/states/WA/vancouver.jpeg'
import salt_lake_city_ut from '@/src/assets/images/states/UT/salt lake city.jpeg'

import { EStates, TState } from '@/src/types'

export const stateList: TState[] = [
  {
    id: EStates.NC,
    name: 'North Carolina',
    cities: [
      {
        id: 'candler_nc',
        parentId: EStates.NC,
        name: 'Candler',
        images: candler_nc,
        isSelected: false,
      },
    ],
  },
  {
    id: EStates.SC,
    name: 'South Carolina',
    cities: [
      {
        id: 'boiling_springs_sc',
        parentId: EStates.SC,
        name: 'Boiling Springs',
        images: boiling_springs_sc,
        isSelected: false,
      },
    ],
  },
  {
    id: EStates.CA,
    name: 'California',
    cities: [
      {
        id: 'west_sacramento_ca',
        parentId: EStates.CA,
        name: 'West Sacramento',
        images: west_sacramento_ca,
        isSelected: false,
      },
      {
        id: 'san_bernardino_ca',
        parentId: EStates.CA,
        name: 'San Bernardino',
        images: san_bernardino_ca,
        isSelected: false,
      },
    ],
  },
  {
    id: EStates.WA,
    name: 'Washington',
    cities: [
      {
        id: 'vancouver_wa',
        parentId: EStates.WA,
        name: 'Vancouver',
        images: vancouver_wa,
        isSelected: false,
      },
      {
        id: 'seattle_wa',
        parentId: EStates.WA,
        name: 'Seattle',
        images: seattle_wa,
        isSelected: false,
      },
    ],
  },
  {
    id: EStates.UT,
    name: 'Utah',
    cities: [
      {
        id: 'salt_lake_city_ut',
        parentId: EStates.UT,
        name: 'Salt Lake City',
        images: salt_lake_city_ut,
        isSelected: false,
      },
    ],
  },
]
