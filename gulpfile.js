import HELPERS from './core/settings/helpers.js'
import PLUGINS from './core/settings/plugins.js'

import archiver from './core/utilities/archiver.js'
import reset from './core/utilities/reset.js'

import convertOTFToTTF from './core/converters/convertOTFToTTF.js'
import convertTTFToWOFF2 from './core/converters/convertTTFToWOFF2.js'
import generateFontFacesFile from './core/generators/generateFontFacesFile.js'

import JSDevHandler from './core/handlers/js/JSDevHandler.js'
import JSProdHandler from './core/handlers/js/JSProdHandler.js'

import generateSprite from './core/generators/generateSprite.js'
import imageHandler from './core/handlers/images/imageHandler.js'

import CSSHandler from './core/handlers/CSSHandler.js'
import HTMLHandler from './core/handlers/HTMLHandler.js'

import PROJECT_CONFIG from './core/configs/project.config.js'

const {
  images: { isWebp }
} = PROJECT_CONFIG
const {
  FLAGS: { isUpdate }
} = HELPERS
const {
  gulp: { parallel, series }
} = PLUGINS

const fonts = series(
  convertOTFToTTF,
  convertTTFToWOFF2,
  generateFontFacesFile.bind(null, isUpdate)
)
const dev = parallel(reset, fonts, generateSprite.bind(null, isUpdate))
const build = series(
  reset,
  fonts,
  JSDevHandler,
  JSProdHandler,
  parallel(
    CSSHandler.bind(null, isWebp),
    HTMLHandler.bind(null, isWebp),
    imageHandler.bind(null, isWebp)
  )
)

export {
  build,
  fonts,
  generateSprite,
  archiver
}

export default dev
