import React from 'react'
import { Side } from '../../orderbook.component'
import { BarStyled, HeaderStyled, ListStyled, RowStyled } from './list.styled'
import { IOrder } from '../../../app/app.component'

const format = (input?: number): string => {
  const arr = `${input}`.split('').reverse()
  const output: string[] = []

  arr.forEach((digit, index) => {
    output.push(digit)
    if ((index + 1) % 3 === 0) {
      output.push(',')
    }
  })

  return output.reverse().join('')
}

interface IListProps {
  quantity: number
  orders: IOrder[]
  reverse?: boolean
  side?: Side
}

export const List: React.FC<IListProps> = ({ quantity, side = 'buy', reverse = false, orders }) => {
  return (
    <ListStyled>
      <HeaderStyled reverse={reverse}>
        <div className={'price'}>Price</div>
        <div>Size</div>
        <div className={'total'}>Total</div>
      </HeaderStyled>
      {orders.map(({ id, total, size, price }) => (
        <RowStyled reverse={reverse} side={side} key={id}>
          <BarStyled side={side} value={(total / quantity) * 100} reverse={reverse} />
          <div>
            <div className={'price'}>{price.toFixed(2)}</div>
            <div>{format(size)}</div>
            <div>{format(total)}</div>
          </div>
        </RowStyled>
      ))}
    </ListStyled>
  )
}
