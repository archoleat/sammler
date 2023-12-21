////////////////////////////////////////////////////////////////////////////
//
// Copyright 2023 nikkeyl.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
////////////////////////////////////////////////////////////////////////////

import { basename, resolve } from 'path'

import PROJECT_CONFIG from '../configs/project.config.js'

import PLUGINS from './plugins.js'

const {
  entry,
  cache: { location },
  images: { extensions, spriteFileName },
  server: { publicFolder }
} = PROJECT_CONFIG
const { join } = PLUGINS

const ASSETS_FOLDER = 'assets'
const IMAGES_FOLDER = 'img'
const PAGES_FOLDER = 'views'
const SCRIPTS_FOLDER = 'js'
const SRC_FOLDER = resolve('src')
const SVG_SPRITE_FOLDER = 'sprite'

const buildFolder = resolve(publicFolder ?? 'dist')
const cacheFolder = location ?? '.cache'
const rootFolder = basename(resolve())
const svgSpriteFiles = join(SRC_FOLDER, IMAGES_FOLDER, SVG_SPRITE_FOLDER, '*.svg')

const PATHS = {
  ASSETS_FOLDER,
  IMAGES_FOLDER,
  PAGES_FOLDER,
  SCRIPTS_FOLDER,
  SRC_FOLDER,
  buildFolder,
  cacheFolder,
  rootFolder,
  GIT_KEEP_FILE: '**/.gitkeep',
  babelConfigFile: resolve('core/configs/babel.config.js'),
  fontFacesFile: join(SRC_FOLDER, 'scss/base/font-faces.scss'),
  spriteFile: `../${IMAGES_FOLDER}/icons/${spriteFileName ?? 'sprite'}.svg`,
  versionFile: join(cacheFolder, 'version.json'),
  build: {
    css: join(buildFolder, ASSETS_FOLDER, 'css'),
    fonts: join(buildFolder, ASSETS_FOLDER, 'fonts'),
    HTML: '*.html',
    images: join(buildFolder, ASSETS_FOLDER, IMAGES_FOLDER),
    js: join(buildFolder, ASSETS_FOLDER, SCRIPTS_FOLDER)
  },
  src: {
    favicon: join(SRC_FOLDER, 'favicon.ico'),
    fonts: join(SRC_FOLDER, 'fonts/'),
    htaccess: join(SRC_FOLDER, '.htaccess'),
    images: join(
      SRC_FOLDER,
      IMAGES_FOLDER,
      `**/*.{${['ico', 'jpg', 'png', 'webp', ...extensions ?? []]}}`
    ),
    js: join(SRC_FOLDER, SCRIPTS_FOLDER, `${entry ?? 'main'}.js`),
    json: join(SRC_FOLDER, PAGES_FOLDER, '**/*.json'),
    markdown: join(SRC_FOLDER, PAGES_FOLDER, 'markdown/**/*.md'),
    pug: join(SRC_FOLDER, PAGES_FOLDER, '**/*.pug'),
    robots: join(SRC_FOLDER, 'robots.txt'),
    sprite: svgSpriteFiles,
    svg: [join(SRC_FOLDER, IMAGES_FOLDER, '**/*.svg'), `!${svgSpriteFiles}`]
  }
}

export default PATHS
