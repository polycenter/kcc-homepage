/// <reference types="react-scripts" />

declare module '*.less'
interface Window {
  ethereum?: {
    isMetaMask?: true
    on?: (...args: any[]) => void
    removeListener?: (...args: any[]) => void
  }
  web3?: any
  BinanceChain?: BinanceChain
}
