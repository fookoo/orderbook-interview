import React, { useEffect, useState } from 'react'
import { SpreadStyled } from './spread.styled'
import { IOrder } from '../../../app/app.component'

interface ISpread {
  value: number
  percent: number
}

interface ISpreadProps {
  buy: IOrder
  sell: IOrder
}

export const Spread: React.FC<ISpreadProps> = ({ buy, sell }) => {
  const [spread, setSpread] = useState<ISpread>({ value: 0, percent: 0 })

  useEffect(() => {
    const value = sell.price - buy.price
    const percent = parseFloat(((value / sell.price) * 100).toFixed(2))

    setSpread({
      value,
      percent
    })
  }, [buy, sell])

  return (
    <SpreadStyled>
      Spread: {spread.value} ({spread.percent}%)
    </SpreadStyled>
  )
}
