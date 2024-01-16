import HELPERS from './core/src/settings/helpers.js';
import PLUGINS from './core/src/settings/plugins.js';

import archiver from './core/src/utilities/archiver.js';
import reset from './core/src/utilities/reset.js';

import convertOTFToTTF from './core/src/converters/convertOTFToTTF.js';
import convertTTFToWOFF2 from './core/src/converters/convertTTFToWOFF2.js';
import generateFontFacesFile from './core/src/generators/generateFontFacesFile.js';

import JSDevHandler from './core/src/handlers/js/JSDevHandler.js';
import JSProdHandler from './core/src/handlers/js/JSProdHandler.js';

import generateSprite from './core/src/generators/generateSprite.js';
import imageHandler from './core/src/handlers/images/imageHandler.js';

import CSSHandler from './core/src/handlers/CSSHandler.js';
import HTMLHandler from './core/src/handlers/HTMLHandler.js';

import PROJECT_CONFIG from './core/src/configs/project.config.js';

const {
  images: { isWebp },
} = PROJECT_CONFIG;
const {
  FLAGS: { isUpdate },
} = HELPERS;
const {
  gulp: { parallel, series },
} = PLUGINS;

const fonts = series(
  convertOTFToTTF,
  convertTTFToWOFF2,
  generateFontFacesFile.bind(null, isUpdate),
);
const dev = parallel(reset, fonts, generateSprite.bind(null, isUpdate));
const build = series(
  reset,
  fonts,
  JSDevHandler,
  JSProdHandler,
  parallel(
    CSSHandler.bind(null, isWebp),
    HTMLHandler.bind(null, isWebp),
    imageHandler.bind(null, isWebp),
  ),
);

export { build, fonts, generateSprite, archiver };

export default dev;
