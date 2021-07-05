import React from 'react'
import styled from 'styled-components'
export interface BridgeLoadingProps {
  status: number
}

import './index.less'
import { useTranslation } from 'react-i18next'

const BridgeLoading: React.FunctionComponent<BridgeLoadingProps> = ({ status }) => {
  const { t } = useTranslation()

  const loadingType = React.useMemo(() => {
    switch (status) {
      case 0:
        return 'sprite-loading'
      case 1:
        return 'sprite-success'
      case 2:
        return 'sprite-done'
      default:
        return 'sprite-loading'
    }
  }, [status])

  return (
    <div className="bridge-loading-wrap">
      <div className="box animation1" id="layer1">
        <div className={loadingType}></div>
      </div>
    </div>
  )
}

export default BridgeLoading
