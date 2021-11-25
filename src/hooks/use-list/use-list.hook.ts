import { useCallback, useRef } from 'react'
import { IOrder } from '../../components/orderbook/orderbook.component'

type UseListResponse = {
  getValues: () => IOrder[]
  update: (prices: [number, number][]) => void
  clear: () => void
}

export const useList = (size = 40): UseListResponse => {
  const listMap = useRef(new Map<number, number>())
  const update = useCallback((prices: [number, number][]) => {
    if (listMap.current) {
      prices.forEach(([price, size]) => {
        if (size === 0) {
          listMap.current.delete(price)
          return
        }

        listMap.current.set(price, size)
      })
    }
  }, [])
  const getValues = useCallback((): IOrder[] => {
    const output: IOrder[] = []

    listMap.current.forEach((size, price) => {
      output.push({
        price,
        size,
        total: 0
      })
    })

    const sorted = output.sort((a, b) => b.price - a.price)
    let total = 0
    return sorted.slice(0, size).map((item, index) => {
      total = total === 0 ? item.size : total + item.size

      return {
        ...item,
        id: index,
        total
      }
    })
  }, [size])
  const clear = useCallback(() => {
    listMap.current.clear()
  }, [])

  return {
    getValues,
    update,
    clear
  }
}
