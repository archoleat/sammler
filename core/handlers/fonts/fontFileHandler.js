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

import PATHS from '../../settings/paths.js'
import HELPERS from '../../settings/helpers.js'

import generateFontFace from '../../generators/generateFontFace.js'

const { fontFacesFile } = PATHS
const {
  trimString,
  typeChecker,
  REGEXPS: {
    FILE_EXTENSION,
    ITALIC_REGEX
  }
} = HELPERS

const fontFileHandler = (fontsFiles) => {
  typeChecker(fontsFiles, 'fontsFiles', 'array')

  const FONT_WEIGHTS = {
    thin: 100,
    hairline: 100,
    extralight: 200,
    ultralight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    demibold: 600,
    bold: 700,
    extrabold: 800,
    ultrabold: 800,
    black: 900,
    heavy: 900,
    extrablack: 950,
    ultrablack: 950
  }

  let newFileOnly

  for (const fontFile of fontsFiles) {
    const [fontFileName] = fontFile.split(FILE_EXTENSION)

    if (newFileOnly !== fontFileName) {
      const [fontFamily, fontWeightValue] = fontFileName.split('-')
      const fontWeight =
        FONT_WEIGHTS[trimString(fontWeightValue, ITALIC_REGEX) ?? 'regular']
      const fontStyle = ITALIC_REGEX.test(fontFileName) ? 'italic' : 'normal'

      generateFontFace(fontFacesFile, {
        fontFileName,
        fontFamily,
        fontWeight,
        fontStyle
      })

      newFileOnly = fontFileName
    }
  }
}

export default fontFileHandler
