import React from 'react'
import { IOrder } from '../../orderbook.component'
import { Spread } from '../spread/spread.component'
import { HeaderStyled } from './header.styled'

export interface IHeaderProps {
  buy?: IOrder
  sell?: IOrder
}

export const Header: React.FC<IHeaderProps> = ({ buy, sell }) => {
  return (
    <HeaderStyled>
      <span>Order Book</span>
      {buy && sell && <Spread buy={buy} sell={sell} />}
    </HeaderStyled>
  )
}
