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
`

const Columns = (reverse = false) => css`
  display: grid;
  width: 100%;

  grid-template-columns: 1fr 1fr 1fr;
  ${reverse ? `direction: ltr;` : `direction: rtl;`}
  text-align: right;
`

export const HeaderStyled = styled.div<IReverse>`
  ${({ reverse }) => Columns(reverse)};

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

  & > div {
    div {
      z-index: 1;
    }
    ${({ reverse }) => Columns(reverse)};

    .price {
      ${({ side }) => `color: ${side === 'buy' ? green : red};`}
    }
  }
`

interface IBarStyledProps {
  value: number
  reverse: boolean
  side: Side
}

export const BarStyled = styled.span<IBarStyledProps>`
  position: absolute;

  z-index: 0;
  height: 100%;
  ${({ value }) => `width: ${value}%;`}
  ${({ reverse }) => (reverse ? 'left: 0;' : 'right: 0;')}
  ${({ side }) => `background: ${side === 'sell' ? 'rgb(61,30,40)' : 'rgb(18,53,52)'};`}
`
