import React, { useState } from 'react'
import { render } from '@testing-library/react'
import { useList } from './use-list.hook'
import { IOrder } from '../../components/app/app.component'

const ExampleComponent = () => {
  const { getValues, update } = useList(10)
  const [values, setValues] = useState<IOrder[]>([])

  const addValues = () => {
    update([
      [1, 10],
      [2, 10],
      [3, 10]
    ])
  }

  const removeValues = () => {
    update([[1, 0]])
  }

  const displayValues = () => {
    setValues(getValues())
  }

  return (
    <div>
      <button type="button" onClick={addValues}>
        add
      </button>
      <button type="button" onClick={removeValues}>
        remove
      </button>
      <button type="button" onClick={displayValues}>
        get
      </button>
      <div>
        {values.map((order, index) => (
          <div data-testid="item" key={order.id}>
            <span>{order.price}</span>
            <span>{order.size}</span>
            <span data-testid={`total-${index}`}>{order.total}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

describe('useList', () => {
  it('useList should calculate total value correctly', async () => {
    const { queryByText, getAllByTestId, getByTestId } = render(<ExampleComponent />)

    const addButton = queryByText('add')
    const calculateButton = queryByText('get')
    addButton?.click()
    calculateButton?.click()

    const items = getAllByTestId('item')
    expect(items.length).toBe(3)

    expect(getByTestId('total-0').innerHTML).toBe('10')
    expect(getByTestId('total-1').innerHTML).toBe('20')
    expect(getByTestId('total-2').innerHTML).toBe('30')
  })

  it('useList should be able to remove element from list', async () => {
    const { queryByText, getAllByTestId, getByTestId } = render(<ExampleComponent />)

    const addButton = queryByText('add')
    const calculateButton = queryByText('get')
    const removeButton = queryByText('remove')

    addButton?.click()
    calculateButton?.click()

    let items = getAllByTestId('item')
    expect(items.length).toBe(3)

    expect(getByTestId('total-0').innerHTML).toBe('10')
    expect(getByTestId('total-1').innerHTML).toBe('20')
    expect(getByTestId('total-2').innerHTML).toBe('30')

    removeButton?.click()
    calculateButton?.click()

    items = getAllByTestId('item')

    expect(items.length).toBe(2)
    expect(getByTestId('total-0').innerHTML).toBe('10')
    expect(getByTestId('total-1').innerHTML).toBe('20')
  })
})
