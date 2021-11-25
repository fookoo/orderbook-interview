import React, { ChangeEvent } from 'react'

export type AvailableProducts = 'PI_XBTUSD' | 'PI_ETHUSD'
export const products: AvailableProducts[] = ['PI_ETHUSD', 'PI_XBTUSD']

interface IProductSelectorProps {
  product: AvailableProducts
  onSelect?: (product: AvailableProducts) => void
}

export const ProductSelector: React.FC<IProductSelectorProps> = ({ product, onSelect }) => {
  const handleProductChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedProduct = event.currentTarget.value as AvailableProducts
    onSelect?.(selectedProduct)
  }

  return (
    <select onChange={handleProductChange} value={product}>
      {products.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  )
}
