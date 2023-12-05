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

const {
  fontFacesFile,
  build: { fonts: fontsBuild },
  src: { fonts: fontsSrc }
} = PATHS
const { notifier, typeChecker } = HELPERS
const {
  fonter,
  join,
  ttf2woff2,
  gulp: { dest, src },
  fs: { existsSync }
} = PLUGINS

const convertFont = (taskName, extension) => {
  typeChecker(extension, 'extension', 'string')

  const woff2 = join(fontsSrc, '*.woff2')
  const errorMessage = notifier.errorHandler(taskName)

  if (existsSync(fontFacesFile) && existsSync(woff2)) {
    return src(woff2)
      .pipe(errorMessage)
      .pipe(dest(fontsBuild))
  }

  const selectPlugin =
    extension === 'otf' ? fonter({ formats: ['ttf'] }) : ttf2woff2()

  return src(join(fontsSrc, `*.${extension}`))
    .pipe(errorMessage)
    .pipe(selectPlugin)
    .pipe(dest(fontsSrc))
    .pipe(src(woff2))
    .pipe(dest(fontsBuild))
}

export default convertFont
