import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AvailableProducts, Orderbook } from '../orderbook/orderbook.component'
import { WebSocketInstance } from '../../contexts/web-socket.context'
import { WebsocketEvents } from 'websocket-ts'

export type AvailableFeeds = 'book_ui_1'

interface WSBookResponse {
  feed: AvailableFeeds
  product_id: AvailableProducts
  bids: [number, number][]
  asks: [number, number][]
}

export interface IOrder {
  id?: number
  price: number
  size: number
  total: number
}

const useList = () => {
  const [list, setList] = useState<IOrder[]>([])
  const listMap = useRef(new Map<number, number>())

  const update = useCallback(
    (prices: [number, number][]) => {
      if (listMap.current) {
        prices.forEach(([price, size]) => {
          if (size === 0) {
            // Remove
            listMap.current.delete(price)
            return
          }

          listMap.current.set(price, size)
        })
      }
    },
    [setList]
  )

  useEffect(() => {
    const updateList = () => {
      setList(() => {
        const output: IOrder[] = []

        listMap.current.forEach((value, key) => {
          output.push({
            price: key,
            size: value,
            total: 0
          })
        })

        let total = 0
        const sorted = output.sort((a, b) => b.price - a.price)

        const dupa = sorted.slice(0, 50).map((item, index) => {
          total = total === 0 ? item.size : total + item.size
          return {
            ...item,
            id: index,
            total
          }
        })
        return dupa
      })
    }

    const timerId = setInterval(updateList, 1000 / 30)

    return () => {
      clearInterval(timerId)
    }
  }, [])

  return {
    list,
    update
  }
}

export interface IOrders {
  asks: IOrder[]
  bids: IOrder[]
  ask_volume: number
  bid_volume: number
}

const useOrdersFeed = (product: AvailableProducts) => {
  const [orders, setOrders] = useState<IOrders>()
  const { list: asks, update: updateAsks } = useList()
  const { list: bids, update: updateBids } = useList()

  const pause = () => {
    console.log('pause')
  }
  const resume = () => {
    console.log('resume')
  }

  useEffect(() => {
    WebSocketInstance().then((socket) => {
      const subscribe = () =>
        socket.send(
          JSON.stringify({ event: 'subscribe', feed: 'book_ui_1', product_ids: [product] })
        )
      const unsubscribe = () =>
        socket.send(
          JSON.stringify({ event: 'unsubscribe', feed: 'book_ui_1', product_ids: [product] })
        )

      subscribe()

      socket.addEventListener(WebsocketEvents.message, (ws, message) => {
        try {
          const resp = JSON.parse(message.data) as WSBookResponse

          if (resp.feed === 'book_ui_1' && resp.product_id === product) {
            if (resp.asks.length) {
              updateAsks(resp.asks)
            }
            if (resp.bids.length) {
              updateBids(resp.bids)
            }
          }
        } catch (e) {
          console.warn(e)
        }
      })

      return unsubscribe
    })
  }, [product])

  useEffect(() => {
    setOrders({
      asks,
      bids,
      ask_volume: asks[asks.length - 1]?.total || 0,
      bid_volume: bids[bids.length - 1]?.total || 0
    })
  }, [asks, bids])

  return {
    orders,
    pause,
    resume
  }
}

export const App: React.FC = () => {
  const [product, setProduct] = useState<AvailableProducts>('PI_XBTUSD')
  const { orders, pause, resume } = useOrdersFeed(product)

  return orders ? <Orderbook orders={orders} /> : <div>no - orders</div>
}
