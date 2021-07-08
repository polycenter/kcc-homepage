import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { Progress } from 'antd'
import { Currency } from '../../state/bridge/reducer'
export interface TransferLimitProps {
  available: number
  currency: Currency
}

const TransferLimitWrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
`
const Title = styled.div`
  height: 22px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 1, 50, 0.6);
  line-height: 22px;
`

const TransferLimit: React.FunctionComponent<TransferLimitProps> = ({ available, currency }) => {
  const { t } = useTranslation()
  return (
    <TransferLimitWrap>
      <Title>
        {t(`Available Balance`)}: {`${available / Math.pow(10, currency.decimals)}`}
      </Title>
      {/* <Progress
        percent={percent}
        type="line"
        showInfo={false}
        strokeWidth={4}
        style={{ width: '150px' }}
        status="active"
        strokeColor={{
          '0%': '#00FFA8',
          '100%': '#31D7A0',
        }}
      /> */}
    </TransferLimitWrap>
  )
}

export default TransferLimit
