import multer from 'multer'

// We have 2 options memory storage or diskstorage. we will go with disk storage cuz we need the file???
const storage = multer.diskStorage({
  //this plces the image in 'public/uploads'
  destination: (req, file, cb) => {
    cb(null, 'public/uploads')
  },
  filename: (req, file, cb) => {
    //this keep the original fileName seems like, maybe we could give our own name form here too
    const filename = file.originalname
    cb(null, filename)
  },
})
// so lets injected just bofore   validateUpdateUserInput in userRouter patch;
// that way we can access via req.file in user controller
export const upload = multer({ storage }) // so up to here we have the image in our storage prio to processing. we are gonna place to cludinary, so i wonder why we did upload the image from the front end, waited for response and attachd tha url string to the object! that way we let cloudinary do heavy lifting for us,, but i guess this way we learn
