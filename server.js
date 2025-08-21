import 'express-async-errors'

import express from 'express'
const app = express()
import morgan from 'morgan'
import mongoose from 'mongoose'

import { config } from 'dotenv'

config()

import JobRouter from './routes/jobRouter.js'
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware.js'

// import { body, validationResult } from 'express-validator'
import { validateTest } from './middleware/validationMiddleware.js'

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.post('/api/v1/test', validateTest, (req, res) => {
  const { name } = req.body
  res.json({ message: `Hello ${name} ` })
})

app.use('/api/v1/jobs', JobRouter)

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
