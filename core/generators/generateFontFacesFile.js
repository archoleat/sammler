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

import fontFileHandler from '../handlers/fonts/fontFileHandler.js'

const {
  fontFacesFile,
  build: { fonts: fontsBuild }
} = PATHS
const { notifier, status } = HELPERS
const {
  fs: {
    existsSync,
    promises: { readdir, writeFile }
  }
} = PLUGINS

const generateFontFacesFile = async (isUpdate) => {
  const TASK_NAME = 'generateFontFacesFile'
  const SCRIPT_NAME = 'fonts'
  const fontFacesFileExists = existsSync(fontFacesFile) && !isUpdate

  if (fontFacesFileExists) {
    return notifier.warning(TASK_NAME, {
      scriptName: SCRIPT_NAME,
      path: fontFacesFile,
      message: fontFacesFileExists
    })
  }

  try {
    const fontsFiles = await readdir(fontsBuild)
    const state = status.state(fontFacesFile, isUpdate)

    await writeFile(fontFacesFile, '')

    fontFileHandler(fontsFiles)

    return notifier.success(TASK_NAME, {
      path: fontFacesFile,
      message: state
    })
  } catch (error) {
    return notifier.error(TASK_NAME, {
      path: fontFacesFile,
      message: error
    })
  }
}

export default generateFontFacesFile
