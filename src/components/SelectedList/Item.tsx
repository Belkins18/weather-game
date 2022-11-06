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
  const [inputValue, setValue] = useState<string>('')
  const [curTemp, setTemp] = useState<number>()

  const [isPass, setPassResult] = useState<boolean | null>(null)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isChecked, setCheck] = useState<boolean>(false)

  const passCheck = (value: string, temp: number, delta = 5) =>
    parseFloat(value) >= temp - delta && parseFloat(value) <= temp + delta

  const isValid = () =>
    parseFloat(inputValue) >= -50 && parseFloat(inputValue) <= 50

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
          pattern="/d*"
          min={-50}
          max={50}
          maxLength={2}
          onInput={(e: any) => {
            setValue(e.target.value.toString())
          }}
          onChange={(e: any) => {
            setValue(e.target.value.toString())
          }}
        />
        <button
          type="button"
          className={s.button}
          disabled={isLoading || isChecked || inputValue === '' || !isValid()}
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
