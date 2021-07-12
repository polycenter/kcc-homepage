import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import BN from 'bignumber.js'
import { LoadingOutlined } from '@ant-design/icons'
import { NetworkType } from '../../constants/networks'
import { formatNumber } from '../../utils'
export interface TransferLimitProps {
  loading: boolean
  available: string
  distNetworkInfo: NetworkType
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

const TransferLimit: React.FunctionComponent<TransferLimitProps> = ({ loading, available, distNetworkInfo }) => {
  const { t } = useTranslation()
  return (
    <TransferLimitWrap>
      <Title>
        {t(`Available Bridge Balance`)}:
        {loading && !distNetworkInfo ? (
          <LoadingOutlined
            style={{
              margin: '4px 10px 0px 10px',
              width: '12px',
              height: '12px',
              color: '#000',
              fontSize: '10px',
            }}
          />
        ) : (
          <span>{formatNumber(new BN(available).div(Math.pow(10, distNetworkInfo?.decimals)))}</span>
        )}
      </Title>
    </TransferLimitWrap>
  )
}

export default TransferLimit
