import { FC, useEffect, useState } from 'react'
import { EGameStatus, TCity, TGameStatus } from '@src/types'

import s from './style.module.scss'
import { SelectedListItem } from './Item'

type TSelectedListProps = {
  data: TCity[]
  resetGame: () => void
}
export const SelectedList: FC<TSelectedListProps> = ({ data, resetGame }) => {
  const [listResult, setResult] = useState<TGameStatus[]>([])
  const [gameStatus, setStatus] = useState<TGameStatus>(EGameStatus.notStarted)

  useEffect(() => {
    if (listResult.length === 5) {
      listResult.filter((item) => item === EGameStatus.win).length >= 3
        ? setStatus(EGameStatus.win)
        : setStatus(EGameStatus.lose)
    }

    console.log('listResult: ', listResult)
  }, [listResult.length])

  const pushResultHandler = (status: TGameStatus) => {
    console.log('pushResultHandler: ', status)
    setResult([...listResult, status])
  }

  return (
    <div className={s.list} data-status={gameStatus}>
      {gameStatus !== EGameStatus.notStarted && (
        <button className={`${s.button} ${s.button_reset}`} onClick={resetGame}>
          Reset
        </button>
      )}

      {data.map((city) => (
        <SelectedListItem
          city={city}
          key={city.id}
          pushResult={pushResultHandler}
        />
      ))}
    </div>
  )
}
