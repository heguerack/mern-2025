import 'express-async-errors'

import express from 'express'
const app = express()
import morgan from 'morgan'
import mongoose from 'mongoose'

import { config } from 'dotenv'

config()

import JobRouter from './routes/jobRouter.js'
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware.js'

if (process.env.NODE_ENV === 'development') {
  //=> NODE_ENV  = "production"  when deployed
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/v1/jobs', JobRouter)

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Not Found' })
})

// app.use((err, req, res, next) => {
//   console.log(err)
//   res.status(500).json({ message: 'Internal error - something went wrong' })
// })
app.use(errorHandlerMiddleware)

//remember we dont need to create and async funtion anymore! :)
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
