import imageminWebp from 'imagemin-webp'
import imagemin from 'imagemin'

export const optimizeImage = (imgName) => {
  return imagemin([`static/build/${imgName}`], {
    destination: 'static/images',
    plugins: [imageminWebp({ quality: 100 })],
  })
}
