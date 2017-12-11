import * as express from 'express'
export let router = express.Router()
import { web3 } from '../helpers/web'

const FAUCET_ACCOUNT = process.env.FAUCET_ACCOUNT
if (!FAUCET_ACCOUNT) { throw new Error('Please, set FAUCET_ACCOUNT env variable') }

const GIFT_AMOUNT = web3.toWei(0.1, 'ether')

router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction): any => {
  res.render('index')
})

router.get('/faucet', (req: express.Request, res: express.Response, next: express.NextFunction): any => {
  const faucetAddress = FAUCET_ACCOUNT
  const faucetBalance = web3.fromWei(web3.eth.getBalance(FAUCET_ACCOUNT), 'ether')
  res.render('faucet', {faucetAddress, faucetBalance})
})

router.post('/faucet/request', function(req: express.Request, res: express.Response, next: express.NextFunction) {
  let callFaucet = (address: string, callback: (err: Error, value: string) => void) => {
    web3.eth.sendTransaction({from: FAUCET_ACCOUNT, to: address, value: GIFT_AMOUNT}, callback)
  }
  let address = req.body.address
  if (address) {
    callFaucet(address, function (err: any, txid: string) {
      if (err) {
        console.log(err)
        res.writeHead(500)
        res.end()
      } else {
        res.json({txid: txid})
      }
    })
  } else {
    res.writeHead(400, 'No Address')
    res.end()
  }
})
