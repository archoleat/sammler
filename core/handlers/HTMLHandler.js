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

import HTMLMinConfig from '../configs/HTMLMin.config.js'
import typografConfig from '../configs/typograf.config.js'
import versionNumberConfig from '../configs/versionNumber.config.js'

const {
  buildFolder,
  build: { HTML }
} = PATHS
const { notifier } = HELPERS
const {
  htmlMin,
  join,
  typograf,
  versionNumber,
  webpHtmlNoSvg,
  when,
  gulp: { dest, src }
} = PLUGINS

const HTMLHandler = (isWebp) => {
  return src(join(buildFolder, HTML))
    .pipe(notifier.errorHandler('HTMLHandler'))
    .pipe(when(isWebp, webpHtmlNoSvg()))
    .pipe(versionNumber(versionNumberConfig))
    .pipe(typograf(typografConfig))
    .pipe(htmlMin(HTMLMinConfig))
    .pipe(dest(buildFolder))
}

export default HTMLHandler
