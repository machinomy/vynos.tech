import * as express from 'express'
import * as path from 'path'
import * as logger from 'morgan'
import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import { router as routes } from './routes/index'
import { router as paid } from './routes/paid'
require('dotenv').config()

export let app = express()
let exphbs = require('express-handlebars')
let compression = require('compression')

// app.set('views', path.join(__dirname, 'views'))
let viewsPath = __dirname + '/views'
let hbsConfig = { defaultLayout: 'main', layoutsDir: viewsPath + '/layouts/' }
app.engine('handlebars', exphbs(hbsConfig))
app.set('views', path.join(__dirname, 'views'))
app.set('view options', { layout: false })
app.set('view engine', 'handlebars')

app.use(compression())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)
app.use('/articles', paid)

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  let err = new Error('Not Found');
  (err as any).status = 404
  next(err)
})

if (app.get('env') !== 'production') {
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.message)
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})
