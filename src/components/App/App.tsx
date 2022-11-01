import { FC, useEffect, useState } from 'react'
import { SvgMap } from '@src/components/SvgMap'
import {
  //   EOpenWeatherDataUnits,
  EOpenWeatherEndpointType,
  openWeatherGETRequest,
  //   TOpenWeatherDataParams,
  //   TOpenWeatherGeoParams,
} from '@src/api'
import { EStates, TStates } from '@/src/types'
import s from './style.module.scss'
import { stateList, TState } from './data'

export const App: FC = () => {
  const [state, setState] = useState<TState[]>(stateList)
  const [selectedState, setSelectedState] = useState<TStates>(EStates.CA)

  //   const openWeatherDataParams: TOpenWeatherDataParams = {
  //     lat: 33.44,
  //     lon: -94.04,
  //     units: EOpenWeatherDataUnits.metric,
  //   }
  //   const openWeatherGeoParams: TOpenWeatherGeoParams = {
  //     q: ['London', 'GB'],
  //   }
  //   console.log(openWeatherDataParams)
  //   console.log(openWeatherGeoParams)

  useEffect(() => {
    // openWeatherGETRequest(EOpenWeatherEndpointType.geo, openWeatherGeoParams)
    // openWeatherGETRequest(EOpenWeatherEndpointType.data, openWeatherDataParams)
  }, [])
  const svgButtonClickHandler = (id: TStates) => setSelectedState(id)
  return (
    <div className="App">
      <section className={s.location} id="contact">
        <div className={`${s.location__container} ${s.container}`}>
          <h2 className={s.location__title}>Visit our warehouses</h2>
          <div className={s.location__slogan}>
            Truckandshop has 6 warehouses throughout the United States, visit
            any of them, you will be able to personally verify the quality of
            goods, and get advice on any issues
          </div>
        </div>

        <div className={s.location__map}>
          <div
            className={`${s.location__container} ${s.location__wrapper} container`}
          >
            <div className={s.location__svg}>
              <SvgMap selectedState={selectedState} />

              {state.map((item) => (
                <button
                  data-state={item.id}
                  type="button"
                  onClick={() => svgButtonClickHandler(item.id)}
                  key={item.id}
                >
                  <span>
                    {item.id} {item.name}
                  </span>
                </button>
              ))}
            </div>
            <div className={s.location__navigate}>
              <div id="infoStock" className={s.mapInfo}>
                <div className={s.mapInfo__layyer} data-layyer="state">
                  <div className={s.mapInfo__title}>
                    Select a cities by state
                  </div>
                  <ul>
                    {state.map((item) => (
                      <li key={item.id}>
                        {item.name}
                        <img
                          width="20px"
                          height="20px"
                          src={item.cities[0].images}
                          alt=""
                        />
                      </li>
                    ))}
                  </ul>
                  {/* <Link to='/game'></Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
