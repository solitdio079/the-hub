import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'

import passport from 'passport'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import cors from 'cors'
// Routers
import authRouter from './routes/auth.mjs'
import userRouter from './routes/users.mjs'
import postRouter from './routes/posts.mjs'

const corsOptions = {
  origin: ['http://localhost:5173', 'https://www.bysolitdio.net'],

  //credentials: true,
  optionsSuccessStatus: 200,
  credentials: true,
}

try {
  const connection = await mongoose.connect(process.env.MONGO_URI)
  console.log('Database connected')
} catch {
  console.log('Error occured')
}

const app = express()



app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser('yes'))
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      dbName: 'mother-board',
    }),
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('public'))
app.use('/auth', authRouter)
app.use("/users", userRouter)
app.use("/posts", postRouter)

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello, homepage here!')
})

app.listen(port, '0.0.0.0',() => {
  console.log(`Listening to port ${port}`)
})
