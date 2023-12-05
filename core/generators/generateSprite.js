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

import PATHS from '../settings/paths.js'
import HELPERS from '../settings/helpers.js'
import PLUGINS from '../settings/plugins.js'

import SVGSpriteConfig from '../configs/SVGSprite.config.js'

const {
  spriteFile,
  SRC_FOLDER,
  src: { sprite: spriteSrc }
} = PATHS
const { notifier, status } = HELPERS
const {
  join,
  svgSprite,
  gulp: { dest, src },
  fs: {
    existsSync,
    promises: { readdir }
  }
} = PLUGINS

const generateSprite = async (isUpdate) => {
  const TASK_NAME = 'generateSprite'
  const SCRIPT_NAME = 'sprite'
  const spriteSvg = join(SRC_FOLDER, spriteFile)
  const spriteFileExists = existsSync(spriteSvg) && !isUpdate

  if (spriteFileExists) {
    return notifier.warning(TASK_NAME, {
      scriptName: SCRIPT_NAME,
      path: spriteSvg,
      message: spriteFileExists
    })
  }

  try {
    await readdir(spriteSrc)

    const state = status.state(spriteSvg, isUpdate)

    src(spriteSrc)
      .pipe(notifier.errorHandler(TASK_NAME))
      .pipe(svgSprite(SVGSpriteConfig))
      .pipe(dest(SRC_FOLDER))

    return notifier.success(TASK_NAME, {
      path: spriteSrc,
      message: state
    })
  } catch (error) {
    return notifier.error(TASK_NAME, {
      path: spriteSrc,
      message: error
    })
  }
}

export default generateSprite
