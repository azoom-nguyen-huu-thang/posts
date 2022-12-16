const sharp = require('sharp')

export const convertImgToWebp = async (image) => {
  const { data, info } = await sharp(image.path)
    .webp({ lossless: true })
    .raw()
    .toBuffer({ resolveWithObject: true })

  // create a more type safe way to work with the raw pixel data
  // this will not copy the data, instead it will change `data`s underlying ArrayBuffer
  // so `data` and `pixelArray` point to the same memory location
  const pixelArray = new Uint8ClampedArray(data.buffer)

  // When you are done changing the pixelArray, sharp takes the `pixelArray` as an input
  const { width, height, channels } = info
  const imageName = Date.now()
  return {
    name: `${imageName}.webp`,
    file: await sharp(pixelArray, { raw: { width, height, channels } }).toFile(
      `./static/build/${imageName}.webp`
    ),
  }
}
