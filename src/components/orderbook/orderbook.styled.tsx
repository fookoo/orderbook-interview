import styled from '@emotion/styled'

export const OrdersContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media screen and (max-width: 700px) {
    flex-direction: column;
    & > header {
      display: none;
    }
  }
`

export const ColumnsStyled = styled.div`
  display: flex;
  @media screen and (min-width: 701px) {
    header {
      display: none;
    }
  }
  @media screen and (max-width: 700px) {
    flex-direction: column;
    header {
      span {
        display: none;
      }
      order: 2;
    }
    & > div:nth-child(2) {
      order: 3;
      flex-direction: column !important;
    }
    & > div:nth-child(3) {
      order: 1;
    }
  }
`
