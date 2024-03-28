import { HELPERS } from './core/src/settings/helpers.js';
import { PLUGINS } from './core/src/settings/plugins.js';

import { archiver } from './core/src/utils/archiver.js';
import { reset } from './core/src/utils/reset.js';

import { convertOTFToTTF } from './core/src/converters/otf-to-ttf.js';
import { convertTTFToWOFF2 } from './core/src/converters/ttf-to-woff2.js';
import { generateFontFacesFile } from './core/src/generators/font-faces-file.js';

import { JSDevelopmentHandler } from './core/src/handlers/js/js-development.js';
import { JSProductionHandler } from './core/src/handlers/js/js-production.js';

import { generateSprite } from './core/src/generators/sprite.js';
import { imageHandler } from './core/src/handlers/images/images.js';

import { CSSHandler } from './core/src/handlers/css.js';
import { HTMLHandler } from './core/src/handlers/html.js';

import { PROJECT_CONFIG } from './core/src/configs/project.config.js';

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
  JSDevelopmentHandler,
  JSProductionHandler,
  parallel(
    CSSHandler.bind(null, isWebp),
    HTMLHandler.bind(null, isWebp),
    imageHandler.bind(null, isWebp),
  ),
);

export { build, fonts, generateSprite, archiver };

export default dev;
