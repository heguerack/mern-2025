import 'express-async-errors'
import cookieParser from 'cookie-parser'
import express from 'express'
const app = express()
import morgan from 'morgan'
import mongoose from 'mongoose'

import { config } from 'dotenv'

config()

import JobRouter from './routes/jobRouter.js'
import AuthRouter from './routes/AuthRouter.js'
import userRouter from './routes/userRouter.js'

import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware.js'

import { authenticateUser } from './middleware/authMiddleware.js'
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(cookieParser()) //we didnt need to install the package to set the cookie, yet we have ot to be able to decode it. we just req.cookies , like  console.log(req.cookies)

app.use(express.json())

app.get('/api/v1/test', (req, res) => {
  res.status(200).json({ msg: 'your data from test route' })
})
app.use('/api/v1/jobs', authenticateUser, JobRouter)
app.use('/api/v1/users', authenticateUser, userRouter)
app.use('/api/v1/auth', AuthRouter)

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Not Found' })
})

app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5100
const dbUrl = process.env.MONGO_DB_URL
try {
  await mongoose.connect(dbUrl)
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`)
  })
} catch (error) {
  console.log(error)
  process.exit(1)
}
