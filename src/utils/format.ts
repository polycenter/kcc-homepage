import invariant from 'tiny-invariant'
export const shortAddress = (address: string): string => {
  invariant(address.length > 12, 'given address is valid?')
  const pre = address.substr(0, 4)
  const last = address.substr(-4)
  return `${pre}...${last}`
}
