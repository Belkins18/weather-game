import { FC, useState } from 'react'
import { SvgMap } from '@src/components/SvgMap'
import { SelectedList } from '@src/components/SelectedList'
import {
  EOpenWeatherEndpointType,
  openWeatherGETRequest,
  TOpenWeatherGeoParams,
} from '@src/api'
import { EStates, TCity, TState, TStates } from '@/src/types'
import s from './style.module.scss'
import { stateList } from './data'

export const App: FC = () => {
  const [states, setStates] = useState<TState[]>(stateList)
  const [selectedState, setSelectedState] = useState<TStates>(EStates.CA)
  const [selectedCities, setSelectedCities] = useState<TCity[]>([])

  const getCities = () =>
    states.filter((state) => state.id === selectedState)[0].cities

  const resetGameHandler = () => {
    setStates(stateList)
    setSelectedCities([])
  }

  const svgButtonClickHandler = (id: TStates) => setSelectedState(id)

  const selectCityHandler = async (item: TCity) => {
    const openWeatherGeoParams: TOpenWeatherGeoParams = {
      q: [item.name],
    }

    const response = await openWeatherGETRequest(
      EOpenWeatherEndpointType.geo,
      openWeatherGeoParams
    )

    const { lat, lon } = response[0]

    const _states = states.map((state) => {
      if (state.id === item.parentId) {
        const _cities = state.cities.map((city) =>
          city.id === item.id
            ? {
                ...item,
                isSelected: true,
                location: {
                  lat,
                  lon,
                },
              }
            : city
        )
        return {
          ...state,
          cities: [..._cities],
        }
      } else return state
    })

    const _item = _states
      .filter((state) => state.id === item.parentId)[0]
      .cities.filter((city) => city.id === item.id)

    setStates(_states)
    setSelectedCities([...selectedCities, ..._item])
  }

  return (
    <div className="App">
      <section className={s.location} id="contact">
        <div className={`${s.location__container} container`}>
          <h2 className={s.location__title}>Weather Game</h2>
          <div className={s.location__slogan}>
            <span>
              Choose 5 cities and guess what the temperature is now in each of
              the cities.
            </span>
            <span>3 or more correct guesses will win!</span>
          </div>
        </div>

        <div className={s.location__map}>
          <div
            className={`${s.location__container} ${s.location__wrapper} container`}
          >
            {selectedCities.length !== 5 && (
              <div className={s.location__svg}>
                <SvgMap selectedState={selectedState} />
                <div className={s.btnWrapper}>
                  {states.map((state) => (
                    <button
                      className="btn"
                      is-active={`${state.id === selectedState}`}
                      data-state={state.id}
                      type="button"
                      onClick={() => svgButtonClickHandler(state.id)}
                      key={state.id}
                    >
                      <span>
                        {state.id} {state.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {selectedCities.length !== 5 && (
              <div className={s.location__navigate}>
                <div id="infoStock" className={s.mapInfo}>
                  <div className={s.mapInfo__layyer} data-layyer="state">
                    <div className={s.mapInfo__title}>
                      Select {5 - selectedCities.length} cities by states
                    </div>
                    <ul>
                      {getCities().map((item) => (
                        <li key={item.id}>
                          <button
                            type="button"
                            disabled={
                              item.isSelected || selectedCities.length === 5
                            }
                            onClick={() => selectCityHandler(item)}
                          >
                            <img height="70px" src={item.images} alt="" />
                            <span>{item.name}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {selectedCities.length >= 1 ? (
              <SelectedList
                data={selectedCities}
                resetGame={resetGameHandler}
              />
            ) : null}
          </div>
        </div>
      </section>
    </div>
  )
}
