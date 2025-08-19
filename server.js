import express from 'express'
const app = express()
import morgan from 'morgan'

// import * as dotenv from 'dotenv'
// dotenv.config()

let jobs = [
  { id: 'JZ8eo3R-6zdc_2sOCldLE', company: 'apple', position: 'front-end' },
  { id: 'Z9Iw8Eyq7eQzcZsxorSBO', company: 'google', position: 'back-end' },
  // { id: 'Ab9XyKpQv7TfL2MeRs81', company: 'google', position: 'back-end' },
  // { id: 'Qz8LmNoPq3WeRt4YuGh52', company: 'microsoft', position: 'full-stack' },
  // { id: 'Jk7UiOpLz6AsDf8GhQw13', company: 'amazon', position: 'devops' },
  // { id: 'Rt9YbVcXw4EqMn2LpKh65', company: 'meta', position: 'mobile' },
]

import { config } from 'dotenv'
import { nanoid } from 'nanoid'
config()

if (process.env.NODE_ENV === 'development') {
  //=> NODE_ENV  = "production"  when deployed
  app.use(morgan('dev'))
}

// built in middleware
app.use(express.json())

// get ALL JOBS
// get ALL JOBS
// get ALL JOBS
app.get('/api/v1/jobs', (req, res) => {
  res.status(200).json({ jobs })
})

// Get JOB
// Get JOB
// Get JOB
// Get JOB
app.get('/api/v1/jobs/:id', (req, res) => {
  console.log('REQ :', { req })
  const { params } = req
  if (!params.id) {
    return res.status(400).json({ message: 'please provide an id!' })
  }

  const singleJob = jobs.find((job) => job.id === params.id)
  if (!singleJob) {
    return res.status(404).json({ message: `No job with id:${id}` })
  }

  res.status(200).json({ singleJob })
})

// Create JOB
// Create JOB
// Create JOB
// Create JOB
app.post('/api/v1/jobs', (req, res) => {
  const { company, position } = req.body
  if (!company || !position) {
    return res
      .status(201)
      .json({ message: 'please proide company and positin' })
  }
  const id = nanoid()
  const job = { id, company, position }
  jobs.push(job)
  res.status(201).json({ job })
})

// Delele JOB
// Delele JOB
// Delele JOB
// Delele JOB
app.delete('/api/v1/jobs/:id', (req, res) => {
  const { params } = req
  if (!params.id) {
    return res.status(400).json({ message: 'please provide an id!' })
  }
  const jobToDelete = jobs.find((job) => job.id === params.id)
  if (!jobToDelete) {
    return res.status(404).json({ message: 'No job with that id!!' })
  }

  const newJobs = jobs.filter((job) => job.id !== params.id)
  res.status(200).json({ msg: 'Job deleted' })
})

// update JOB
// update JOB
// update JOB
// update JOB
app.patch('/api/v1/jobs/:id', (req, res) => {
  const { company, position } = req.body
  if (!company || !position) {
    return res.status(400).json({ message: 'No job with that id!!' })
  }

  const { id } = req.params
  let jobToUpdate = jobs.find((job) => job.id === id)
  if (!jobToUpdate) {
    return res.status(404).json({ message: 'No job with that id!!' })
  }
  // alright this doesnt change the object!! frank, basis please!
  // this just gives a copy back!!
  //   const updatedJob = {
  //     ...jobToUpdate,
  //     company,
  //     position,
  //   }
  //   res.status(200).json({ message: 'Job Updated', updatedJob })
  // })

  jobToUpdate.company = company
  jobToUpdate.position = position
  res.status(200).json({ message: 'Job Updated', jobToUpdate })
})
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

app.post('/', (req, res) => {
  res.json({ message: 'data received', data: req.body })
})

app.listen(5100, () => {
  console.log('Server running on 5100...')
  console.log(process.env.PORT)
})
