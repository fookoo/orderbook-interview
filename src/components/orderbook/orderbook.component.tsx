import React, { useEffect } from 'react'
import { List } from './components/list/list.component'
import { Spread } from './components/spread/spread.component'
import { OrdersContainerStyled } from './orderbook.styled'
import { IOrders } from '../app/app.component'

export type Side = 'sell' | 'buy'

export type AvailableProducts = 'PI_XBTUSD'

export interface IOrderbookProps {
  orders: IOrders
}

export const Orderbook: React.FC<IOrderbookProps> = ({ orders }) => {
  return (
    <div>
      <div>
        Order Book
        {orders.asks[0] && orders.bids[0] && <Spread buy={orders.bids[0]} sell={orders.asks[0]} />}
      </div>
      <OrdersContainerStyled>
        <List quantity={orders.bid_volume} orders={orders.bids} side={'buy'} />
        <List quantity={orders.ask_volume} orders={orders.asks} side={'sell'} reverse />
      </OrdersContainerStyled>
    </div>
  )
}
