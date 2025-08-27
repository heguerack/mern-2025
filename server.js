import 'express-async-errors'
import cookieParser from 'cookie-parser'
import express from 'express'
const app = express()
import morgan from 'morgan'
import mongoose from 'mongoose'
import cloudinary from 'cloudinary'
import { config } from 'dotenv'
config()
import JobRouter from './routes/jobRouter.js'
import AuthRouter from './routes/AuthRouter.js'
import userRouter from './routes/userRouter.js'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware.js'
import { authenticateUser } from './middleware/authMiddleware.js'
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLODINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})
const __dirname = dirname(fileURLToPath(import.meta.url)) //need to find how how thos works, wt hech,, always some new syntax to leanr
app.use(express.static(path.resolve(__dirname, './public')))

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(cookieParser())
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
