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

function writeRequest(count: number): string {
  return `
  <div style="display: flex; flex-direction: column;">
  <span>Count: ${count}</span>
  <span></span>
  <a href="/api/count">/api/count</span>
  <a href="/api/count/add">/api/count/add</span>
  <a href="/api/count/reset">/api/count/reset</span>
  </div>
  `
}

router.get('/count/reset', (req: Request, res: Response) => {
  req.session.count = 1
  const count: number = req.session.count

  return res.send(writeRequest(count))
})

router.get('/count/add', (req: Request, res: Response) => {
  if (!req.session.count) {
    req.session.count = 1
  }
  const count: number = ++req.session.count

  return res.send(writeRequest(count))
})

router.get('/count', (req: Request, res: Response) => {
  if (!req.session.count) {
    req.session.count = 1
  }
  const count: number = req.session.count

  return res.send(writeRequest(count))
})

app.use('/api', router)

app.listen(5000, () => {
  console.log('Server listening on port 5000...')
})
