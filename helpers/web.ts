import Web3 = require('web3')
require('dotenv').config()

const ETHEREUM_API = process.env.ETHEREUM_API
if (!ETHEREUM_API) { throw new Error('Please, set receiver address to ETHEREUM_API env variable') }

let web3 = new Web3(new Web3.providers.HttpProvider(ETHEREUM_API))

export {web3}
