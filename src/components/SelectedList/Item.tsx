/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react'
import { EGameStatus, TCity, TGameStatus } from '@/src/types'

import {
  EOpenWeatherDataUnits,
  EOpenWeatherEndpointType,
  openWeatherGETRequest,
} from '@/src/api'
import s from './style.module.scss'

type TSelectedListItemProps = {
  city: TCity
  pushResult: (status: TGameStatus) => void
}

export const SelectedListItem: FC<TSelectedListItemProps> = ({
  city,
  pushResult,
}) => {
  const [inputValue, setValue] = useState<number>(0)
  const [curTemp, setTemp] = useState<number>()

  const [isPass, setPassResult] = useState<boolean | null>(null)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isChecked, setCheck] = useState<boolean>(false)

  const passCheck = (value: number, temp: number, delta = 2.5) =>
    value >= temp - delta && inputValue <= temp + delta

  const checkWheatherHandler = async (location: {
    lat: number
    lon: number
  }) => {
    console.log(location)
    if (!location) return
    setLoading(true)
    const data: any = await openWeatherGETRequest(
      EOpenWeatherEndpointType.data,
      {
        ...location,
        units: EOpenWeatherDataUnits.metric,
      }
    )
    const { temp } = data.main

    setLoading(false)
    setPassResult(passCheck(inputValue, temp))
    setCheck(true)
    setTemp(temp)

		passCheck(inputValue, temp)
      ? pushResult(EGameStatus.win)
      : pushResult(EGameStatus.lose)
  }
  return (
    <div
      className={`${s.list__item} ${
        isPass !== null ? (isPass === true ? s.correct : s.wrong) : ''
      }`}
    >
      <img src={city.images} alt={city.images} />
      <div className={s.result}>{curTemp}</div>
      <div className={s.content}>
        <input
          type="number"
          disabled={isChecked}
          value={inputValue}
          onInput={(e: any) => {
            setValue(parseInt(e.target.value))
          }}
          onChange={(e: any) => {
            setValue(parseInt(e.target.value))
          }}
        />
        <button
          type="button"
          className={s.button}
          disabled={isLoading || isChecked}
          onClick={() =>
            checkWheatherHandler(
              city.location as {
                lat: number
                lon: number
              }
            )
          }
        >
          {isLoading ? 'Loading...' : 'Check Wheather'}
        </button>
      </div>
    </div>
  )
}
