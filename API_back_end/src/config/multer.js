import multer from 'multer'
import path from 'path'
import fs from 'fs'

const uploadPath = path.join(path.resolve(), '/uploads/')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true })
    }
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    cb(null, `user-pic-${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({ storage })

export default upload
