import React from 'react'
import { useOrdersFeed } from '../../hooks/use-orders-feed/use-orders-feed.hook'
import { Header } from './components/header/header.component'
import { List } from './components/list/list.component'
import { ColumnsStyled, OrdersContainerStyled } from './orderbook.styled'
import { AvailableProducts } from '../product-selector/product-selector.component'

export type Side = 'sell' | 'buy'

export interface IOrder {
  id?: number
  price: number
  size: number
  total: number
}

export interface IOrders {
  asks: IOrder[]
  bids: IOrder[]
  ask_volume: number
  bid_volume: number
}

export interface IOrderbookProps {
  product: AvailableProducts
  size?: number
}

export const Orderbook: React.FC<IOrderbookProps> = ({ product, size = 20 }) => {
  const { orders } = useOrdersFeed(product, size)

  return (
    <OrdersContainerStyled>
      <Header buy={orders.bids[0]} sell={orders.asks[0]} />
      <ColumnsStyled>
        <Header buy={orders.bids[0]} sell={orders.asks[0]} />
        <List quantity={orders.bid_volume} orders={orders.bids} side={'buy'} />
        <List quantity={orders.ask_volume} orders={orders.asks} side={'sell'} reverse />
      </ColumnsStyled>
    </OrdersContainerStyled>
  )
}
