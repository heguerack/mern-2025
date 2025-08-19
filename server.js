import express from 'express'
const app = express()
import morgan from 'morgan'

// import * as dotenv from 'dotenv'
// dotenv.config()

import { config } from 'dotenv'
// import { nanoid } from 'nanoid'
// import {
//   createJob,
//   deleteJob,
//   getAllJobs,
//   getSingleJob,
//   updateJob,
// } from './controllers/jobController.js'
config()

//roters
import JobRouter from './routes/jobRouter.js'

if (process.env.NODE_ENV === 'development') {
  //=> NODE_ENV  = "production"  when deployed
  app.use(morgan('dev'))
}

// built in middleware
app.use(express.json())
////////////////ROUTES////////////////////////////

// // get ALL JOBS
// app.get('/api/v1/jobs', getAllJobs)

// // Get JOB
// app.get('/api/v1/jobs/:id', getSingleJob)

// // Create JOB
// app.post('/api/v1/jobs', createJob)

// // Delele JOB
// app.delete('/api/v1/jobs/:id', deleteJob)

// // update JOB
// app.patch('/api/v1/jobs/:id', updateJob)

/////////////////////////////////////////////

//instead of all the previous, we do the following for the routes
app.use('/api/v1/jobs', JobRouter)

// NOT FOUND
// '*'= every route but the ones preceding this one.
// use() = every method; so good for not found! but express alrady does itminder the hood
// now we have a nice looking not found response
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Not Found' })
})

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({ message: 'Internal error - something went wrong' })
  next
})

app.listen(5100, () => {
  console.log('Server running on 5100...')
  console.log(process.env.PORT)
})
