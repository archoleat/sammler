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
import PLUGINS from '../settings/plugins.js'

import REGEXPS from './regexps.js'

const { PAGES_FOLDER, SRC_FOLDER } = PATHS
const {
  join,
  fs: { readdirSync }
} = PLUGINS
const { PUG_EXTENSION } = REGEXPS

const pugPages = readdirSync(join(SRC_FOLDER, PAGES_FOLDER)).filter((extension) => {
  return extension.endsWith(PUG_EXTENSION)
})

export default pugPages
