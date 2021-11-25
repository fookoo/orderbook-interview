import React, { useState } from 'react'
import { AutoSize } from 'react-autosize-container'
import { AvailableProducts, ProductSelector } from '../product-selector/product-selector.component'

import { Orderbook } from '../orderbook/orderbook.component'
import { AppContainerStyled } from './app.styled'

export const App: React.FC = () => {
  const [product, setProduct] = useState<AvailableProducts>('PI_XBTUSD')

  return (
    <AppContainerStyled>
      <ProductSelector product={product} onSelect={setProduct} />
      <AutoSize>
        {({ width, height }) => (
          <Orderbook
            product={product}
            size={width < 700 ? Math.floor(height / 40) : Math.floor(height / 20) - 2}
          />
        )}
      </AutoSize>
    </AppContainerStyled>
  )
}
