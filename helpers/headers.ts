const PAYWALL_ADDRESS = process.env.RECEIVER
if (!PAYWALL_ADDRESS) { throw new Error('Please, set RECEIVER env variable') }

const PAYWALL_GATEWAY = process.env.GATEWAY_URL
if (!PAYWALL_GATEWAY) { throw new Error('Please, set GATEWAY_URL env variable') }

export function paywallHeaders (price: string = '1'): object {
  let headers: { [index: string]: string } = {}
  headers['Paywall-Version'] = '0.0.3'
  headers['Paywall-Price'] = price
  headers['Paywall-Address'] = PAYWALL_ADDRESS
  headers['Paywall-Gateway'] = PAYWALL_GATEWAY + '/v1/accept'
  headers['Paywall-Meta'] = 'contentidexample'
  return headers
}

export function paywallHeadersERC20(): object {
  let headers = paywallHeaders()
  headers['Paywall-Token-Name'] = 'Example ERC20'
  headers['Paywall-Token-Ticker'] = 'EEE'
  headers['Paywall-Token-Address'] = process.env.PAYWALL_TOKEN_ADDRESS || '0x8ad5c3cd38676d630b060a09baa40b0a3cb0b4b5'
  return headers
}
