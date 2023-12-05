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

import HELPERS from '../settings/helpers.js'
import PLUGINS from '../settings/plugins.js'

const {
  REGEXPS: { VARIABLE_FONT_REGEX }
} = HELPERS

const {
  fs: {
    promises: { appendFile }
  }
} = PLUGINS

const generateFontFace = async (
  fontFacesFile,
  { fontFileName, fontFamily, fontWeight, fontStyle }
) => {
  const fontFileURL = `src: url("../fonts/${fontFileName}.woff2") format("woff2")`
  const fontFamilyName = `font-family: "${fontFamily}";`
  const FONT_DISPLAY = 'font-display: swap;'
  const fontFace = VARIABLE_FONT_REGEX.test(fontFileName)
    ? `@font-face {\n\t${fontFileURL} tech("variations");\n\t${fontFamilyName}\n\tfont-weight: 1 1000;\n\t${FONT_DISPLAY}\n}\n`
    : `@font-face {\n\t${fontFileURL};\n\t${fontFamilyName}\n\tfont-weight: ${fontWeight};\n\tfont-style: ${fontStyle};\n\t${FONT_DISPLAY}\n}\n`

  await appendFile(fontFacesFile, fontFace)
}

export default generateFontFace
