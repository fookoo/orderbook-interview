import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { Side } from '../../orderbook.component'

const green = 'rgb(17,124,89)'
const red = 'rgb(168,47,51)'

interface IReverse {
  side?: Side
  reverse: boolean
}

export const ListStyled = styled.div`
  width: 100%;

  @media screen and (max-width: 700px) {
    display: flex;
    flex-direction: column-reverse;
  }
`

const Columns = (reverse = false) => css`
  display: flex;

  justify-content: space-between;
  z-index: 2;

  @media screen and (max-width: 700px) {
    flex-direction: row-reverse;
  }

  @media screen and (min-width: 701px) {
    ${reverse ? 'flex-direction: row-reverse;' : 'flex-direction: row;'}
  }

  div {
    @media screen and (min-width: 701px) {
      ${reverse ? 'text-align: left;' : 'text-align: right;'}
    }

    width: 33%;
    padding: 0 5px;
  }
`

export const HeaderStyled = styled.div<IReverse>`
  @media screen and (max-width: 700px) {
    display: none;
  }
  ${({ reverse }) => Columns(reverse)}

  text-transform: uppercase;
  color: rgb(56, 61, 74);
  font-size: 12px;
  font-weight: 500;
  padding: 2px 0;
  border-top: 1px solid rgb(56, 61, 74);
  border-bottom: 1px solid rgb(21, 27, 38);
`

export const RowStyled = styled.div<IReverse>`
  position: relative;
  height: 20px;

  .columns {
    ${({ reverse }) => Columns(reverse)}
    position: relative;
  }

  .price {
    ${({ side }) => `color: ${side === 'buy' ? green : red};`}
  }

  .bar {
    @media screen and (max-width: 700px) {
      left: 0 !important;
      right: unset !important;
    }
  }
`
