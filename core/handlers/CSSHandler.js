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

import webpCSSConfig from '../configs/webpCSS.config.js'

const {
  build: { css: cssBuild }
} = PATHS
const { notifier } = HELPERS
const {
  autoPrefixer,
  cleanCss,
  cssComb,
  groupCssMediaQueries,
  join,
  rename,
  webpCss,
  when,
  gulp: { dest, src }
} = PLUGINS

const CSSHandler = (isWebp) => {
  return src(join(cssBuild, 'style.css'))
    .pipe(notifier.errorHandler('CSSHandler'))
    .pipe(groupCssMediaQueries())
    .pipe(when(isWebp, webpCss(webpCSSConfig)))
    .pipe(cssComb())
    .pipe(autoPrefixer())
    .pipe(dest(cssBuild))
    .pipe(cleanCss({ level: 2 }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(cssBuild))
}

export default CSSHandler
