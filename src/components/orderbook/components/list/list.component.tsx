import React from 'react'
import { IOrder, Side } from '../../orderbook.component'
import { HeaderStyled, ListStyled, RowStyled } from './list.styled'

const format = (input?: number, forceDecimal = false): string => {
  const numberParts = `${input}`.split('.')
  const arr = numberParts[0].split('').reverse()
  const output: string[] = []

  arr.forEach((digit, index) => {
    output.push(digit)
    const i = index + 1

    if (i % 3 === 0 && i !== arr.length) {
      output.push(',')
    }
  })

  return `${output.reverse().join('')}${
    numberParts[1] !== undefined ? `.${numberParts[1]}0` : forceDecimal ? '.00' : ''
  }`
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
        <div className={'total'}>Total</div>
        <div>Size</div>
        <div className={'price'}>Price</div>
      </HeaderStyled>
      {orders.map(({ id, total, size, price }) => (
        <RowStyled reverse={reverse} side={side} key={id}>
          <div
            className="bar"
            key={`bar-${id}`}
            style={{
              position: 'absolute',
              zIndex: 0,
              height: '100%',
              width: `${Math.floor((total / quantity) * 100)}%`,
              background: side === 'sell' ? 'rgb(61,30,40)' : 'rgb(18,53,52)',
              left: reverse ? 0 : 'unset',
              right: reverse ? 'unset' : 0,
              transition: 'width 0.1s ease-in-out'
            }}
          />
          <div className="columns">
            <div>{format(total, true)}</div>
            <div>{format(size)}</div>
            <div className={'price'}>{format(price, true)}</div>
          </div>
        </RowStyled>
      ))}
    </ListStyled>
  )
}
