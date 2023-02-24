import express, { Request, Response } from 'express'
import session from 'express-session'

const app = express()
app.use(express.json())
app.use(
  session({
    secret: 'asdasdasdasdasd',
    cookie: {
      maxAge: 20 * 60 * 360,
    },
    saveUninitialized: false,
    resave: false,
  })
)
const router = express.Router()

declare module 'express-session' {
  interface SessionData {
    count: number
  }
}

router.get('/count/reset', (req: Request, res: Response) => {
  req.session.count = 1
  return res.send(`
  Count: ${req.session.count}
  
  /api/count
  /api/count/add
  /api/count/reset
  `)
})

router.get('/count/add', (req: Request, res: Response) => {
  if (!req.session.count) {
    req.session.count = 1
  }
  return res.send(`
  Count: ${++req.session.count}
  
  /api/count
  /api/count/add
  /api/count/reset
  `)
})

router.get('/count', (req: Request, res: Response) => {
  if (!req.session.count) {
    req.session.count = 1
  }
  return res.send(`
  Count: ${req.session.count}
  
  /api/count
  /api/count/add
  /api/count/reset
  `)
})

app.use('/api', router)

app.listen(5000, () => {
  console.log('Server listening on port 5000...')
})
