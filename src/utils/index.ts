import { networks, NetworkType } from '../constants/networks'
import { ChainId } from '../connectors/index'
import { PairInfo } from '../state/bridge/reducer'
import store from '../state'
import BN from 'bignumber.js'
import { getErc20Contract } from './contract'

export function getNetworkInfo(networkId: ChainId): NetworkType {
  return networks[networkId]
}

export function getPairInfo(pairId: number): PairInfo | undefined {
  const pairList = store.getState().bridge.pairList
  for (let i = 0; i < pairList.length; i++) {
    if (pairList[i].id === pairId) {
      return pairList[i]
    }
  }
}

export function wei2eth(amount: string, decimals: number, precision = 6) {
  return new BN(amount).div(Math.pow(10, decimals)).toFixed(precision).toString()
}

export async function getApproveStatus(account: string, tokenAddress: string, bridgeAddress: string, library: any) {
  const tokenContract = getErc20Contract(tokenAddress, library)
  const allowance = await tokenContract.methods.allowance(account, bridgeAddress).call()
  console.log('allowance', allowance)
  return allowance > 0
}
