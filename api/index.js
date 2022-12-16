// const exphbs = require('express-handlebars')
import { optimizeImage } from './imagemin'
import { convertImgToWebp } from './sharp'
const path = require('path')
const express = require('express')
const cors = require('cors')
const multer = require('multer')

const imageStorage = multer.diskStorage({
  destination: 'static/build',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})
const upload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000 * 5,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|webp)$/)) {
      // upload only png and jpg format
      return cb(new Error('Please upload a Image'))
    }
    cb(undefined, true)
  },
})

const app = express()
// const port = 3000
// const hbs = exphbs.create({
// 	/* config */
// })

app.use(cors())

app.get('/', (req, res) => {
  res.status(200).send('hello')
})

app.post('/upload', upload.single('image'), async (req, res, next) => {
  try {
    const { name, file: data } = await convertImgToWebp(req.file)
    const image = await optimizeImage(name)
    return res.status(200).send({
      message: 'Success',
      file: {
        name,
        data,
        image,
      },
    })
  } catch (error) {
    console.error(error)
    return res.status(400).send({ message: error.message })
  }
})

app.use('/images', express.static('images'))

module.exports = app
