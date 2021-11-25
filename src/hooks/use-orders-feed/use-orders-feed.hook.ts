import { useCallback, useEffect, useRef, useState } from 'react'
import { Websocket, WebsocketEvents } from 'websocket-ts'
import { WebSocketInstance } from '../../contexts/web-socket.context'
import { AvailableProducts } from '../../components/product-selector/product-selector.component'
import { IOrders } from '../../components/orderbook/orderbook.component'
import { useList } from '../use-list/use-list.hook'

type AvailableFeeds = 'book_ui_1'

interface WSBookResponse {
  feed: AvailableFeeds
  product_id: AvailableProducts
  bids: [number, number][]
  asks: [number, number][]
}

const subscribeMessage = (product: AvailableProducts): string =>
  JSON.stringify({ event: 'subscribe', feed: 'book_ui_1', product_ids: [product] })

const unsubscribeMessage = (product: AvailableProducts): string =>
  JSON.stringify({ event: 'unsubscribe', feed: 'book_ui_1', product_ids: [product] })

type UseOrdersFeedResponse = {
  orders: IOrders
}

export const useOrdersFeed = (product: AvailableProducts, size: number): UseOrdersFeedResponse => {
  const [orders, setOrders] = useState<IOrders>({
    asks: [],
    bids: [],
    ask_volume: 0,
    bid_volume: 0
  })
  const animRef = useRef<number>()
  const wsRef = useRef<Websocket>()
  const { getValues: getAsks, update: updateAsks, clear: clearAsks } = useList(size)
  const { getValues: getBids, update: updateBids, clear: clearBids } = useList(size)

  const pause = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.send(unsubscribeMessage(product))
    }
  }, [product])
  const resume = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.send(subscribeMessage(product))
    }
  }, [product])
  const update = useCallback(() => {
    const asks = getAsks()
    const bids = getBids()

    setOrders({
      asks,
      bids,
      ask_volume: asks[asks.length - 1]?.total || 0,
      bid_volume: bids[bids.length - 1]?.total || 0
    })

    animRef.current = window.requestAnimationFrame(update)
  }, [setOrders, getAsks, getBids])
  const onMessage = useCallback(
    (ws, message) => {
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
    },
    [updateAsks, updateBids, product]
  )
  const onVisibilityChanged = useCallback(() => {
    if (document.visibilityState === 'hidden') {
      pause()
    } else {
      resume()
    }
  }, [pause, resume])

  useEffect(() => {
    WebSocketInstance().then((socket) => {
      wsRef.current = socket
      socket.addEventListener(WebsocketEvents.message, onMessage)

      clearAsks()
      clearBids()
      resume()
    })

    return () => {
      pause()
    }
  }, [onMessage, resume, pause, clearAsks, clearBids])

  useEffect(() => {
    animRef.current = window.requestAnimationFrame(update)
    document.addEventListener('visibilitychange', onVisibilityChanged)

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChanged)
      if (animRef.current) {
        window.cancelAnimationFrame(animRef.current)
      }
    }
  }, [update, onVisibilityChanged])

  useEffect(() => {
    clearAsks()
    clearBids()
  }, [size, clearAsks, clearBids])

  return {
    orders
  }
}
